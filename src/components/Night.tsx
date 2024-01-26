import { Today } from '../types';
import AfterClock from './AfterClock';
import BeforeClock from './BeforeClock';
import Time from './Time';

export default function Night({ today }: Today) {
  return (
    <div className="grid">
      <BeforeClock today={today} />

      <div></div>

      <AfterClock today={today} />

      <div></div>

      <Time />

      <div></div>

      <div></div>

      <div>
        <label>חצות</label>
        <div className="time">{today['חצות יום ולילה']?.slice(0, -1)}</div>
      </div>

      <div></div>

      <div>
        <label>הנץ החמה</label>
        <div className="time">{today['נץ החמה קטגוריה']}</div>
      </div>
    </div>
  );
}
