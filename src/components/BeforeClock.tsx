import { use24HrTime } from '../hooks/use24HrTime';
import { useCalculateSpecialDays } from '../hooks';
import type { ApiTimes } from '../types';

export default function BeforeClock({ times, timesElev }: ApiTimes) {
  const { checkForFriday, checkForShabbat } = useCalculateSpecialDays();
  const { convertFromUtcTime } = use24HrTime();

  return (
    <div className="top-left">
      {checkForFriday() ? (
        <>
          <label>פלג המנחה</label>
          <div className="time">{convertFromUtcTime(times?.plagHaMincha)}</div>
        </>
      ) : checkForShabbat() ? (
        <>
          <label>צאת שבת</label>
          <div className="time">{convertFromUtcTime(timesElev?.tzeit85deg)}</div>
        </>
      ) : (
        <div className="placeholder"></div>
      )}
    </div>
  );
}
