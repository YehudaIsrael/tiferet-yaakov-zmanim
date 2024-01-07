import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export const useTime = () => {
  const timeNow = new Date().toLocaleTimeString();
  const dateNow = dayjs(new Date()).format('DD.MM.YYYY');
  const [time, setTime] = useState(timeNow);
  const [date, setDate] = useState(dateNow);

  useEffect(() => {
    let interval: NodeJS.Timer;
    interval = setInterval(() => {
      // const test = dayjs().subtract(1, "day");
      const newTime = new Date();
      setTime(newTime.toLocaleTimeString());
      setDate(dayjs(newTime).format('D.M.YYYY'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { time, date };
};
