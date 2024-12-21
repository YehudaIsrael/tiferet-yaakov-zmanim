import { use24HrTime } from '../hooks';
import BeforeClock from './AfterClock';
import AfterClock from './AfterClock';
import Time from './Time';
import type { ApiTimes } from '../types';

export default function Morning({ times, timesElev }: ApiTimes) {
  const { convertFromUtcTime } = use24HrTime();

  return (
    <div className="grid">
      <BeforeClock times={times} timesElev={timesElev} />

      <AfterClock times={times} timesElev={timesElev} />
      <Time />

      <div className="bottom-left">
        <label>עלות השחר</label>
        <div className="time">{convertFromUtcTime(times?.alotHaShachar)}</div>
      </div>

      <div className="bottom-center">
        <label>משיכיר</label>
        <div className="time">{convertFromUtcTime(times?.misheyakir)}</div>
      </div>

      <div className="bottom-right">
        <label>הנץ החמה</label>
        <div className="time">{convertFromUtcTime(times?.sunrise)}</div>
      </div>
    </div>
  );
}
