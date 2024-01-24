import { useTime } from '../hooks';

export default function Time() {
  const { time } = useTime();
  return <div className="time-now">{time}</div>;
}
