import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './context';
import { useTime } from './hooks';

interface Object {
  [key: string]: string;
}
export default function Calendar() {
  const navigate = useNavigate();
  const { calendarData, setCalendarData } = useContext(Context);
  const [today, setToday] = useState<Object>({});
  const { time, date } = useTime();

  useEffect(() => {
    const data = localStorage.getItem('calendar') || '';
    if (!data) {
      navigate('/upload');
    }
    setCalendarData(JSON.parse(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const now: { [key: string]: any } =
      calendarData.find((day) => {
        return day['תאריך לועזי'] === date;
      }) || {};
    if (!now) {
      navigate('/upload');
    }

    Object.keys(now).map((key) => console.log(key));
    console.log(now);
    setToday(now || {});
  }, [calendarData, date, navigate]);

  return (
    <div className="container">
      <div>התוכנה נתרמה לעילוי נשמת חיים ישראל פינחס בן משה אהרון</div>

      <div className="jewish-date">
        {' '}
        יום {today['יום בשבוע']} - {today['תאריך']}
      </div>
      <div className="grid">
        <div>
          <label>הנץ החמה</label>
          <div className="time">{today['נץ החמה קטגוריה']}</div>
        </div>

        <div>
          <label>סו"ז ק"ש מג"א</label>
          <div className="time">
            {today['סו"ז ק"ש מג"א קטגוריה']?.slice(0, -1)}
          </div>
        </div>

        <div>
          <label>סו"ז ק"ש גר"א</label>
          <div className="time">
            {today['סו"ז ק"ש גר"א קטגוריה']?.slice(0, -1)}
          </div>
        </div>

        <div>
          <label>סו"ז תפילה גר"א</label>
          <div className="time">
            {today['סו"ז תפילה גר"א קטגוריה']?.slice(0, -1)}
          </div>
        </div>

        <div className="time-now">{time}</div>

        {today['צאת שבת רגיל מקטגוריה'] ? (
          <div className="shabbat-space">
            <div>
              <label>צאת שבת</label>
              <div className="time">
                {today['צאת שבת רגיל מקטגוריה']?.slice(0, -1)}
              </div>
            </div>
            <div>
              <label>צאת הכוכבים ר"ת</label>
              <div className="time">
                {today['צאת הכוכבים ר"ת 72 קטגוריה']?.slice(0, -1)}
              </div>
            </div>
          </div>
        ) : today['הדלקת נרות קטגוריה'] ? (
          <div className="shabbat-space">
            <div>
              <label>סו"ז סעודה בע"ש</label>
              <div className="time">
                {today['סו"ז סעודה בע"ש וחג קטגוריה']?.slice(0, -1)}
              </div>
            </div>
            <div>
              <label>הדלקת נרות</label>
              <div className="time">
                {today['הדלקת נרות קטגוריה']?.slice(0, -1)}
              </div>
            </div>
          </div>
        ) : today['צאת תשעה באב הנהוג'] ? (
          <div>
            <label>צאת הצום</label>
            <div className="time">
              {today['צאת תשעה באב הנהוג']?.slice(0, -1)}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div>
          <label>חצות</label>
          <div className="time">{today['חצות יום ולילה']?.slice(0, -1)}</div>
        </div>

        <div>
          <label>מנחה גדולה</label>
          <div className="time">{today['מנחה גדולה המאוחר']?.slice(0, -1)}</div>
        </div>

        <div>
          <label>שקיעה</label>
          <div className="time">{today['שקיעה קטגוריה']}</div>
        </div>
      </div>
    </div>
  );
}
