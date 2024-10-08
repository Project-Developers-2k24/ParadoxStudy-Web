import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
// routing
import Routes from './routes';

// defaultTheme
import themes from 'themes';
// project imports
import NavigationScroll from './layout/NavigationScroll';
import { ToastContainer } from 'react-toastify';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { GoogleConfig } from 'views/utilities/Config';
import { QueryClient, QueryClientProvider } from 'react-query';
import mermaid from 'mermaid';
// ==============================|| APP ||============================== //
const queryClient = new QueryClient();
const App = () => {
  const customization = useSelector((state) => state.customization);
  // useEffect(() => {
  //   import("https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs").then(
  //     (mermaid) => {
  //       mermaid.initialize({ startOnLoad: true });
  //     }
  //   );
  // }, []);
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded(); // Initializes Mermaid after the content is loaded
  }, []);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: GoogleConfig.clientId,
        scope: ''
      });
    }
    gapi.load('client:auth2', start);
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <ToastContainer />
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
