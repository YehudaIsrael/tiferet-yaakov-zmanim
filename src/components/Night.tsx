import { use24HrTime } from '../hooks/use24HrTime';
import Time from './Time';
import type { ApiTimes } from '../types';

export default function Night({ times, timesElev }: ApiTimes) {
  const { convertFromUtcTime } = use24HrTime();

  return (
    <div className="grid">
      <div className="placeholder"></div>

      <Time />

      <div className="bottom-left">
        <label>חצות</label>
        <div className="time">{convertFromUtcTime(times?.chatzotNight)}</div>
      </div>

      <div className="bottom-right">
        <label>הנץ החמה</label>
        <div className="time">{convertFromUtcTime(times?.sunrise)}</div>
      </div>
    </div>
  );
}
