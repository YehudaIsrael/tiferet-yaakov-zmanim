export default function BeforeClock({ today }: any) {
  return (
    <div className="top-left">
      {today['צאת שבת רגיל מקטגוריה'] ? (
        <>
          <label>צאת שבת</label>
          <div className="time">{today['צאת שבת רגיל מקטגוריה']?.slice(0, -1)}</div>
        </>
      ) : today['הדלקת נרות קטגוריה'] ? (
        <>
          <label>הדלקת נרות</label>
          <div className="time">{today['הדלקת נרות קטגוריה']?.slice(0, -1)}</div>
        </>
      ) : today['צאת תשעה באב הנהוג'] ? (
        <>
          <label>צאת הצום</label>
          <div className="time">{today['צאת תשעה באב הנהוג']?.slice(0, -1)}</div>
        </>
      ) : null}
    </div>
  );
}
