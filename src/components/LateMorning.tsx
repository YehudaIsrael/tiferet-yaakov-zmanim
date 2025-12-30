import AfterClock from './AfterClock';
import BeforeClock from './BeforeClock';
import Omer from './Omer';
import Time from './Time';
import { use24HrTime, useCalculateTimes } from '../hooks';
import type { ApiTimes } from '../types';

export default function LateMorning({ omer, ...props }: ApiTimes) {
  const { times } = props;
  const { convertFromUtcTime } = use24HrTime();
  const { getMinchaGedolah } = useCalculateTimes();

  return (
    <div className="grid">
      <BeforeClock {...props} />

      {omer && <Omer omer={omer} />}

      <AfterClock {...props} />

      <Time />

      <div className="bottom-left">
        <label>סו"ז ק"ש גר"א</label>
        <div className="time">{convertFromUtcTime(times?.sofZmanShma)}</div>
      </div>

      <div className="bottom-center">
        <label>חצות</label>
        <div className="time">{convertFromUtcTime(times?.chatzot)}</div>
      </div>

      <div className="bottom-right">
        <label>מנחה גדולה</label>
        <div className="time">{getMinchaGedolah(times)}</div>
      </div>
    </div>
  );
}
