import { Today } from '../types';
import AfterClock from './AfterClock';
import BeforeClock from './BeforeClock';
import Time from './Time';

export default function Morning({ today }: Today) {
  return (
    <div className="grid">
      <BeforeClock today={today} />

      <Time />

      <AfterClock today={today} />

      <div className="bottom-left">
        <label>סו"ז ק"ש מג"א</label>
        <div className="time">{today['סו"ז ק"ש מג"א קטגוריה']?.slice(0, -1)}</div>
      </div>

      <div className="bottom-center">
        <label>סו"ז ק"ש גר"א</label>
        <div className="time">{today['סו"ז ק"ש גר"א קטגוריה']?.slice(0, -1)}</div>
      </div>

      <div className="bottom-right">
        <label>סו"ז תפילה גר"א</label>
        <div className="time">{today['סו"ז תפילה גר"א קטגוריה']?.slice(0, -1)}</div>
      </div>
    </div>
  );
}
