import { useCalculateSpecialDays } from '../hooks';
import type { ApiTimes } from '../types';

export default function BeforeClock({ times, timesElev }: ApiTimes) {
  const { checkForFriday, getCandleLightingTime, checkForShabbat, afterHatzot, calculateRTam } =
    useCalculateSpecialDays();

  return (
    <div className="top-right">
      {checkForFriday() ? (
        <>
          <label>הדלקת נרות</label>
          <div className="time">{getCandleLightingTime(timesElev)}</div>
        </>
      ) : checkForShabbat() && afterHatzot(times) ? (
        <>
          <label>צאת שבת לר' תם</label>
          <div className="time">{calculateRTam(timesElev)}</div>
        </>
      ) : (
        <div className="placeholder"></div>
      )}
    </div>
  );
}
