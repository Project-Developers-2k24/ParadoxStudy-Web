import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router';


// Styled MainCard wrapper
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: 'white',
  overflow: 'hidden',
  position: 'relative',
  transition: 'transform 0.3s ease-in-out', // Add transition for smooth effect
  '&:hover': {
    transform: 'scale(0.95)' // Apply the zoom-out effect on hover
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[600],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));


const BranchCard = ({ branch, onClick }) => {
  return (
    <Box mb={1} onClick={() => onClick(branch)}>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Typography color="white" variant="h6" align="center" gutterBottom>
            {branch}
          </Typography>
        </Box>
      </CardWrapper>
    </Box>
  );
};
const SubjectCard = ({ subjects }) => {
  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
    // Navigate to the notes-download component passing both branch and subject
    navigate(`/notes-download/${subject}`);
  };

  return (
    <Box mb={0.5}> {/* Adjust the mb value to reduce the gap */}
      {subjects.map((subject, index) => (
        <Box key={index} onClick={() => handleSubjectClick(subject)}>
          <Typography color="white" variant="h6" align="center" gutterBottom>
            Subject {index + 1}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CardWrapper border={false} content={false}>
                <Box sx={{ p: 2.25 }}>
                  <Typography color="white" variant="subtitle1" align="center" gutterBottom>
                    {subject}
                  </Typography>
                </Box>
              </CardWrapper>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};





const EarningCard = ({ yearSemData, isLoading }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const scrollRef = useRef(null);
  const handleSemesterClick = (year, semester) => {
    setSelectedYear(year);
    setSelectedSemester(semester);
    setSelectedBranch(null);
  };

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  };

  return (
    <>
      {!isLoading && (
        <Grid container spacing={2}>
          {yearSemData.map((yearData) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={yearData.year}>
              <CardWrapper border={false} content={false} onClick={() => setSelectedYear(yearData.year)}>
                <Box sx={{ p: 2.25 }}>
                  <Typography color="white" variant="h4" align="center" gutterBottom>
                    {yearData.year} Year
                  </Typography>
                </Box>
              </CardWrapper>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedYear && (
        <Grid container spacing={2} ref={scrollRef} >
          <Grid item xs={12} sx={{ mt: 1, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Select Your Semester
            </Typography>
          </Grid>
          {yearSemData
            .filter((yearData) => yearData.year === selectedYear)
            .map((yearData) => (
              <Grid item xs={12} key={yearData.year}>

                {yearData.semesters.map((semester) => (

                  <Box key={semester.number} mb={1} onClick={() => handleSemesterClick(yearData.year, semester)}>

                    <CardWrapper border={false} content={false}>
                      <Box sx={{ p: 2.25 }}>
                        <Typography color="white" variant="h6" align="center" gutterBottom>
                          Semester: {semester.number}
                        </Typography>
                      </Box>
                    </CardWrapper>
                  </Box>
                ))}
              </Grid>
            ))}
        </Grid>
      )}

      {selectedSemester && (
        <Grid container spacing={2} ref={scrollRef}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Select Your Branch
            </Typography>
          </Grid>
          {selectedSemester.branches.map((branch, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <BranchCard branch={branch.name} onClick={handleBranchClick} />
            </Grid>
          ))}
        </Grid>
      )}

      {selectedBranch && selectedSemester && (
        <Grid container spacing={1} ref={scrollRef}>
          <Grid item xs={12} sx={{ mt: 1, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Select Your Subject
            </Typography>
          </Grid>
          {yearSemData
            .filter((yearData) => yearData.year === selectedYear)
            .map((yearData) =>
              yearData.semesters
                .filter((semester) => semester.number === selectedSemester.number)
                .map((semester) =>
                  semester.branches
                    .filter((branch) => branch.name === selectedBranch)
                    .map((branch) => (
                      <Grid item xs={8} md={12} key={branch.name}>
                        <SubjectCard subjects={branch.subjects} />
                      </Grid>
                    ))
                )
            )}
        </Grid>
      )}
    </>
  );
};

EarningCard.propTypes = {
  yearSemData: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      semesters: PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.number.isRequired,
          branches: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              subjects: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string.isRequired)).isRequired,
            }).isRequired
          ).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ),
  isLoading: PropTypes.bool.isRequired,
};

export default EarningCard;