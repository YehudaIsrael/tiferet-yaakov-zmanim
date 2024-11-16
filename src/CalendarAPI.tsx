import { useNavigate } from 'react-router-dom';
import NightAPI from './components/NightAPI';
import { useCalendarAPI } from './hooks/useCalendarAPI';
import { Paths } from './enums';

export default function Calendar() {
  const navigate = useNavigate();
  const { hebrewDate, parsha, times } = useCalendarAPI();

  return (
    <div className="container" onClick={() => navigate(Paths.Upload)}>
      <div className="name">לעילוי נשמת חיים ישראל פינחס בן משה אהרון</div>

      <div className="jewish-week">פרשת {parsha}</div>
      <div className="jewish-date">{hebrewDate}</div>

      <NightAPI times={times} />
    </div>
  );
}
