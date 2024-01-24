export default function AfterClock({ today }: any) {
  return (
    <>
      {today['צאת שבת רגיל מקטגוריה'] ? (
        <div>
          <label>צאת שבת ר"ת</label>
          <div className="time">{today['צאת הכוכבים ר"ת 72 קטגוריה']?.slice(0, -1)}</div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
