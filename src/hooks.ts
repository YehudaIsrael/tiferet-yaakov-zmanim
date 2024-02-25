import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DaySection } from './enums';
import { Context } from './context';
import { Today } from './types';

dayjs.extend(customParseFormat);

export const useTime = () => {
  const timeNow = dayjs(new Date()).format("HH:mm:ss")
  const [time, setTime] = useState(timeNow);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs(new Date()).format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { time };
};

export const useCalendar = () => {
  const dateNow = dayjs(new Date()).format('D.M.YYYY');
  const [date, setDate] = useState(dateNow);
  const [today, setToday] = useState<Today>({});
  const [daySection, setDaySection] = useState<DaySection | null>(null);
  const [parsha, setParsha] = useState('');
  const { calendarData, setCalendarData } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = dayjs(new Date()).format('D.M.YYYY');
      if (newTime !== date) {
        setDate(dayjs(newTime).format('D.M.YYYY'));
        fetchParsha();
      }
    }, 60000);

    fetchParsha();

    const data = localStorage.getItem('calendar') || '';
    if (!data) {
      navigate('/upload');
    }
    setCalendarData(JSON.parse(data));

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!calendarData.length) return;

    const todayRow: any = calendarData.find(day => {
      return day['תאריך לועזי'] === date;
    });

    if (!todayRow) return navigate('/upload');

    console.log(todayRow)

    const now = dayjs()
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
    setToday(todayRow);
  }, [calendarData, date, navigate]);

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
