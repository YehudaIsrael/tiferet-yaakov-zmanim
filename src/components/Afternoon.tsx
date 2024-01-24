import AfterClock from './AfterClock';
import BeforeClock from './BeforeClock';
import Time from './Time';

export default function Afternoon({ today }: any) {
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

      <div>
        <label>מנחה גדולה</label>
        <div className="time">{today['מנחה גדולה המאוחר']?.slice(0, -1)}</div>
      </div>

      <div>
        <label>שקיעה</label>
        <div className="time">{today['שקיעה קטגוריה']}</div>
      </div>
    </div>
  );
}
