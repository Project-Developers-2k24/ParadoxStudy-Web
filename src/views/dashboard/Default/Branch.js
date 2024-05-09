import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Typography, Box, styled } from '@mui/material';
import { yearSemData } from 'api/constant';

// Styled component for branch selection box
const SelectionBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: 'white',
  padding: theme.spacing(8), // Increased padding for bigger size
  borderRadius: theme.spacing(5), // Increased border radius for a rounded shape
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: theme.palette.secondary.light,
  },
  maxWidth: '200px', // Increased maxWidth for a wider card
}));

const Branch = () => {
  const { year, semester } = useParams();
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Function to handle branch selection
  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
  };

  // Get the data for the selected year and semester
  const selectedYearData = yearSemData.find(data => data.year.toString() === year);
  const selectedSemesterData = selectedYearData.semesters.find(sem => sem.number.toString() === semester);

  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Branch Selection */}
      <Grid item xs={12} md={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Select Branch
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {selectedSemesterData.branches.map((branch, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Link to={`/year/${year}/semester/${semester}/branch/${branch.name}`} style={{ textDecoration: 'none' }}>
                <SelectionBox onClick={() => handleBranchSelect(branch.name)}>
                  <Typography variant="h6">{branch.name}</Typography>
                </SelectionBox>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Branch;
