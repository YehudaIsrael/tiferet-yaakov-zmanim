import { use24HrTime } from '../hooks/use24HrTime';

export default function AfterClock({ today }: any) {
  const { convert24HrTime } = use24HrTime();
  const shabbatEndTime = convert24HrTime(today['צאת הכוכבים ר"ת 72 שוות קטגוריה']?.slice(0, -1));
  const yomTovEndTime = convert24HrTime(today['צאת החג לר"ת מקטגוריה']?.slice(0, -1));

  return (
    <>
      {today['צאת שבת רגיל מקטגוריה'] ? (
        <div className="top-right">
          <label>צאת שבת ר"ת</label>
          <div className="time">{shabbatEndTime}</div>
        </div>
      ) : today['צאת החג לר"ת מקטגוריה'] ? (
        <div className="top-right">
          <label>צאת החג ר"ת</label>
          <div className="time">{yomTovEndTime}</div>
        </div>
      ) : (
        <div className="placeholder"></div>
      )}
    </>
  );
}
