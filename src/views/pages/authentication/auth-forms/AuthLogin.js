import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
  // useMediaQuery
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; 
import { GoogleLogin } from 'react-google-login';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import Google from 'assets/images/icons/social-google.svg';
import { LOGIN } from 'api/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleConfig } from 'views/utilities/Config';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSuccess = async (response) => {
    setLoading(true);

    // Open the Google authentication URL in a new window
    const popup = window.open('https://projectdev2114.azurewebsites.net/api/user/google', 'GoogleLogin', 'width=600,height=600');
  
    // Listen for messages from the popup window
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://projectdev2114.azurewebsites.net') return; // Replace with your backend URL
      
      const responseData = event.data; // Get the data sent from the backend
  
      if (responseData.status) {
        // Successfully logged in
        console.log('User Data:', responseData.user); // Log the user data from the response
        localStorage.setItem('token', responseData.token); 
        // Store the token
        localStorage.setItem('userId', responseData.user._id);
        localStorage.setItem('user', JSON.stringify(responseData.user)); // Store user data
  
        toast.success('Login Successful!');
        window.location.href = '/'; // Redirect to the home page
      } else {
        toast.error('Login failed. Please try again.');
      }
    });
  };

  const onFailure = (error) => {
    //console.error('Login Failed:', error);
    console.error('Google login failed:', error);
    toast.error('Google login failed. Please try again.');

    // toast.error("Login failed. Please try again.");
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
          <Button
      variant="outlined"
      fullWidth
      sx={{
        color: 'grey.700',
        backgroundColor: 'grey.50',
        borderColor: 'grey.100',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 1.5,
        borderRadius: 2,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'grey.100',
          borderColor: 'grey.200',
        },
      }}
      onClick={()=>onSuccess()}
      disabled={true}
      // disabled={loading}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
        <GoogleIcon sx={{ fontSize: 20, mr: 1 }} /> {/* Google Icon */}
      </Box>
      <Typography variant="body1" fontWeight="500">
        {loading ? 'Logging in...' : 'Login with Google'}
      </Typography>
    </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
              OR
            </Button>

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // Make a POST request using Axios
            const response = await axios.post(LOGIN, {
              email: values.email,
              password: values.password
              // Include any other registration data you want to send
            });
            // console.log(response.data);

            // Handle the response accordingly
            if (response.status === 200) {
              // Registration successful
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('userId', response.data.user._id);
              console.log(response.data._id);
              toast.success(response.data.message);
              setStatus({ success: true });
              navigate('/')
              setSubmitting(false);
            } else {
              // Registration failed
              setStatus({ success: false });
              setSubmitting(false);
              setErrors({ submit: 'Registration failed. Please try again.' });
            }
          } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error:', error);
            // Handle error response
            setStatus({ success: false });
            setSubmitting(false);
            setErrors({ submit: 'Registration failed. Please try again.' });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography
                component={Link}
                to="/pages/register/ForgotPassword"
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
