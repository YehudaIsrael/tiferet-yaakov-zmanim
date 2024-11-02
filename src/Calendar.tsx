import { useNavigate } from 'react-router-dom';
import Afternoon from './components/Afternoon';
import EarlyMorning from './components/EarlyMorning';
import Morning from './components/Morning';
import Night from './components/Night';
import { DaySection } from './enums';
import { useCalendar } from './hooks/useCalendar';

export default function Calendar() {
  const navigate = useNavigate();
  const { today, parsha, daySection, dayTitle } = useCalendar();

  return (
    <div className="container" onClick={() => navigate('/upload')}>
      <div className="name">לעילוי נשמת חיים ישראל פינחס בן משה אהרון</div>

      <div className="jewish-week">
        {dayTitle} {today['יום בשבוע']} פרשת {parsha}
      </div>
      <div className="jewish-date">{today['תאריך']?.replace(" ה'", '')}</div>

      {today['ספירת העומר'] && (
        <div className="omer">
          <label>סה"ע</label>
          <div>{today['ספירת העומר']}</div>
        </div>
      )}

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
