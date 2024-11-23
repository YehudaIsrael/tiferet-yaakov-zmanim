import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { initialTimes, testDate } from '../utils';
import { DaySection } from '../enums';
import { Times } from '../types';

dayjs.extend(customParseFormat);

export const useCalendarAPI = () => {
  const [hebrewDate, setHebrewDate] = useState('');
  const [parsha, setParsha] = useState('');
  const [times, setTimes] = useState<Times>(initialTimes);
  const [timesElev, setTimesElev] = useState<Times>(initialTimes);
  const [daySection, setDaySection] = useState<DaySection>(DaySection.Morning);

  useEffect(() => {
    const scheduleNextUpdate = () => {
      const now = dayjs();
      const midnight = dayjs().endOf('day').add(1, 'millisecond');
      const timeToMidnight = midnight.diff(now);

      setTimeout(() => {
        initFunctions();
      }, timeToMidnight);
    };

    const initFunctions = () => {
      fetchHebrewDate();
      fetchParsha();
      fetchZmanimTimes();
      fetchZmanimTimesElevation();
      scheduleNextUpdate();
    };
    initFunctions();

    const interval = setInterval(() => {
      selectDaySection();
    }, 60000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (times.alotHaShachar && timesElev.alotHaShachar) {
      selectDaySection()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [times, timesElev]);

  const fetchHebrewDate = () => {
    const date = testDate();
    const formatted = date.format('YYYY-MM-DD');
    const url = `https://www.hebcal.com/converter?cfg=json&date=${formatted}&g2h=1&gs=on&strict=1`;
    fetch(url)
      .then(resp => resp.json())
      .then(res => {
        const { heDateParts } = res;
        setHebrewDate(`${heDateParts.d} ${heDateParts.m} ${heDateParts.y}`);
      })
      .catch(err => console.error(err));
  };

  const fetchParsha = () => {
    const url =
      'https://www.sefaria.org/api/calendars?diaspora=0&timezone=Asia/Jerusalem&custom=ashkenazi';
    fetch(url)
      .then(resp => resp.json())
      .then(res => {
        setParsha(res.calendar_items[0].displayValue.he);
      })
      .catch(err => console.error(err));
  };

  const fetchZmanimTimes = () => {
    const url = 'https://www.hebcal.com/zmanim?cfg=json&geonameid=283046&sec=1';
    fetch(url)
      .then(resp => resp.json())
      .then(res => {
        setTimes(res.times);
      })
      .catch(err => console.error(err));
  };

  const fetchZmanimTimesElevation = () => {
    const url = 'https://www.hebcal.com/zmanim?cfg=json&geonameid=283046&ue=on&sec=1';
    fetch(url)
      .then(resp => resp.json())
      .then(res => {
        setTimesElev(res.times);
      })
      .catch(err => console.error(err));
  };

  const selectDaySection = () => {
    const now = testDate();
    const beforeHaneitz = dayjs(times?.sunrise).subtract(3, 'hours');
    const afterHaneitz = dayjs(times?.sunrise).add(30, 'minutes');
    const afternoon = dayjs(times?.sofZmanTfilla).add(30, 'minutes');
    const night = dayjs(timesElev?.sunset).add(20, 'minutes');
    const rTam = dayjs(timesElev?.tzeit85deg).add(82, 'minutes');

    const isShabbat = now.day() === 6;

    if (now > beforeHaneitz && now < afterHaneitz) {
      setDaySection(DaySection.EarlyMorning);
    } else if (now > afterHaneitz && now < afternoon) {
      setDaySection(DaySection.Morning);
    } else if (now > afternoon && (now < night || (isShabbat && now < rTam))) {
      setDaySection(DaySection.Afternoon);
    } else {
      setDaySection(DaySection.Night);
    }
  };

  return { hebrewDate, parsha, times, timesElev, daySection };
};
