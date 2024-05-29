import { Today } from '../types';
import AfterClock from './AfterClock';
import BeforeClock from './BeforeClock';
import Time from './Time';
import { use24HrTime } from '../hooks/use24HrTime';

export default function Afternoon({ today }: Today) {
  const { convert24HrTime, convertMiddayTime } = use24HrTime();

  return (
    <div className="grid">
      <BeforeClock today={today} />

      <AfterClock today={today} />

      <Time />

      <div className="bottom-left">
        <label>חצות</label>
        <div className="time">{convertMiddayTime(today['חצות יום ולילה']?.slice(0, -1))}</div>
      </div>

      <div className="bottom-center">
        <label>מנחה גדולה</label>
        <div className="time">{convertMiddayTime(today['מנחה גדולה המאוחר']?.slice(0, -1))}</div>
      </div>

      <div className="bottom-right">
        <label>שקיעה</label>
        <div className="time">{convert24HrTime(today['שקיעה קטגוריה'])}</div>
      </div>
    </div>
  );
}
