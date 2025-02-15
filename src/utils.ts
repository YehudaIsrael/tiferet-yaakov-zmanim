import dayjs from 'dayjs';
import type { Times, Today } from './types';

export const testDate = () => dayjs(new Date());

export const getNextDay = (todayRow: Today) => {
  const data = localStorage.getItem('calendar') || '';
  if (!data) return;
  const calendarData: Today[] = JSON.parse(data);
  if (!Object.keys(todayRow).length || !calendarData.length) return;
  const nightfall = dayjs(todayRow['שקיעה קטגוריה'], 'HH:mm:ss')
    .add(12, 'hours')
    .add(20, 'minutes');

  const now = testDate();
  const tomorrow = now.add(1, 'day').startOf('day');
  const tomorrowFormatted = tomorrow.format('D.M.YYYY');
  const nextRow = calendarData.find(day => day['תאריך לועזי'] === tomorrowFormatted);

  if (!nextRow) return;

  if (todayRow['צאת הכוכבים ר"ת 72 שוות קטגוריה']) {
    const afterShabbat = dayjs(todayRow['צאת הכוכבים ר"ת 72 שוות קטגוריה'], 'HH:mm')
      .add(12, 'hours')
      .add(10, 'minutes');
    if (now < afterShabbat) {
      if (todayRow['ספירת העומר'] && now > nightfall) {
        todayRow['ספירת העומר'] = nextRow?.['ספירת העומר'] || '';
        return todayRow;
      }
      return;
    }
  }

  if (todayRow['צאת החג לר"ת מקטגוריה']) {
    const afterYomTov = dayjs(todayRow['צאת החג לר"ת מקטגוריה'], 'HH:mm')
      .add(12, 'hours')
      .add(10, 'minutes');
    if (now < afterYomTov) {
      if (todayRow['ספירת העומר'] && now > nightfall) {
        todayRow['ספירת העומר'] = nextRow?.['ספירת העומר'] || '';
        return todayRow;
      }
      return;
    }
  }

  if (now > nightfall && now < tomorrow) {
    if (nextRow['תאריך לועזי'] === todayRow['תאריך לועזי']) return;
    delete nextRow['צאת שבת רגיל מקטגוריה'];
    delete nextRow['צאת החג רגיל מקטגוריה'];
    delete nextRow['צאת הכוכבים ר"ת 72 שוות קטגוריה'];
    delete nextRow['צאת החג לר"ת מקטגוריה'];
    return nextRow;
  }
  return;
};

export const initialTimes: Times = {
  chatzotNight: '',
  alotHaShachar: '',
  misheyakir: '',
  misheyakirMachmir: '',
  dawn: '',
  sunrise: '',
  sofZmanShmaMGA19Point8: '',
  sofZmanShmaMGA16Point1: '',
  sofZmanShmaMGA: '',
  sofZmanShma: '',
  sofZmanTfillaMGA19Point8: '',
  sofZmanTfillaMGA16Point1: '',
  sofZmanTfillaMGA: '',
  sofZmanTfilla: '',
  chatzot: '',
  minchaGedola: '',
  minchaGedolaMGA: '',
  minchaKetana: '',
  minchaKetanaMGA: '',
  plagHaMincha: '',
  sunset: '',
  beinHaShmashos: '',
  dusk: '',
  tzeit7083deg: '',
  tzeit85deg: '',
  tzeit42min: '',
  tzeit50min: '',
  tzeit72min: '',
};

export const dayMap: { [num: number]: string } = {
  0: 'ראשון',
  1: 'שני',
  2: 'שלישי',
  3: 'רביעי',
  4: 'חמישי',
  5: 'ששי',
  6: 'שבת',
};
