import { use24HrTime } from '../hooks/use24HrTime';

export default function AfterClock({ today }: any) {
  const { convert24HrTime } = use24HrTime();
  const shabbatEndTime = convert24HrTime(today['צאת הכוכבים ר"ת 72 שוות קטגוריה']?.slice(0, -1));
  return (
    <>
      {today['צאת שבת רגיל מקטגוריה'] ? (
        <div className="top-right">
          <label>צאת שבת ר"ת</label>
          <div className="time">{shabbatEndTime}</div>
        </div>
      ) : (
        <div className="placeholder"></div>
      )}
    </>
  );
}
