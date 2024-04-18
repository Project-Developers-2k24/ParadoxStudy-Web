import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../../assets/css/ForgotPassword.css';
import forgot from '../../../../assets/images/auth/forgot1.png';
import axios from 'axios';
import { RESET_EMAIL } from 'api/auth';
import { toast } from 'react-toastify';
import { Button, Grid } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const resetPasswordEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitted(true);
    try {
      const res = await axios.post(RESET_EMAIL, {
        email: email
      });
      setIsSubmitted(false);
      console.log(res);

      // Show success toast with res.data.message
      toast.success(res.data.message);

      // Redirect to a new route after successful submission
      navigate('/pages/register/register3');
    } catch (error) {
      toast.error(error.response.data.message);
      setIsSubmitted(false);
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="designtop">
        <div className="design1"></div>
        <div className="design2"></div>
      </div>
      <div className="container">
        <div className="box">
          <h1>Forgot Password ?</h1>
          <h3>Enter your registered email to reset your password.</h3>

          <div className="wrapper">
            {/* Use form element to handle submission */}
            <form onSubmit={resetPasswordEmail}>
              <div
                className="input-data"
                style={{
                  marginBottom: '20px'
                }}
              >
                <input
                  type="email"
                  name="email"
                  id="user_email"
                  placeholder="Enter your Registered Email ID"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="underline"></div>
              </div>
              {/* <button type="submit" className="reset">
                Reset Password
              </button>{' '} */}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitted}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Reset Password
                  </Button>
                </AnimateButton>
              </Grid>
              {/* Change button type to submit */}
            </form>
            <div className="footer">
              <h5>
                New here? <Link to="/pages/register/register3"> Sign Up</Link>
              </h5>
              <h5>
                Already have an account? <Link to="/pages/login/login3">Sign In</Link>
              </h5>
            </div>
          </div>
        </div>
        <div>
          <img className="forgotimg" src={forgot} alt="forgotpassword" />
        </div>
      </div>
      <div className="designbottom">
        <div className="design3"></div>
        <div className="design4"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
