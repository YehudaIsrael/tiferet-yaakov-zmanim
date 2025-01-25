import dayjs from 'dayjs';
import { DaySection } from '../enums';
import { Times } from '../types';
import { dayMap, testDate } from '../utils';

export const useCalculateTimes = () => {
  const getDayTitle = (daySection: DaySection) => {
    const day = testDate().day();
    const isNight = daySection === DaySection.Night ? true : false;
    const addDay = isNight ? 1 : 0;
    const trueDay = addDay + day === 7 ? 0 : day + addDay;
    return `${isNight ? 'ליל' : 'יום'} ${dayMap[trueDay]}`;
  };

  const getMinchaGedolah = (times: Times) => {
    const halfHourAfterChatzot = dayjs(times?.chatzot).add(30, 'minute');
    return dayjs(times?.minchaGedola).isBefore(halfHourAfterChatzot)
      ? halfHourAfterChatzot.format('HH:mm:ss')
      : dayjs(times?.minchaGedola).format('HH:mm:ss');
  };

  return { getDayTitle, getMinchaGedolah };
};
