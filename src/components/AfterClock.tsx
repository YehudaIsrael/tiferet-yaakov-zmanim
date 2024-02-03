export default function AfterClock({ today }: any) {
  return (
    <>
      {today['צאת שבת רגיל מקטגוריה'] ? (
        <div className="top-right">
          <label>צאת שבת ר"ת</label>
          <div className="time">{today['צאת הכוכבים ר"ת 72 קטגוריה']?.slice(0, -1)}</div>
        </div>
      ) : (
        <div className="placeholder"></div>
      )}
    </>
  );
}
