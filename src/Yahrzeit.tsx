import { useNavigate } from 'react-router-dom';
import Afternoon from './components/Afternoon';
import EarlyMorning from './components/EarlyMorning';
import Morning from './components/Morning';
import Night from './components/Night';
import { DaySection, Paths } from './enums';
import { useCalendar } from './hooks/useCalendar';

export default function Yahrzeit() {
  const navigate = useNavigate();
  const { today, parsha, daySection, dayTitle } = useCalendar();

  return (
    <div className="yahrzeit container" onClick={() => navigate(Paths.Upload)}>
      <div className="jewish-week">
        {dayTitle} {today['יום בשבוע']} פרשת {parsha} - {today['תאריך']?.replace(" ה'", '')}
      </div>

      <div className="name">
        <div>הלימוד מוקדש לעילוי נשמת</div>
        <div>חיים ישראל פינחס</div>
        <div>בן משה אהרון</div>
      </div>

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
