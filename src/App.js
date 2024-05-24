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
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
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
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
