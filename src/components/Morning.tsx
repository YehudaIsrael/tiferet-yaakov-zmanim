import Time from './Time';
import type { ApiTimes } from '../types';

export default function Morning({ times, timesElev }: ApiTimes) {
  return (
    <div className="grid">
      <Time />

      <div className="bottom-left">
        <label>סו"ז ק"ש מג"א</label>
        <div className="time">{times?.sofZmanShmaMGA19Point8}</div>
      </div>

      <div className="bottom-center">
        <label>סו"ז ק"ש גר"א</label>
        <div className="time">{times?.sofZmanShma}</div>
      </div>

      <div className="bottom-right">
        <label>סו"ז תפילה גר"א</label>
        <div className="time">{times?.sofZmanTfilla}</div>
      </div>
    </div>
  );
}
