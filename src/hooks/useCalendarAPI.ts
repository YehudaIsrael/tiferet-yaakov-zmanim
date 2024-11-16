import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { testDate } from '../utils';

dayjs.extend(customParseFormat);

export const useCalendarAPI = () => {
  const [hebrewDate, setHebrewDate] = useState('');
  const [parsha, setParsha] = useState('');
  const [times, setTimes] = useState(null);

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
      fetchZmanimTimesElevation();
      scheduleNextUpdate();
    };

    initFunctions();
  }, []);

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

  const fetchZmanimTimesElevation = () => {
    const url = 'https://www.hebcal.com/zmanim?cfg=json&geonameid=283046&ue=on&sec=1';
    fetch(url)
      .then(resp => resp.json())
      .then(res => {
        console.log(res.times)
        setTimes(res.times);
      })
      .catch(err => console.error(err));
  };

  return { hebrewDate, parsha, times };
};
