// import { useEffect, useState } from 'react';
// // material-ui
// import { Button, Grid, Box, Typography, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import AnimateButton from 'ui-component/extended/AnimateButton';
// // project imports
// // import EarningCard from './EarningCard';
// // import PopularCard from './PopularCard';
// // import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// // import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// // import TotalIncomeLightCard from './TotalIncomeLightCard';
// // import TotalGrowthBarChart from './TotalGrowthBarChart';
// import { bgimage } from '../../../assets/images/index';
// import Footer from '../Footer';
// import { gridSpacing } from 'store/constant';
// import Animationfront from 'components/Animationfront';
// import useTypematerial from 'components/TypeAnimation';
// import { useNavigate } from 'react-router';
// import './Style.css';
// import axios from 'axios';
// // ==============================|| DEFAULT DASHBOARD ||============================== //
// const Dashboard = () => {
//   const theme = useTheme();
//   const [isLoading, setLoading] = useState(true);
//   const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
//   const assignments = ['CollegeNotes', 'Assignments', 'Answers from PrepParadoxBot'];
//   const assignment = useTypematerial({ assignments });
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   // const getchat = async () => {
//   //   try {
//   //     const res = await axios.get('http://localhost:8000/api/user/wakeUp');
//   //     console.log(res.data);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   // useEffect(()=>{
//   //   getchat();
//   // })
//   const handleExploreNowClick = () => {
//     // Navigate to the YearSelectionPage
//     navigate('/year');
//   };
//   return (
//     <>
//       <Grid
//         container
//         spacing={gridSpacing}
//         sx={{
//           position: 'relative',
//           background: `url(${bgimage}) no-repeat center center fixed`,
//           backgroundSize: 'cover',
//           minHeight: '100vh',
//           // width:'85vw'
//           borderRadius: '50px'
//         }}
//       >
//         <Grid item lg={12} md={6} sm={6} xs={12}>
//           <Grid container flexDirection="row" alignItems="center" justifyContent="center">
//             <Grid item xs={12} md={6} lg={6} sx={{ px: 2 }}>
//               {/* frontimage */}
//               <Box sx={{ textAlign: 'center' }}>
//                 <Animationfront />
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={6} lg={6} sx={{ px: 2 }}>
//               {/* content  */}
//               <Box sx={{ textAlign: 'center', py: matchDownSM ? 2 : 0 }}>
//                 <Typography color="whiteSmoke" gutterBottom variant={matchDownSM ? 'h4' : 'h2'}>
//                   {assignment}
//                 </Typography>
//                 <Typography color="white" variant="body1" fontSize="15px" sx={{ mb: 3 }}>
//                   Unlock the power of learning: Paradox Study is your gateway to a vast collection of curated notes, resources, and insights
//                   across various subjects and disciplines. Whether you are a student, educator, or lifelong learner, our platform is
//                   designed to fuel your curiosity, ignite your passion for learning, and help you excel in your academic journey.
//                 </Typography>
//                 <Box sx={{ mt: 2 }}>
//                   <AnimateButton>
//                     <Button
//                       disableElevation
//                       halfWidth
//                       size="large"
//                       type="submit"
//                       variant="contained"
//                       color="secondary"
//                       onClick={handleExploreNowClick}
//                     >
//                       Explore Now
//                     </Button>
//                   </AnimateButton>
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* background imagesvg */}
//         <Grid item xs={12} md={6} lg={6} sx={{ px: 2 }} mt={6}>
//           <div className="custom-shape-divider-bottom-1712342805">
//             <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//               <path
//                 d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
//                 className="shape-fill"
//               ></path>
//             </svg>
//           </div>
//         </Grid>
//       </Grid>
//       {/* footer section */}
//       <Grid item lg={12} md={7} sm={6} xs={12}>
//         <Footer isLoading={isLoading} />
//       </Grid>
//     </>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Button, Grid, Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
// import AnimateButton from 'ui-component/extended/AnimateButton';
import Footer from '../Footer';
import { bgimage } from '../../../assets/images/index';
import { gridSpacing } from 'store/constant';
import Animationfront from 'components/Animationfront';
import useTypematerial from 'components/TypeAnimation';
import './Style.css';
import LoadingDashboard from 'views/utilities/LoadingDashboard'; // Import the loading component
import AnimatedButton from 'ui-component/Button/AnimatedButton';

// ==============================|| DEFAULT DASHBOARD ||============================== //
const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const assignments = ['CollegeNotes', 'Assignments', 'Answers from PrepParadoxBot'];
  const assignment = useTypematerial({ assignments });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate loading time, adjust as needed

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  const handleExploreNowClick = () => {
    navigate('/year');
  };

  return (
    <>
      {isLoading ? (
        <LoadingDashboard />
      ) : (
        <>
          <Grid
            container
            spacing={gridSpacing}
            sx={{
              position: 'relative',
              background: `url(${bgimage}) no-repeat center center fixed`,
              backgroundSize: 'cover',
              minHeight: '100vh',
              borderRadius: '20px',
              marginTop: 1
            }}
          >
            <Grid item lg={12} md={6} sm={6} xs={12}>
              <Grid container flexDirection="row" alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6} lg={6} sx={{ px: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Animationfront />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ px: 2 }}>
                  <Box sx={{ textAlign: 'center', py: matchDownSM ? 2 : 0 }}>
                    <Typography color="whiteSmoke" gutterBottom variant={matchDownSM ? 'h4' : 'h2'}>
                      {assignment}
                    </Typography>
                    <Typography color="white" variant="body1" fontSize="15px" sx={{ mb: 3 }}>
                      Unlock the power of learning: Paradox Study is your gateway to a vast collection of curated notes, resources, and
                      insights across various subjects and disciplines. Whether you are a student, educator, or lifelong learner, our
                      platform is designed to fuel your curiosity, ignite your passion for learning, and help you excel in your academic
                      journey.
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Button onClick={handleExploreNowClick}>
                        <AnimatedButton />
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} lg={6} sx={{ px: 2 }} mt={6}>
              <div className="custom-shape-divider-bottom-1712342805">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    className="shape-fill"
                  ></path>
                </svg>
              </div>
            </Grid>
          </Grid>

          <Grid item lg={12} md={7} sm={6} xs={12}>
            <Footer isLoading={isLoading} />
          </Grid>
        </>
      )}
    </>
  );
};

export default Dashboard;
