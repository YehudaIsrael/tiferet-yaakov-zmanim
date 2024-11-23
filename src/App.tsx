import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Calendar from './Calendar';
import Upload from './Upload';
import Yahrzeit from './Yahrzeit';
import { Paths } from './enums';

export default function App() {
  const router = createBrowserRouter([
    {
      path: Paths.Home,
      element: <Calendar />,
    },
    {
      path: Paths.Upload,
      element: <Upload />,
    },
    {
      path: Paths.Yahrzeit,
      element: <Yahrzeit />,
    },
  ]);

  return <RouterProvider router={router} />;
}
