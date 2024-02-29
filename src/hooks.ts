import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DaySection } from './enums';
import { Today } from './types';

dayjs.extend(customParseFormat);

export const useTime = () => {
  const timeNow = dayjs(new Date()).format('h:mm:ss');
  const [time, setTime] = useState(timeNow);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs(new Date()).format('h:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { time };
};

const getFormattedDate = () => dayjs(new Date()).format('D.M.YYYY');

export const useCalendar = () => {
  const dateNow = getFormattedDate();
  const [date, setDate] = useState(dateNow);
  const [today, setToday] = useState<Today>({});
  const [daySection, setDaySection] = useState<DaySection | null>(null);
  const [parsha, setParsha] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('calendar') || '';
    if (!data) {
      navigate('/upload');
    }

    const calendarData: [] = JSON.parse(data);

    const todayRow: any = calendarData.find(day => {
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
      selectDaySection(todayRow);
    }, 60000);

    fetchParsha();

    setToday(todayRow);

    return () => clearInterval(interval);
  }, [date, navigate]);

  const selectDaySection = (todayRow: any) => {
    const now = dayjs();
    const beforeHaneitz = dayjs(todayRow['נץ החמה קטגוריה'], 'HH:mm:ss').subtract(3, 'hours');
    const afterHaneitz = dayjs(todayRow['נץ החמה קטגוריה'], 'HH:mm').add(30, 'minutes');
    const afternoon = dayjs(todayRow['סו"ז תפילה גר"א קטגוריה'], 'HH:mm').add(30, 'minutes');
    const night = dayjs(todayRow['שקיעה קטגוריה'], 'HH:mm:ss').add(12, 'hours').add(45, 'minutes');

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

  return { today, daySection, parsha };
};
