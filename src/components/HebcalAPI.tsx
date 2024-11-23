import { use24HrTime } from '../hooks/use24HrTime';

export default function HebcalAPI({ times, timesElev }: any) {
  const { convertFromUtcTime } = use24HrTime();

  const initialTimes = [
    { label: 'עלות השחר', time: times?.alotHaShachar },
    { label: 'משיכיר', time: times?.misheyakir },
    { label: 'הנץ החמה', time: times?.sunrise },

    { label: 'סו"ז ק"ש מג"א', time: times?.sofZmanShmaMGA19Point8 },
    { label: 'סו"ז ק"ש גר"א', time: times?.sofZmanShma },
    { label: 'סו"ז תפילה גר"א', time: times?.sofZmanTfilla },

    { label: 'חצות', time: times?.chatzot },
    { label: 'מנחה גדולה', time: times?.minchaGedola },

    { label: 'פלג המנחה', time: times?.plagHaMincha },

    { label: 'שקיעת החמה', time: timesElev?.sunset },
  ];

  return (
    <div className="times-container">
      <div className="times">
        {initialTimes.map(t => (
          <div key={t.label} className="time-item">
            <label>{t.label}</label>
            <div className="time">{convertFromUtcTime(t?.time)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
