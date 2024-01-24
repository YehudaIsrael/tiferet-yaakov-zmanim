import Afternoon from './components/Afternoon';
import Morning from './components/Morning';
import { DaySection } from './enums';
import { useCalendar } from './hooks';

export default function Calendar() {
  const { today, daySection } = useCalendar();
  return (
    <div className="container">
      <div className="name">התוכנה נתרמה לעילוי נשמת חיים ישראל פינחס בן משה אהרון</div>

      <div className="jewish-date">
        יום {today['יום בשבוע']} - {today['תאריך']}
      </div>
      {daySection === DaySection.Morning ? <Morning today={today} /> : <Afternoon today={today} />}
    </div>
  );
}
