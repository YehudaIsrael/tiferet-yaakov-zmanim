import { use24HrTime } from '../hooks/use24HrTime';
import Time from './Time';

export default function NightAPI({ times }: any) {
  const { convertFromUtcTime } = use24HrTime();

  return (
    <div className="grid">
      <Time />

      <div className="bottom-left">
        <label>הנץ החמה</label>
        <div className="time">{convertFromUtcTime(times?.seaLevelSunrise)}</div>
      </div>

      <div className="bottom-right">
        <label>שקיעת החמה</label>
        <div className="time">{convertFromUtcTime(times?.sunset)}</div>
      </div>
    </div>
  );
}
