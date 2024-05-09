import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Typography, Box, styled } from '@mui/material';
import { yearSemData } from 'api/constant';

// Styled component for subject selection box
const SelectionBox = styled(Box)(({ theme }) => ({
 backgroundColor: theme.palette.secondary.dark,
  color: 'white',
  padding: theme.spacing(7), // Increased padding
  borderRadius: theme.spacing(4), // Increased border radius
  textAlign: 'center',
  display: 'flex', // Use flexbox
  justifyContent: 'center', // Center content horizontally
  alignItems: 'center', // Center content vertically
  transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', // Added background-color transition
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: theme.palette.secondary.light,
  }
   // Increased maxWidth for a wider card
}));

const Subject = () => {
  const { year, semester, branch } = useParams();
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Function to handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
  };

  // Get the data for the selected year, semester, and branch
  const selectedYearData = yearSemData.find(data => data.year.toString() === year);
  const selectedSemesterData = selectedYearData?.semesters.find(sem => sem.number.toString() === semester);
  const selectedBranchData = selectedSemesterData?.branches.find(b => b.name === branch);

  if (!selectedYearData || !selectedSemesterData || !selectedBranchData) {
    return (
      <div>
        <Typography variant="h5">Data not found for the selected parameters.</Typography>
      </div>
    );
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Subject Selection */}
      <Grid item xs={12} md={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Select Subject
        </Typography>
        <Grid container spacing={2} justifyContent="center"> {/* Adjusted spacing */}
          {selectedBranchData.subjects.map((subject, index) => (
            <Grid item xs={6} sm={3} key={index}> {/* Adjusted grid layout */}
              <Link to={`/year/${year}/semester/${semester}/branch/${branch}/subject/${subject}`} style={{ textDecoration: 'none' }}>
                <SelectionBox onClick={() => handleSubjectSelect(subject)}>
                  <Typography variant="h6" align="center" gutterBottom>{subject}</Typography>
                </SelectionBox>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Subject;
