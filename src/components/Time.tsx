import { useTime } from '../hooks/useTime';

export default function Time() {
  const { time } = useTime();
  return <div className="time-now item center">{time}</div>;
}
