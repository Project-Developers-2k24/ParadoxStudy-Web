import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports

import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import GoogleIcon from '@mui/icons-material/Google'; 
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { REGISTER } from 'api/auth';
import { toast } from 'react-toastify';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  
    const googleHandler = async (response) => {
      setLoading(true);
  
      // Open the Google authentication URL in a new window
      const popup = window.open('http://localhost:8000/api/user/google', 'GoogleLogin', 'width=600,height=600');
    
      // Listen for messages from the popup window
      window.addEventListener('message', (event) => {
        if (event.origin !== 'http://localhost:8000') return; // Replace with your backend URL
    
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

  const handleFormSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      // // Step 4: Send a POST request to your register endpoint
      // const response = await axios.post(REGISTER, {
      //   username: values.fname + ' ' + values.lname,
      //   email: values.email,
      //   password: values.password
      // });
      // // Handle response if needed
      // toast.success(response.data.message);
      // navigate('/pages/login/login3');
      // setStatus();
      // setSubmitting(false);
    } catch (err) {
      console.error(err);
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

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
      onClick={()=>googleHandler()}
      disabled={loading}
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
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
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
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Your JSX for Google sign up button and divider */}

      <Formik
        initialValues={{
          fname: '',
          lname: '',
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          fname: Yup.string().max(255).required('First name is required'), // Update validation schema for first name
          lname: Yup.string().max(255).required('Last name is required'), // Update validation schema for last name
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={handleFormSubmit} // Step 3: Call handleFormSubmit for form submission
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="fname"
                  type="text"
                  value={values.fname} // Added value attribute
                  onChange={handleChange} // Added onChange handler
                  onBlur={handleBlur}
                  error={touched.fname && Boolean(errors.fname)}
                  helperText={touched.fname && errors.fname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lname"
                  type="text"
                  value={values.lname} // Added value attribute
                  onChange={handleChange} // Added onChange handler
                  onBlur={handleBlur}
                  error={touched.lname && Boolean(errors.lname)}
                  helperText={touched.lname && errors.lname}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
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
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
                {/* <Typography
                  variant="subtitle1"
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: '20px',
                    padding: '10px',
                    border: '2px solid red',
                    borderRadius: '5px',
                    backgroundColor: '#ffe6e6'
                  }}
                >
                  Registration is currently disabled due to heavy maintenance. We will be back soon.
                </Typography> */}
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                {/* <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button> */}
                <Button disableElevation disabled={false} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
