import { createContext } from 'react';

export const Context = createContext({
  calendarData: [],
  setCalendarData: (data: any) => {},
});
