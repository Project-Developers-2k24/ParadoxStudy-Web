import React from 'react';

import EarningCard from './EarningCard';
import { Grid, Stack, Typography, useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { yearSemData } from 'api/constant'; 

const YearSelectionPage = () => {
    const theme=useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
const isLoading = false; 
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
    
      <Stack alignItems="center" justifyContent="center" spacing={3} sx={{ mb: 2 }}>

      <Typography color="caption" fontFamily="sans-serif" gutterBottom variant={matchDownSM ? 'h5' : 'h4'}>
                             Select Your Year
                            </Typography>
                            </Stack>
        
      </Grid>
      <EarningCard yearSemData={yearSemData} isLoading={isLoading} />
    </Grid>
  );
};

export default YearSelectionPage;
