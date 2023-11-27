import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../components/pages/online/Dashboard.tsx';

export default createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
]);
