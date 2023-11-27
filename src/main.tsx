import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dayjs/locale/fr';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as utc from 'dayjs/plugin/utc';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as weekday from 'dayjs/plugin/weekday';
import App from './components/App.tsx';

dayjs.extend(weekday);
dayjs.extend(utc);
dayjs.locale('fr');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
