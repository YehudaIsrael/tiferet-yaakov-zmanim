import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const useTime = () => {
  const timeNow = dayjs().format('H:mm:ss');
  const [time, setTime] = useState(timeNow);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format('H:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { time };
};
