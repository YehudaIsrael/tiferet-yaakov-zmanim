import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Calendar from './Calendar';
import Upload from './Upload';

export default function App() {
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

  return <RouterProvider router={router} />;
}
