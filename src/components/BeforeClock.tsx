import { use24HrTime } from '../hooks/use24HrTime';
import { useCalculateSpecialDays } from '../hooks';
import type { ApiTimes } from '../types';

export default function BeforeClock({ times, timesElev }: ApiTimes) {
  const { checkForFriday, checkForShabbat, afterZmamTefilah, calculateEndShabbat } =
    useCalculateSpecialDays();
  const { convertFromUtcTime } = use24HrTime();

  return (
    <div className="top-left">
      {checkForFriday() ? (
        <>
          <label>פלג המנחה</label>
          <div className="time">{convertFromUtcTime(times?.plagHaMincha)}</div>
        </>
      ) : checkForShabbat() && afterZmamTefilah(times) ? (
        <>
          <label>צאת שבת</label>
          <div className="time">{calculateEndShabbat(timesElev)}</div>
        </>
      ) : (
        <div className="placeholder"></div>
      )}
    </div>
  );
}
