import { Today } from '../types';
import AfterClock from './AfterClock';
import BeforeClock from './BeforeClock';
import Time from './Time';

export default function Afternoon({ today }: Today) {
  return (
    <div className="grid">
      <BeforeClock today={today} />

      <AfterClock today={today} />

      <Time />

      <div className="bottom-left">
        <label>חצות</label>
        <div className="time">{today['חצות יום ולילה']?.slice(0, -1)}</div>
      </div>

      <div className="bottom-center">
        <label>מנחה גדולה</label>
        <div className="time">{today['מנחה גדולה המאוחר']?.slice(0, -1)}</div>
      </div>

      <div className="bottom-right">
        <label>שקיעה</label>
        <div className="time">{today['שקיעה קטגוריה']}</div>
      </div>
    </div>
  );
}
