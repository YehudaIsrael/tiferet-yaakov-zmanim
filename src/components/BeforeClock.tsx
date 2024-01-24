export default function BeforeClock({ today }: any) {
  return (
    <>
      {today['צאת שבת רגיל מקטגוריה'] ? (
        <div>
          <label>צאת שבת</label>
          <div className="time">{today['צאת שבת רגיל מקטגוריה']?.slice(0, -1)}</div>
        </div>
      ) : today['הדלקת נרות קטגוריה'] ? (
        <div>
          <label>הדלקת נרות</label>
          <div className="time">{today['הדלקת נרות קטגוריה']?.slice(0, -1)}</div>
        </div>
      ) : today['צאת תשעה באב הנהוג'] ? (
        <div>
          <label>צאת הצום</label>
          <div className="time">{today['צאת תשעה באב הנהוג']?.slice(0, -1)}</div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
