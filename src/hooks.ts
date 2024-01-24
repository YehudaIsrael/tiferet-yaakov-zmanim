import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { DaySection } from './enums';
import { Context } from './context';

interface Today {
  [key: string]: string;
}

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
  const dateNow = dayjs(new Date()).format('DD.MM.YYYY');
  const [date, setDate] = useState(dateNow);
  const [today, setToday] = useState<Today>({});
  const [daySection, setDaySection] = useState<DaySection | null>(null);
  const { calendarData, setCalendarData } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date();
      // const test = dayjs().subtract(, 'day');
      setDate(dayjs(newTime).format('D.M.YYYY'));
    }, 1000);

    const data = localStorage.getItem('calendar') || '';
    if (!data) {
      navigate('/upload');
    }
    setCalendarData(JSON.parse(data));

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const todayRow: { [key: string]: any } =
      calendarData.find(day => {
        return day['תאריך לועזי'] === date;
      }) || {};

    if (!todayRow) navigate('/upload');

    const now = dayjs();
    const beforeHaneitz = dayjs(todayRow['נץ החמה קטגוריה']).subtract(2, 'hours');
    const afternoon = dayjs(todayRow['סו"ז תפילה גר"א קטגוריה']).add(30, 'minutes');
    if (now > beforeHaneitz && now < afternoon) {
      setDaySection(DaySection.Morning);
    } else {
      setDaySection(DaySection.Afternoon);
    }

    // Object.keys(now).map((key) => console.log(key));
    // console.log(now);
    setToday(todayRow || {});
  }, [calendarData, date, navigate]);

  return { today, daySection };
};
