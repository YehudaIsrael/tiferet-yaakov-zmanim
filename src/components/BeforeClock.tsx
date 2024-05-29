import { use24HrTime } from '../hooks/use24HrTime';

export default function BeforeClock({ today }: any) {
  const { convert24HrTime } = use24HrTime();

  return (
    <div className="top-left">
      {today['צאת שבת רגיל מקטגוריה'] ? (
        <>
          <label>צאת שבת</label>
          <div className="time">
            {convert24HrTime(today['צאת שבת רגיל מקטגוריה']?.slice(0, -1))}
          </div>
        </>
      ) : today['הדלקת נרות קטגוריה'] ? (
        <>
          <label>הדלקת נרות</label>
          <div className="time">{convert24HrTime(today['הדלקת נרות קטגוריה']?.slice(0, -1))}</div>
        </>
      ) : today['צאת תשעה באב הנהוג'] ? (
        <>
          <label>צאת הצום</label>
          <div className="time">{convert24HrTime(today['צאת תשעה באב הנהוג']?.slice(0, -1))}</div>
        </>
      ) : (
        <div className="placeholder"></div>
      )}
    </div>
  );
}
