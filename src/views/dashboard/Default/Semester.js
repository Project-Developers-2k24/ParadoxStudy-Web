import React, { useState } from 'react';
import { Grid, Typography, Box, styled } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { yearSemData } from 'api/constant';

// Styled component for semester selection box
const SelectionBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: 'white',
  padding: theme.spacing(7), // Increased padding
  borderRadius: theme.spacing(4), // Increased border radius
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', // Added background-color transition
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: theme.palette.secondary.light, // Change background color on hover
  },
}));

const Semester = () => {
  const { year } = useParams(); // Get the selected year from the URL parameter
  const [selectedSemester, setSelectedSemester] = useState(null);

  // Function to handle semester selection
  const handleSemesterSelect = (semesterNumber) => {
    setSelectedSemester(semesterNumber);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Semester Selection */}
      <Grid item xs={12} md={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Select Semester
        </Typography>
        <Grid container spacing={2}>
          {yearSemData
            .find((data) => data.year === parseInt(year))
            .semesters.map((semester) => (
              <Grid item xs={6} key={semester.number}>
                <Link
                  to={`/year/${year}/semester/${semester.number}`}
                  style={{ textDecoration: 'none' }}
                >
                  <SelectionBox onClick={() => handleSemesterSelect(semester.number)}>
                    <Typography variant="h6">Semester {semester.number}</Typography>
                  </SelectionBox>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Semester;
