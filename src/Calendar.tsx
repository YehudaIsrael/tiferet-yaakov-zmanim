import { useCalculateTimes, useCalendarAPI } from './hooks';
import { DaySection } from './enums';
import EarlyMorning from './components/EarlyMorning';
import Morning from './components/Morning';
import Afternoon from './components/Afternoon';
import Night from './components/Night';

export default function Calendar() {
  const { hebrewDate, parsha, holiday, daySection, ...params } = useCalendarAPI();
  const { getDayTitle } = useCalculateTimes();

  return (
    <div className="container">
      <div className="name">לעילוי נשמת חיים ישראל פינחס בן משה אהרון</div>

      <div className="jewish-week">
        {getDayTitle(daySection)} {parsha} {holiday ? `- ${holiday}` : ''}
      </div>
      <div className="jewish-date">{hebrewDate}</div>

      {daySection === DaySection.EarlyMorning ? (
        <EarlyMorning {...params} />
      ) : daySection === DaySection.Morning ? (
        <Morning {...params} />
      ) : daySection === DaySection.Afternoon ? (
        <Afternoon {...params} />
      ) : (
        <Night {...params} />
      )}

      <div className="license">
        Jewish holidays and zmanim are provided by Hebcal.com with a CC BY 4.0 International
        License.
      </div>
    </div>
  );
}
