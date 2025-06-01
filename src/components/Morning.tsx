import BeforeClock from './BeforeClock';
import AfterClock from './AfterClock';
import Omer from './Omer';
import Time from './Time';
import { use24HrTime } from '../hooks';
import type { ApiTimes } from '../types';

export default function Morning({ omer, ...props }: ApiTimes) {
  const { times } = props;
  const { convertFromUtcTime } = use24HrTime();

  return (
    <div className="grid">
      <BeforeClock {...props} />

      {omer && <Omer omer={omer} />}

      <AfterClock {...props} />

      <Time />

      <div className="bottom-left">
        <label>סו"ז ק"ש מג"א</label>
        <div className="time">{convertFromUtcTime(times?.sofZmanShmaMGA19Point8)}</div>
      </div>

      <div className="bottom-center">
        <label>סו"ז ק"ש גר"א</label>
        <div className="time">{convertFromUtcTime(times?.sofZmanShma)}</div>
      </div>

      <div className="bottom-right">
        <label>סו"ז תפילה גר"א</label>
        <div className="time">{convertFromUtcTime(times?.sofZmanTfilla)}</div>
      </div>
    </div>
  );
}
