import { CalendarCategory } from "./enums";

export type Today = {
  [key: string]: any;
};

export type Times = {
  chatzotNight: string;
  alotHaShachar: string;
  misheyakir: string;
  misheyakirMachmir: string;
  dawn: string;
  sunrise: string;
  sofZmanShmaMGA19Point8: string;
  sofZmanShmaMGA16Point1: string;
  sofZmanShmaMGA: string;
  sofZmanShma: string;
  sofZmanTfillaMGA19Point8: string;
  sofZmanTfillaMGA16Point1: string;
  sofZmanTfillaMGA: string;
  sofZmanTfilla: string;
  chatzot: string;
  minchaGedola: string;
  minchaGedolaMGA: string;
  minchaKetana: string;
  minchaKetanaMGA: string;
  plagHaMincha: string;
  sunset: string;
  beinHaShmashos: string;
  dusk: string;
  tzeit7083deg: string;
  tzeit85deg: string;
  tzeit42min: string;
  tzeit50min: string;
  tzeit72min: string;
};

export type ApiTimes = {
  times: Times;
  timesElev: Times;
};

export type TimeEntry = {
  [key: string]: string;
};

export type GroupedData = {
  [date: string]: TimeEntry;
};

export type CalendarDate = {
  category: CalendarCategory;
  date: string;
  hdate: string;
  hebrew: string;
  title: string;
  heDateParts?: {
    d: string;
    m: string;
    y: string;
  };
};
