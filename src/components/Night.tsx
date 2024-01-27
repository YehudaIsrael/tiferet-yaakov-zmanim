import { Today } from '../types';
import AfterClock from './AfterClock';
import BeforeClock from './BeforeClock';
import Time from './Time';

export default function Night({ today }: Today) {
  return (
    <div className="grid">
      <BeforeClock today={today} />

      <AfterClock today={today} />

      <Time />

      <div className='bottom-left'>
        <label>חצות</label>
        <div className="time">{today['חצות יום ולילה']?.slice(0, -1)}</div>
      </div>

      <div className='bottom-right'>
        <label>הנץ החמה</label>
        <div className="time">{today['נץ החמה קטגוריה']}</div>
      </div>
    </div>
  );
}
