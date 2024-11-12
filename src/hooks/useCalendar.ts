import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getFormattedDate, getNextDay, testDate } from '../utils';
import { DaySection, Paths } from '../enums';
import { Today } from '../types';

dayjs.extend(customParseFormat);

export const useCalendar = () => {
  const dateNow = getFormattedDate();
  const [date, setDate] = useState<string>(dateNow);
  const [today, setToday] = useState<Today>({});
  const [daySection, setDaySection] = useState<DaySection | null>(null);
  const [dayTitle, setDayTitle] = useState('יום');
  const [parsha, setParsha] = useState('');
  const calendarData = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem('calendar') || '';
    if (!data) {
      navigate(Paths.Upload);
    }

    calendarData.current = JSON.parse(data);

    const todayRow = calendarData.current.find(day => {
      return day['תאריך לועזי'] === date;
    });

    if (!todayRow) return navigate(Paths.Upload);

    selectDaySection(todayRow);
    setTomorrowDate(todayRow);

    const interval = setInterval(() => {
      const newTime = getFormattedDate();
      setDate(newTime);
      if (newTime !== date) {
        fetchParsha();
      }
      selectDaySection(todayRow);
      setTomorrowDate(todayRow);
    }, 60000);

    fetchParsha();

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, navigate]);

  const selectDaySection = (todayRow: Today) => {
    const now = testDate();
    const beforeHaneitz = dayjs(todayRow['נץ החמה קטגוריה'], 'HH:mm:ss').subtract(3, 'hours');
    const afterHaneitz = dayjs(todayRow['נץ החמה קטגוריה'], 'HH:mm').add(30, 'minutes');
    const afternoon = dayjs(todayRow['סו"ז תפילה גר"א קטגוריה'], 'HH:mm').add(30, 'minutes');
    const night = dayjs(todayRow['שקיעה קטגוריה'], 'HH:mm').add(12, 'hours').add(20, 'minutes');

    if (now > beforeHaneitz && now < afterHaneitz) {
      setDaySection(DaySection.EarlyMorning);
    } else if (now > afterHaneitz && now < afternoon) {
      setDaySection(DaySection.Morning);
    } else if (now > afternoon && now < night) {
      setDaySection(DaySection.Afternoon);
    } else {
      setDaySection(DaySection.Night);
    }
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

  const setTomorrowDate = (todayRow: Today) => {
    const newDay = getNextDay(todayRow);
    checkYahrzeit(newDay || todayRow);
    setToday(newDay || todayRow);
    setDayTitle(newDay ? 'ליל ' : 'יום');
  };

  const checkYahrzeit = (todayRow: Today) => {
    const yahrzeit = todayRow['תאריך'].includes('י"ב מרחשון');
    if (location.pathname === Paths.Home && yahrzeit) {
      navigate(Paths.Yahrzeit);
    } else if (location.pathname === Paths.Yahrzeit && !yahrzeit) {
      navigate(Paths.Home);
    }
  };

  return { today, daySection, dayTitle, parsha };
};
