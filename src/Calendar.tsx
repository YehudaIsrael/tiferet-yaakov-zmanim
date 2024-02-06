import Afternoon from './components/Afternoon';
import EarlyMorning from './components/EarlyMorning';
import Morning from './components/Morning';
import Night from './components/Night';
import { DaySection } from './enums';
import { useCalendar } from './hooks';

export default function Calendar() {
  const { today, parsha, daySection } = useCalendar();
  return (
    <div className="container">
      <div className="name">התכנה נתרמה לעילוי נשמת חיים ישראל פינחס בן משה אהרון</div>

      <div className="jewish-week">
        יום {today['יום בשבוע']} פרשת {parsha}
      </div>
      <div className="jewish-date">{today['תאריך']?.replace(" ה'", '')}</div>

      {daySection === DaySection.EarlyMorning ? (
        <EarlyMorning today={today} />
      ) : daySection === DaySection.Morning ? (
        <Morning today={today} />
      ) : daySection === DaySection.Afternoon ? (
        <Afternoon today={today} />
      ) : (
        <Night today={today} />
      )}
    </div>
  );
}
