import dayjs from 'dayjs';
import { testDate } from '../utils';
import type { Times } from '../types';

export const useCalculateSpecialDays = () => {
  const checkForFriday = () => testDate().day() === 5;

  const getCandleLightingTime = (timesElev: Times) => {
    console.log(timesElev);
    const candles = dayjs(timesElev?.sunset).subtract(40, 'minutes');
    return candles.format('HH:mm');
  };

  const checkForShabbat = () => testDate().day() === 6;

  const afterHatzot = (times: Times) => dayjs(times.chatzot) < dayjs();

  const calculateEndShabbat = (timesElev: Times) => {
    const rTam = dayjs(timesElev?.tzeit85deg).add(4, 'minutes');
    return rTam.format('HH:mm');
  };

  const calculateRTam = (timesElev: Times) => {
    const rTam = dayjs(timesElev?.sunset).add(72, 'minutes');
    return rTam.format('HH:mm');
  };

  return {
    checkForFriday,
    getCandleLightingTime,
    checkForShabbat,
    afterHatzot,
    calculateEndShabbat,
    calculateRTam,
  };
};
