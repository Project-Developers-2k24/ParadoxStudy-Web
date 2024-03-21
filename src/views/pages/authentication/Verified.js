import React, { useState, useEffect } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { VERIFIED } from 'api/auth';

function Verified() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(null); // Initially set to null to indicate loading state
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    // Fetch data here using the provided id
    fetchData(id);
  }, [id]); // useEffect will re-run whenever the id prop changes

  const fetchData = async () => {
    try {
      // Simulate API request delay
      const response = await axios.get(VERIFIED(id)); // Assuming VERIFIED is a valid endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(response.data);
      // Check status code
      if (response.status === 201) {
        // Success: handle the response data
        setIsVerified(true); // Assuming data contains a property named isVerified
      } else {
        // Handle other status codes
        setIsVerified(false); // Assuming data contains a property named isVerified
        console.error('Request failed with status code:', response.status);
      }
    } catch (error) {
      setIsVerified(false); // Assuming data contains a property named isVerified
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={15}
        sm={4}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          justifyContent: 'center',
          marginTop: '10%',
          padding: '70px'
        }}
      >
        <Card>
          <CardContent style={{ textAlign: 'center' }}>
            <Typography variant="h2" component="h2" style={{ marginBottom: '16px' }}>
              Paradox Study - Ready, Let s Go!
            </Typography>
            {isVerified === true ? (
              <VerifiedIcon style={{ fontSize: 100, color: 'green' }} />
            ) : isVerified === false ? (
              <ClearIcon style={{ fontSize: 100, color: 'red' }} />
            ) : (
              <Box display="flex" justifyContent="center">
                <CircularProgress size={100} /> {/* Show loader when data is still loading */}
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  disabled={!isVerified}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/pages/login/login3')}
                >
                  Click Here To Login
                </Button>
              </AnimateButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Verified;
