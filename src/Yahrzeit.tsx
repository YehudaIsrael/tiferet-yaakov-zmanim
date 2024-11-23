import { useNavigate } from 'react-router-dom';
import Afternoon from './components/Afternoon';
import EarlyMorning from './components/EarlyMorning';
import Morning from './components/Morning';
import Night from './components/Night';
import { useCalculateTimes, useCalendarAPI } from './hooks';
import { DaySection, Paths } from './enums';

export default function Yahrzeit() {
  const navigate = useNavigate();
  const { hebrewDate, parsha, times, timesElev, daySection } = useCalendarAPI();
  const { getDayTitle } = useCalculateTimes();

  return (
    <div className="yahrzeit container" onClick={() => navigate(Paths.Upload)}>
      <div className="jewish-week">
        {getDayTitle(daySection)} פרשת {parsha}
      </div>

      <div className="name">
        <div>הלימוד מוקדש לעילוי נשמת</div>
        <div>חיים ישראל פינחס</div>
        <div>בן משה אהרון</div>
      </div>

      {daySection === DaySection.EarlyMorning ? (
        <EarlyMorning times={times} timesElev={timesElev} />
      ) : daySection === DaySection.Morning ? (
        <Morning times={times} timesElev={timesElev} />
      ) : daySection === DaySection.Afternoon ? (
        <Afternoon times={times} timesElev={timesElev} />
      ) : (
        <Night times={times} timesElev={timesElev} />
      )}
    </div>
  );
}
