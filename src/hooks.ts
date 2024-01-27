import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { DaySection } from './enums';
import { Context } from './context';
import { Today } from './types';

export const useTime = () => {
  const timeNow = new Date().toLocaleTimeString();
  const [time, setTime] = useState(timeNow);

  useEffect(() => {
    let interval: NodeJS.Timer;
    interval = setInterval(() => {
      const newTime = new Date();
      setTime(newTime.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { time };
};

export const useCalendar = () => {
  const dateNow = dayjs(new Date()).format('DD.M.YYYY');
  const [date, setDate] = useState(dateNow);
  const [today, setToday] = useState<Today>({});
  const [daySection, setDaySection] = useState<DaySection | null>(null);
  const [parsha, setParsha]= useState('')
  const { calendarData, setCalendarData } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = dayjs(new Date()).format('D.M.YYYY');
      if (newTime !== date) {
        // const test = dayjs().subtract(, 'day');
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

    const todayRow: { [key: string]: any } | undefined = calendarData.find(day => {
      return day['תאריך לועזי'] === date;
    });

    if (!todayRow) return navigate('/upload');

    const now = dayjs();
    const beforeHaneitz = dayjs(todayRow['נץ החמה קטגוריה']).subtract(3, 'hours');
    const afterHaneitz = dayjs(todayRow['נץ החמה קטגוריה']).add(30, 'minutes');
    const afternoon = dayjs(todayRow['סו"ז תפילה גר"א קטגוריה']).add(30, 'minutes');
    const night = dayjs(todayRow['שקיעה קטגוריה']).add(45, 'minutes');
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
        console.log(res.calendar_items[0].displayValue.he);
        setParsha(res.calendar_items[0].displayValue.he);
      })
      .catch(err => console.error(err));
  };

  return { today, daySection, parsha };
};