import React, { useState } from 'react';
import { Grid, Typography, Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { yearSemData } from 'api/constant';

// Styled component for year selection card
const YearCard = styled(Box)(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.secondary.light : theme.palette.secondary.dark,
  color: 'white',
  padding: theme.spacing(6), // Increased padding
  borderRadius: theme.spacing(3), // Increased border radius
  textAlign: 'center',
  transition: 'background-color 0.3s ease-in-out', // Added background-color transition
  '&:hover': { // Change background color on hover
    backgroundColor: theme.palette.secondary.light,
  },
}));

const Year = () => {
  const [selectedYear, setSelectedYear] = useState(null);

  // Function to handle year selection
  const handleYearSelect = (year) => {
    setSelectedYear(year === selectedYear ? null : year); // Toggle active state
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={{ height: '100vh' }}>
      {/* Year Selection */}
      <Grid item xs={12} md={10} lg={8} xl={6}> {/* Adjusted grid layout for larger cards */}
        <Typography variant="h4" align="center" gutterBottom>
          Select Year
        </Typography>
        <Grid container spacing={2}>
          {yearSemData.map((yearData) => (
            <Grid item xs={6} key={yearData.year}>
              <Link to={`/year/${yearData.year}`} style={{ textDecoration: 'none' }}>
                <YearCard
                  active={yearData.year === selectedYear}
                  onClick={() => handleYearSelect(yearData.year)}
                >
                  <Typography variant="h6">{yearData.year} Year</Typography>
                </YearCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Year;
