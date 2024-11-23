import AfterClock from './AfterClock';
import BeforeClock from './BeforeClock';
import Time from './Time';
import { use24HrTime, useCalculateTimes } from '../hooks';
import type { ApiTimes } from '../types';

export default function Afternoon({ times, timesElev }: ApiTimes) {
  const { convertFromUtcTime } = use24HrTime();
  const { getMinchaGedolah } = useCalculateTimes();

  return (
    <div className="grid">
      <BeforeClock times={times} timesElev={timesElev} />

      <AfterClock times={times} timesElev={timesElev} />

      <Time />

      <div className="bottom-left">
        <label>חצות</label>
        <div className="time">{convertFromUtcTime(times?.chatzot)}</div>
      </div>

      <div className="bottom-center">
        <label>מנחה גדולה</label>
        <div className="time">{getMinchaGedolah(times)}</div>
      </div>

      <div className="bottom-right">
        <label>שקיעה</label>
        <div className="time">{convertFromUtcTime(timesElev?.sunset)}</div>
      </div>
    </div>
  );
}
