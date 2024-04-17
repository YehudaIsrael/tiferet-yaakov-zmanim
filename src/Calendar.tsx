import { useEffect, useState } from 'react';
import Afternoon from './components/Afternoon';
import EarlyMorning from './components/EarlyMorning';
import Morning from './components/Morning';
import Night from './components/Night';
import { DaySection } from './enums';
import { useCalendar } from './hooks/useCalendar';

export default function Calendar() {
  const { today, parsha, daySection, getNextDay } = useCalendar();
  const [day, setDay] = useState(today);
  const [dayTitle, setDayTitle] = useState('יום');

  useEffect(() => {
    const newDay = getNextDay(today);
    setDayTitle(newDay ? 'ליל ' : 'יום');
    setDay(newDay || today);
  }, [day, getNextDay, today]);

  return (
    <div className="container">
      <div className="name">לעילוי נשמת חיים ישראל פינחס בן משה אהרון</div>

      <div className="jewish-week">
        {dayTitle} {day['יום בשבוע']} פרשת {parsha}
      </div>
      <div className="jewish-date">{day['תאריך']?.replace(" ה'", '')}</div>

      {day['ספירת העומר'] && (
        <div className="omer">
          <label>סה"ע</label>
          <div>{day['ספירת העומר']}</div>
        </div>
      )}

      {daySection === DaySection.EarlyMorning ? (
        <EarlyMorning today={day} />
      ) : daySection === DaySection.Morning ? (
        <Morning today={day} />
      ) : daySection === DaySection.Afternoon ? (
        <Afternoon today={day} />
      ) : (
        <Night today={day} />
      )}
    </div>
  );
}
