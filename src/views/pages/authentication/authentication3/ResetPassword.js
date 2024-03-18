import React, { useState } from 'react';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { styled } from '@mui/system';
import reset from '../../../../assets/images/auth/reset.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ResetContainer = styled(Container)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh'
}));

const ResetPaper = styled(Paper)(() => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const ResetPassword = () => {
  // State for form input values
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your password reset logic here
    // For example, you can send a request to your server to update the password

    // Set the submission status to true
    setIsSubmitted(true);
  };

  return (
    <ResetContainer>
      <ResetPaper elevation={3}>
        <img src={reset} alt="" />
        {isSubmitted ? (
          // Display a success message after submission
          <Typography variant="h6" gutterBottom>
            Password reset successful!
          </Typography>
        ) : (
          // Display the form for password reset
          <>
            <Typography variant="h5" gutterBottom>
              Reset Your Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      //   disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      Sign up
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          </>
        )}
        <Typography variant="body2" mt={2}>
          Remember your password? <Link to="/pages/login/login3">Login</Link>
        </Typography>
      </ResetPaper>
    </ResetContainer>
  );
};

export default ResetPassword;
