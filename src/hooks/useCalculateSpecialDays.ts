import dayjs from 'dayjs';
import { testDate } from '../utils';
import type { Times } from '../types';

export const useCalculateSpecialDays = () => {
  const checkForFriday = () => testDate().day() === 5;

  const getCandleLightingTime = (timesElev: Times) =>
    dayjs(timesElev?.sunset).subtract(40, 'minutes').format('HH:mm');

  const checkForShabbat = () => testDate().day() === 6;

  const afterZmamTefilah = (times: Times) => dayjs(times.sofZmanTfilla) < testDate();

  const calculateEndShabbat = (timesElev: Times) =>
    dayjs(timesElev?.tzeit85deg).add(4, 'minutes').format('HH:mm');

  const calculateRTam = (timesElev: Times) =>
    dayjs(timesElev?.sunset).add(72, 'minutes').format('HH:mm:ss');

  return {
    checkForFriday,
    getCandleLightingTime,
    checkForShabbat,
    afterZmamTefilah,
    calculateEndShabbat,
    calculateRTam,
  };
};
