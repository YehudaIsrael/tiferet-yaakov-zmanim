import AfterClock from './AfterClock';
import BeforeClock from './BeforeClock';
import Time from './Time';

export default function Morning({ today }: any) {
  return (
    <div className="grid">
      <div></div>

      <div></div>

      <div></div>

      <BeforeClock today={today} />

      <Time />

      <AfterClock today={today} />

      <div>
        <label>הנץ החמה</label>
        <div className="time">{today['נץ החמה קטגוריה']}</div>
      </div>

      <div>
        <label>סו"ז ק"ש גר"א</label>
        <div className="time">{today['סו"ז ק"ש גר"א קטגוריה']?.slice(0, -1)}</div>
      </div>

      <div>
        <label>סו"ז תפילה גר"א</label>
        <div className="time">{today['סו"ז תפילה גר"א קטגוריה']?.slice(0, -1)}</div>
      </div>
    </div>
  );
}
