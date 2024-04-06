import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DaySection } from '../enums';
import { Today } from '../types';

dayjs.extend(customParseFormat);

const getFormattedDate = () => dayjs(new Date()).format('D.M.YYYY');

export const useCalendar = () => {
  const dateNow = getFormattedDate();
  const [date, setDate] = useState<string>(dateNow);
  const [today, setToday] = useState<Today>({});
  const [daySection, setDaySection] = useState<DaySection | null>(null);
  const [parsha, setParsha] = useState('');
  const calendarData = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('calendar') || '';
    if (!data) {
      navigate('/upload');
    }

    calendarData.current = JSON.parse(data);

    const todayRow: any = calendarData.current.find(day => {
      return day['תאריך לועזי'] === date;
    });

    if (!todayRow) return navigate('/upload');

    selectDaySection(todayRow);

    const interval = setInterval(() => {
      const newTime = getFormattedDate();
      setDate(newTime);
      if (newTime !== date) {
        fetchParsha();
      }
      getNextDay(todayRow);
      selectDaySection(todayRow);
    }, 60000);

    fetchParsha();

    setToday(todayRow);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const selectDaySection = (todayRow: Today) => {
    const now = dayjs();
    const beforeHaneitz = dayjs(todayRow['נץ החמה קטגוריה'], 'HH:mm:ss').subtract(3, 'hours');
    const afterHaneitz = dayjs(todayRow['נץ החמה קטגוריה'], 'HH:mm').add(30, 'minutes');
    const afternoon = dayjs(todayRow['סו"ז תפילה גר"א קטגוריה'], 'HH:mm').add(30, 'minutes');
    const night = dayjs(todayRow['שקיעה קטגוריה'], 'HH:mm').add(12, 'hours').add(20, 'minutes');

    if (now > beforeHaneitz && now < afterHaneitz) {
      setDaySection(DaySection.EarlyMorning);
    } else if (now > afterHaneitz && now < afternoon) {
      setDaySection(DaySection.Morning);
    } else if (now > afternoon && now < night) {
      setDaySection(DaySection.Afternoon);
    } else {
      setDaySection(DaySection.Night);
    }
  };

  const fetchParsha = () => {
    const url =
      'https://www.sefaria.org/api/calendars?diaspora=0&timezone=Asia/Jerusalem&custom=ashkenazi';
    fetch(url)
      .then(resp => resp.json())
      .then(res => {
        setParsha(res.calendar_items[0].displayValue.he);
      })
      .catch(err => console.error(err));
  };

  const getNextDay = (todayRow: Today) => {
    if (!Object.keys(todayRow).length || !calendarData.current.length) return;
    const nightfall = dayjs(todayRow['שקיעה קטגוריה'], 'HH:mm:ss')
      .add(12, 'hours')
      .add(20, 'minutes');
    const now = dayjs();
    const tomorrow = now.add(1, 'day').startOf('day');

    if (today['צאת הכוכבים ר"ת 72 שוות קטגוריה']) {
      const afterShabbat = dayjs(todayRow['צאת הכוכבים ר"ת 72 שוות קטגוריה'], 'HH:mm:ss')
        .add(12, 'hours')
        .add(10, 'minutes');
      if (now < afterShabbat) {
        return;
      }
    }

    if (now > nightfall && now < tomorrow) {
      const tomorrowFormatted = tomorrow.format('D.M.YYYY');
      const nextRow = calendarData.current.find(day => day['תאריך לועזי'] === tomorrowFormatted);
      if (!nextRow || nextRow['תאריך לועזי'] === todayRow['תאריך לועזי']) return;
      return nextRow;
    }
    return;
  };

  return { today, daySection, parsha, getNextDay };
};
