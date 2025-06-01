import { useCalculateSpecialDays } from '../hooks';
import type { ApiTimes } from '../types';

export default function BeforeClock({ date, times, timesElev }: ApiTimes) {
  const {
    checkForFriday,
    getCandleLightingTime,
    checkForShabbat,
    afterZmamTefilah,
    calculateRTam,
    calculateErevYomTov,
    calculateYomTov,
  } = useCalculateSpecialDays();

  return (
    <div className="top-right">
      {checkForShabbat() && afterZmamTefilah(times) ? (
        <>
          <label>צאת שבת לר"ת</label>
          <div className="time">{calculateRTam(timesElev)}</div>
        </>
      ) : checkForFriday() || calculateErevYomTov(date) ? (
        <>
          <label>הדלקת נרות</label>
          <div className="time">{getCandleLightingTime(timesElev)}</div>
        </>
      ) : calculateYomTov(date) ? (
        <>
          <label>צאת יו"ט לר"ת</label>
          <div className="time">{calculateRTam(timesElev)}</div>
        </>
      ) : (
        <div className="placeholder"></div>
      )}
    </div>
  );
}
