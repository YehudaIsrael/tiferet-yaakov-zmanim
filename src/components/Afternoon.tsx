import AfterClock from './AfterClock';
import BeforeClock from './BeforeClock';
import Omer from './Omer';
import Time from './Time';
import { use24HrTime, useCalculateTimes } from '../hooks';
import type { ApiTimes } from '../types';

export default function Afternoon({ omer, ...props }: ApiTimes) {
  const { times, timesElev } = props;
  const { convertFromUtcTime } = use24HrTime();
  const { getMinchaGedolah } = useCalculateTimes();

  return (
    <div className="grid">
      <BeforeClock {...props} />

      {omer && <Omer omer={omer} />}

      <AfterClock {...props} />

      <Time />

      <div className="bottom-left">
        <label>חצות</label>
        <div className="time">{convertFromUtcTime(times?.chatzot)}</div>
      </div>

      <div className="bottom-center">
        <label>מנחה גדולה</label>
        <div className="time">{getMinchaGedolah(times)}</div>
      </div>

      <div className="bottom-right">
        <label>שקיעה</label>
        <div className="time">{convertFromUtcTime(timesElev?.sunset)}</div>
      </div>
    </div>
  );
}
