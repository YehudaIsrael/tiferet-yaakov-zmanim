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

  const calculateRTam = (timesElev: Times) => {
    const rTam = dayjs(timesElev?.tzeit85deg).add(72, 'minutes');
    return rTam.format('HH:mm');
  };

  return { checkForFriday, getCandleLightingTime, checkForShabbat, calculateRTam };
};
