import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, styled } from '@mui/material';
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
//assets
import { image, logo } from '../../../../assets/images/index';

// Styled component for curved boundary
const CurvedGrid = styled(Grid)(({ theme }) => ({
  borderRadius: theme.spacing(0),
  overflow: 'hidden'
}));
// // ===============================|| AUTH3 -Login ||=============================== //
const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid
        container
        justifyContent="center"
        alignItems="stretch"
        sx={{ bgcolor: 'background.paper', padding: 0, maxWidth: '100%', height: '100vh' }}
      >
        {/* first grid */}
        {!matchDownSM && (
          <Grid item xs={12} sm={8} md={6} lg={5} sx={{ margin: 0 }}>
            <Grid item xs={12} component={CurvedGrid} sx={{ bgcolor: 'background.default', boxShadow: 3, height: '100%', padding: 0 }}>
              <Typography
                color="InfoText"
                fontFamily="sans-serif"
                fontSize="1.3rem"
                gutterBottom
                variant={matchDownSM ? 'h3' : 'h2'}
                style={{ textAlign: 'center' }}
                sx={{ mt: 3 }}
              >
                Welcome to Paradox Study, your premier online platform for accessing study materials and notes.
              </Typography>
              <Grid item xs={12} sx={{ bgcolor: 'background.default', mb: 6, justifyContent: 'center' }}>
                {/* Conditionally render the image based on screen size */}
                {!matchDownSM && <img src={image} alt="loginimage" width="500" />}
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} sm={8} md={6} lg={5} sx={{ margin: 0 }}>
          {/* Second Grid */}
          <Grid item xs={12} component={CurvedGrid} sx={{ bgcolor: 'background.paper', boxShadow: 3, height: '100%', padding: 0 }}>
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%', padding: 2 }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={1} alignItems="center" justifyContent="center">
                    {/* logo grid */}
                    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
                      <Grid item xs={12}>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={logo} alt="logoimage" width="200" />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center">
                            <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                              Hi, Welcome Back
                            </Typography>
                            <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                              Enter your credentials to continue
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthLogin />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography component={Link} to="/pages/register/register3" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                          Don&apos;t have an account?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
