import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { initialTimes, testDate } from '../utils';
import { DaySection } from '../enums';
import { GroupedData, TimeEntry, Times } from '../types';

dayjs.extend(customParseFormat);

export const getFormattedDate = () => testDate().format('YYYY-MM-DD');

export const useCalendarAPI = () => {
  const [hebrewDate, setHebrewDate] = useState('');
  const [parsha, setParsha] = useState('');
  const [daySection, setDaySection] = useState<DaySection>(DaySection.Night);
  const times = useRef<Times>(initialTimes);
  const timesElev = useRef<Times>(initialTimes);

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
      const { calendar, timeOfYear, timeOfYearElev } = getFromLocalStorage();
      if (!calendar || !timeOfYear || !timeOfYearElev) {
        getYearTimes().then(() => initFunctions());
        return;
      }
      const formattedToday = getFormattedDate();
      times.current = JSON.parse(timeOfYear)[formattedToday];
      timesElev.current = JSON.parse(timeOfYearElev)[formattedToday];
    };

    const initFunctions = () => {
      fetchHebrewDate();
      fetchParsha();
      setToday();
      selectDaySection();
      scheduleNextUpdate();
    };
    initFunctions();

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAPI = async (url: string) => {
    try {
      const resp = await fetch(url);
      return resp.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getFromLocalStorage = () => {
    const year = new Date().getFullYear();
    return {
      timeOfYear: localStorage.getItem(`timeOfYear-${year}`),
      timeOfYearElev: localStorage.getItem(`timeOfYearElev-${year}`),
      calendar: localStorage.getItem('calendar'),
    };
  };

  const getYearTimes = async () => {
    const year = new Date().getFullYear();
    const timesUrl1 = `https://www.hebcal.com/zmanim?cfg=json&geonameid=283046&start=${year}-01-01&end=${year}-07-13&sec=1`;
    const timesUrl2 = `https://www.hebcal.com/zmanim?cfg=json&geonameid=283046&start=${year}-07-14&end=${year}-12-31&sec=1`;
    const timesElevUrl1 = `https://www.hebcal.com/zmanim?cfg=json&geonameid=283046&ue=on&start=${year}-01-01&end=${year}-07-13&sec=1`;
    const timesElevUrl2 = `https://www.hebcal.com/zmanim?cfg=json&geonameid=283046&ue=on&start=${year}-07-14&end=${year}-12-31&sec=1`;
    const calendarUrl =
      'https://www.hebcal.com/hebcal?v=1&cfg=json&geonameid=283046&year=2024&maj=on&min=on&nx=on&mf=on&ss=on&i=on&s=on&leyning=off&d=on&o=on';

    const urls = [timesUrl1, timesUrl2, timesElevUrl1, timesElevUrl2, calendarUrl];

    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(response => response.json()));
    const [times1, times2, timesElev1, timesElev2, calendar] = data;

    const timeOfYear = groupByDate(times1.times, times2.times);
    const timeOfYearElev = groupByDate(timesElev1.times, timesElev2.times);
    console.log(timeOfYear, timeOfYearElev);

    localStorage.setItem(`timeOfYear-${year}`, JSON.stringify(timeOfYear));
    localStorage.setItem(`timeOfYearElev-${year}`, JSON.stringify(timeOfYearElev));
    localStorage.setItem('calendar', JSON.stringify(calendar));
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

  const fetchHebrewDate = (isNight?: boolean) => {
    const date = testDate();
    const formatted = date.format('YYYY-MM-DD');
    const gs = isNight ? 'on' : 'off';
    const url = `https://www.hebcal.com/converter?cfg=json&date=${formatted}&g2h=1&gs=${gs}&strict=1`;
    fetchAPI(url).then(res => {
      const { heDateParts } = res;
      setHebrewDate(`${heDateParts.d} ${heDateParts.m} ${heDateParts.y}`);
    });
  };

  const fetchParsha = () => {
    const url =
      'https://www.sefaria.org/api/calendars?diaspora=0&timezone=Asia/Jerusalem&custom=ashkenazi';
    fetchAPI(url).then(res => {
      setParsha(res.calendar_items[0].displayValue.he);
    });
  };

  const selectDaySection = () => {
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
      fetchHebrewDate(true);
      setDaySection(DaySection.Night);
    }
  };

  return { hebrewDate, parsha, times: times.current, timesElev: timesElev.current, daySection };
};
