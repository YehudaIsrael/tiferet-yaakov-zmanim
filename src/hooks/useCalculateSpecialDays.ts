import dayjs from 'dayjs';
import { testDate } from '../utils';
import type { CalendarDate, Times } from '../types';

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

  const calculateErevYomTov = (date: CalendarDate | undefined) => {
    if (!date) return false
    const dates = [
      '14 Nisan',
      '20 Nisan',
      '5 Sivan',
      '29 Elul',
      '9 Tishrei',
      '14 Tishrei',
      '21 Tishrei',
    ];
    const dayMonth = date.hdate.split(' ').slice(0, 2).join(' ');
    return dates.includes(dayMonth);
  };

  const calculateYomTov = (date: CalendarDate | undefined) => {
    if (!date) return false
    const dates = [
      '15 Nisan',
      '21 Nisan',
      '6 Sivan',
      '2 Tishrei',
      '10 Tishrei',
      '15 Tishrei',
      '22 Tishrei',
    ];
    const dayMonth = date.hdate.split(' ').slice(0, 2).join(' ');
    return dates.includes(dayMonth);
  };

  return {
    checkForFriday,
    getCandleLightingTime,
    checkForShabbat,
    afterZmamTefilah,
    calculateEndShabbat,
    calculateRTam,
    calculateErevYomTov,
    calculateYomTov,
  };
};
