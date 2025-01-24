import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useCalculateSpecialDays } from './useCalculateSpecialDays';
import { initialTimes, testDate } from '../utils';
import { CalendarCategory, DaySection, Paths } from '../enums';
import type { CalendarDate, GroupedData, TimeEntry, Times } from '../types';

dayjs.extend(customParseFormat);

export const getFormattedDate = () => testDate().format('YYYY-MM-DD');

export const useCalendarAPI = () => {
  const [hebrewDate, setHebrewDate] = useState('');
  const [parsha, setParsha] = useState('');
  const [holiday, setHoliday] = useState('');
  const [omer, setOmer] = useState('');
  const [daySection, setDaySection] = useState<DaySection>(DaySection.Night);
  const { checkForShabbat } = useCalculateSpecialDays();
  const times = useRef<Times>(initialTimes);
  const timesElev = useRef<Times>(initialTimes);
  const calendar = useRef<CalendarDate[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const scheduleNextUpdate = () => {
      const now = dayjs();
      const midnight = dayjs().endOf('day').add(1, 'millisecond');
      const timeToMidnight = midnight.diff(now);

      setTimeout(() => {
        initFunctions();
      }, timeToMidnight);
    };

    const interval = setInterval(() => {
      setToday();
      selectDaySection();
    }, 60000);

    const setToday = () => {
      const { timeOfYear, timeOfYearElev, calendarYears } = getFromLocalStorage();
      if (!timeOfYear || !timeOfYearElev || !calendarYears) {
        getYearTimes().then(() => initFunctions());
        return;
      }
      const formattedToday = getFormattedDate();
      times.current = JSON.parse(timeOfYear)[formattedToday];
      timesElev.current = JSON.parse(timeOfYearElev)[formattedToday];
      calendar.current = JSON.parse(calendarYears);
    };

    if (!times.current || !timesElev.current || !calendar.current.length) {
      getYearTimes().then(() => initFunctions());
    }

    const initFunctions = () => {
      checkCalendar(() => {
        getHebrewDate();
        getParsha();
        getHoliday();
        getOmerCount();
        getYahrzeit();
      });
      setToday();
      selectDaySection();
      scheduleNextUpdate();
    };
    initFunctions();

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFromLocalStorage = () => {
    const year = new Date().getFullYear();
    return {
      timeOfYear: localStorage.getItem(`timeOfYear-${year}`),
      timeOfYearElev: localStorage.getItem(`timeOfYearElev-${year}`),
      calendarYears: localStorage.getItem('calendar'),
    };
  };

  const getYearTimes = async () => {
    const year = new Date().getFullYear();
    const nextYear = year + 1;
    const timesUrl1 = `https://www.hebcal.com/zmanim?cfg=json&geonameid=283046&start=${year}-01-01&end=${year}-07-13&sec=1`;
    const timesUrl2 = `https://www.hebcal.com/zmanim?cfg=json&geonameid=283046&start=${year}-07-14&end=${year}-12-31&sec=1`;
    const timesElevUrl1 = `https://www.hebcal.com/zmanim?cfg=json&geonameid=283046&ue=on&start=${year}-01-01&end=${year}-07-13&sec=1`;
    const timesElevUrl2 = `https://www.hebcal.com/zmanim?cfg=json&geonameid=283046&ue=on&start=${year}-07-14&end=${year}-12-31&sec=1`;
    const calendarUrl = `https://www.hebcal.com/hebcal?v=1&cfg=json&geonameid=283046&year=${year}&maj=on&min=on&nx=on&mf=on&ss=on&i=on&s=on&leyning=off&d=on&o=on`;
    const calendarNextUrl = `https://www.hebcal.com/hebcal?v=1&cfg=json&geonameid=283046&year=${nextYear}&maj=on&min=on&nx=on&mf=on&ss=on&i=on&s=on&leyning=off&d=on&o=on`;

    const urls = [timesUrl1, timesUrl2, timesElevUrl1, timesElevUrl2, calendarUrl, calendarNextUrl];

    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(response => response.json()));
    const [times1, times2, timesElev1, timesElev2, calendarRes, calendarNext] = data;

    const timeOfYear = groupByDate(times1.times, times2.times);
    const timeOfYearElev = groupByDate(timesElev1.times, timesElev2.times);

    localStorage.setItem(`timeOfYear-${year}`, JSON.stringify(timeOfYear));
    localStorage.setItem(`timeOfYearElev-${year}`, JSON.stringify(timeOfYearElev));
    localStorage.setItem('calendar', JSON.stringify([...calendarRes.items, ...calendarNext.items]));
  };

  const groupByDate = (...times: { [key: string]: TimeEntry }[]): GroupedData => {
    const result: GroupedData = {};
    times.forEach(source => {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          const entries = source[key];
          for (const entryKey in entries) {
            if (entries.hasOwnProperty(entryKey)) {
              if (!result[entryKey]) {
                result[entryKey] = {};
              }
              result[entryKey][key] = entries[entryKey];
            }
          }
        }
      }
    });
    return result;
  };

  const checkCalendar = (func: Function) => {
    const { calendarYears } = getFromLocalStorage();
    if (!calendarYears) {
      getYearTimes().then(() => func());
      return null;
    }
    const nextYear = (new Date().getFullYear() + 1).toString();
    const parsedCalendar = JSON.parse(calendarYears);
    if (!parsedCalendar.some((day: CalendarDate) => day.date.includes(nextYear))) {
      getYearTimes().then(() => func());
      return null;
    }
    func();
  };

  const getCalendarDateFromCategory = (category: CalendarCategory, isNight?: boolean) => {
    const date = testDate();
    const formatted = date.add(isNight ? 1 : 0, 'day').format('YYYY-MM-DD');
    const day = calendar.current.find(
      (day: CalendarDate) => day.date === formatted && day.category === category
    );
    return day;
  };

  const getHebrewDate = (isNight?: boolean) => {
    const day = getCalendarDateFromCategory(CalendarCategory.hebdate, isNight);
    if (!day) return;
    setHebrewDate(`${day.heDateParts?.d} ${day.heDateParts?.m} ${day.heDateParts?.y}`);
  };

  const getParsha = (isMotzeiShabbat?: boolean) => {
    const date = testDate();
    const formatted = date
      .add(isMotzeiShabbat ? 1 : 0, 'week')
      .startOf('week')
      .add(6, 'day')
      .format('YYYY-MM-DD');
    const parsha = calendar.current.find(
      (day: CalendarDate) => day.date === formatted && day.category === CalendarCategory.parashat
    );
    setParsha(parsha?.hebrew || '');
  };

  const getHoliday = (isNight?: boolean) => {
    const holidayDate = getCalendarDateFromCategory(CalendarCategory.holiday, isNight);
    setHoliday(holidayDate?.hebrew || '');
  };

  const getOmerCount = (isNight?: boolean) => {
    const omerDate = getCalendarDateFromCategory(CalendarCategory.omer, isNight);
    setOmer(omerDate?.title || '');
  };

  const getYahrzeit = (isNight?: boolean) => {
    const yahrzeit = getCalendarDateFromCategory(CalendarCategory.hebdate, isNight);
    if (location.pathname === Paths.Home && yahrzeit?.hdate.includes('12 Cheshvan')) {
      navigate(Paths.Yahrzeit);
    } else if (location.pathname === Paths.Yahrzeit && !yahrzeit) {
      navigate(Paths.Home);
    }
  };

  const selectDaySection = () => {
    if (!times.current || !timesElev.current) {
      return;
    }
    const now = testDate();
    const midnight = dayjs().startOf('day').subtract(2, 'minutes');
    const beforeHaneitz = dayjs(times.current.sunrise).subtract(3, 'hours');
    const afterHaneitz = dayjs(times.current.sunrise).add(30, 'minutes');
    const afternoon = dayjs(times.current.sofZmanTfilla).add(30, 'minutes');
    const night = dayjs(timesElev.current.sunset).add(20, 'minutes');
    const rTam = dayjs(timesElev.current.sunset).add(82, 'minutes');

    const isShabbat = now.day() === 6;

    if (now > midnight && now < beforeHaneitz) {
      setDaySection(DaySection.Night);
    } else if (now > beforeHaneitz && now < afterHaneitz) {
      setDaySection(DaySection.EarlyMorning);
    } else if (now > afterHaneitz && now < afternoon) {
      setDaySection(DaySection.Morning);
    } else if (now > afternoon && (now < night || (isShabbat && now < rTam))) {
      setDaySection(DaySection.Afternoon);
    } else {
      getHebrewDate(true);
      getParsha(checkForShabbat());
      getHoliday(true);
      getOmerCount(true);
      getYahrzeit(true);
      setDaySection(DaySection.Night);
    }
  };

  return {
    hebrewDate,
    parsha,
    holiday,
    omer,
    times: times.current,
    timesElev: timesElev.current,
    daySection,
  };
};
