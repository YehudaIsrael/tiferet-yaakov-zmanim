import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Calendar from './Calendar';
import Upload from './Upload';
import { Context } from './context';

export default function App() {
  const [calendarData, setCalendarData] = useState([]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Calendar />,
    },
    {
      path: '/upload',
      element: <Upload />,
    },
  ]);

  return (
    <Context.Provider value={{ calendarData, setCalendarData }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}
