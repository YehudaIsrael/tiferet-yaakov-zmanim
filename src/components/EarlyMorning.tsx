import { use24HrTime } from '../hooks';
import BeforeClock from './BeforeClock';
import AfterClock from './AfterClock';
import Omer from './Omer';
import Time from './Time';
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
        <label>עלות השחר</label>
        <div className="time">{convertFromUtcTime(times?.alotHaShachar)}</div>
      </div>

      <div className="bottom-center">
        <label>משיכיר</label>
        <div className="time">{convertFromUtcTime(times?.misheyakir)}</div>
      </div>

      <div className="bottom-right">
        <label>הנץ החמה</label>
        <div className="time">{convertFromUtcTime(times?.sunrise)}</div>
      </div>
    </div>
  );
}
