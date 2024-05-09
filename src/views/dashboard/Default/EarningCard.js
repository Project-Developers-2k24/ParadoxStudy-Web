
import React, { useRef, useState } from 'react';
import { Box, Grid } from '@mui/material';

import Subject from './Subjects';
import Branch from './Branch';
import Semester from './Semester';
import Year from './Year';
const EarningCard = ({ yearSemData, isLoading }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const scrollRef = useRef(null);

  const handleSemesterSelect = (year, semester) => {
    setSelectedYear(year);
    setSelectedSemester(semester);
    setSelectedBranch(null);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  };

  return (
    <>
      {!isLoading && (
        <Grid container spacing={2}>
          {yearSemData.map((yearData) => (
            <Year
              key={yearData.year}
              yearData={yearData}
              onYearSelect={(year) => setSelectedYear(year)}
            />
          ))}
        </Grid>
      )}

      {selectedYear && (
        <Semester
          yearData={yearSemData.find((data) => data.year === selectedYear)}
          onSemesterSelect={handleSemesterSelect}
        />
      )}

      {selectedSemester && (
        <Branch
          branches={selectedSemester.branches}
          onBranchSelect={handleBranchSelect}
        />
      )}

      {selectedBranch && selectedSemester && (
        <Box ref={scrollRef}>
          <Subject subjects={selectedBranch.subjects} />
        </Box>
      )}
    </>
  );
};

export default EarningCard;
