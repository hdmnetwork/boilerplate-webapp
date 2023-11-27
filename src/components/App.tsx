import { ApolloProvider } from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material';
import { useMemo, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '../config/router';
import { createWebtuneTheme } from '../config/theming.ts';
import { getApolloClient } from '../graphql/apollo/apollo';
import useLocalStorage from '../hooks/useLocalStorage';
import Homepage from './pages/offline/Homepage.tsx';
import AutoLoginProvider from './providers/AutoLoginProvider';
import { UiThemeContext } from './UiThemeContext';

const App = () => {
  const { get } = useLocalStorage();
  const [ localTheme, setLocalTheme ] = useState(createWebtuneTheme());

  const context = useMemo(() => ({
    theme: localTheme,
    setTheme: (mode: 'light' | 'dark') => setLocalTheme(createTheme({
      palette: {
        mode,
      },
    })),
  }), [ localTheme ]);

  return (
    // @ts-ignore
    <ApolloProvider client={getApolloClient(get(import.meta.env.VITE_TOKEN_KEYNAME, ''))}>
      <UiThemeContext.Provider value={context}>
        <ThemeProvider theme={context.theme}>
          <AutoLoginProvider offlineComponent={<Homepage />}>
            <RouterProvider router={router} />
          </AutoLoginProvider>
        </ThemeProvider>
      </UiThemeContext.Provider>
    </ApolloProvider>
  );
};

export default App;
