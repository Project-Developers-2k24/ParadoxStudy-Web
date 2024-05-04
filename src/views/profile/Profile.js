// import { v4 as uuidv4 } from 'uuid';
// // import uuid from 'uuid';
// import Grid from "@mui/material/Grid";
// import CssBaseline from "@mui/material/CssBaseline";
// import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";
// import Avatar from "@mui/material/Avatar";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import Badge from "@mui/material/Badge";
// import Button from "@mui/material/Button";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import CustomInput from "./CustomInput";
// import CardContent from "@mui/material/CardContent";
// import InputAdornment from "@mui/material/InputAdornment";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import Visibility from "@mui/icons-material/Visibility";

// // IMPORTS
// import React, { useState } from "react";
// import FormControl from "@mui/material/FormControl";

// const styles = {
//   details: {
//     padding: "1rem",
//     borderTop: "1px solid #e1e1e1"
//   },
//   value: {
//     padding: "1rem 2rem",
//     borderTop: "1px solid #e1e1e1",
//     color: "#899499"
//   }
// };

// const Profile = () => {
//   const [value, setValue] = useState("one");

// const handleChange = (newValue) => {
//   setValue(newValue);
// };

//   return (
//     <CssBaseline>
//       {/* BACKGROUND */}
//       <Grid container direction="column" sx={{ overflowX: "hidden" }}>
//         <Grid item xs={12} md={6}>
//           <img
//             alt="avatar"
//             style={{
//               width: "78vw",
//               height: "35vh",
//               objectFit: "cover",
//               objectPosition: "50% 50%",
//               position: "relative"
//             }}
//             src="https://iris2.gettimely.com/images/default-cover-image.jpg"

//           />
//         </Grid>

//         {/* COMPONENTS */}
//         <Grid
//           container
//           direction={{ xs: "column", md: "row" }}
//           spacing={3}
//           sx={{
//             position: "absolute",
//             top: "20vh",
//             px: { xs: 0, md: 7 }
//           }}
//         >
//           {/* PROFILE CARD */}
//           <Grid item md={3}>

//             <Card variant="outlined">
//               <Grid
//                 container
//                 direction="column"
//                 justifyContent="center"
//                 alignItems="center"
//               >
//                 {/* CARD HEADER START */}
//                 <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
//                   {/* PROFILE PHOTO */}
//                   <Badge
//                     overlap="circular"
//                     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                     badgeContent={
//                       <PhotoCameraIcon
//                         sx={{
//                           border: "5px solid white",
//                           backgroundColor: "#ff558f",
//                           borderRadius: "50%",
//                           padding: ".2rem",
//                           width: 35,
//                           height: 35
//                         }}
//                       ></PhotoCameraIcon>
//                     }
//                   >
//                     <Avatar
//                       sx={{ width: 100, height: 100, mb: 1.5 }}
//                       src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"
//                     ></Avatar>
//                   </Badge>

//                   {/* DESCRIPTION */}
//                   <Typography variant="h6">User</Typography>
//                   <Typography color="text.secondary">CEO of Apple</Typography>
//                 </Grid>
//                 {/* CARD HEADER END */}

//                 {/* DETAILS */}
//                 <Grid container>
//                   <Grid item xs={6}>
//                     <Typography style={styles.details}>Detail 1</Typography>
//                     <Typography style={styles.details}>Detail 2</Typography>
//                     <Typography style={styles.details}>Detail 3</Typography>
//                   </Grid>
//                   {/* VALUES */}
//                   <Grid item xs={6} sx={{ textAlign: "end" }}>
//                     <Typography style={styles.value}>1</Typography>
//                     <Typography style={styles.value}>2</Typography>
//                     <Typography style={styles.value}>3</Typography>
//                   </Grid>
//                 </Grid>

//                 {/* BUTTON */}
//                 <Grid item style={styles.details} sx={{ width: "100%" }}>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     sx={{ width: "99%", p: 1, my: 2 }}
//                   >
//                     View Public Profile
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Card>
//           </Grid>
//           {/* <Grid item md={3}>
//               <ProfileCard
//                 name={fullName}
//                 sub={mainUser.title}
//                 dt1={mainUser.dt1}
//                 dt2={mainUser.dt2}
//                 dt3={mainUser.dt3}
//               ></ProfileCard>
//             </Grid> */}

//           {/* SETTINGS CARD */}
//           <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
//             <br></br>
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               textColor="secondary"
//               indicatorColor="secondary"
//             >
//               <Tab value="one" label="Account" />
//               <Tab value="two" label="Tab 2" />
//               <Tab value="three" label="Tab 3" />
//             </Tabs>

//             <form>
//         <CardContent
//           sx={{
//             p: 3,
//             maxHeight: { md: "40vh" },
//             textAlign: { xs: "center", md: "start" }
//           }}
//         >
//           {/* FIELDS */}
//           <FormControl fullWidth>
//             <Grid
//               container
//               direction={{ xs: "column", md: "row" }}
//               columnSpacing={5}
//               rowSpacing={3}
//             >
//               {/* ROW 1: FIRST NAME */}
//               <Grid component="form" item xs={6}>
//                 <CustomInput
//                   id="firstName"
//                   name="firstName"
//                   value={user.firstName}
//                   onChange={changeField}
//                   title="First Name"
//                   dis={edit.disabled}
//                   req={edit.required}
//                 ></CustomInput>
//               </Grid>

//               {/* ROW 1: LAST NAME */}
//               <Grid component="form" item xs={6}>
//                 <CustomInput
//                   id="lastName"
//                   name="lastName"
//                   value={user.lastName}
//                   onChange={changeField}
//                   title="Last Name"
//                   dis={edit.disabled}
//                   req={edit.required}
//                 ></CustomInput>
//               </Grid>

//               {/* ROW 2: MIDDLE NAME */}
//               <Grid item xs={6}>
//                 <CustomInput
//                   id="midName"
//                   name="midName"
//                   value={user.midName}
//                   onChange={changeField}
//                   title="Middle Name"
//                   dis={edit.disabled}
//                   req={edit.required}
//                 ></CustomInput>
//               </Grid>

//               {/* ROW 2: GENDER */}
//               <Grid item xs={6}>
//                 <CustomInput
//                   select
//                   id="gender"
//                   name="gender"
//                   value={user.gender}
//                   onChange={changeField}
//                   title="Gender"
//                   dis={edit.disabled}
//                   req={edit.required}
//                   //MAP THRU OPTIONS
//                   content={genderSelect.map((option) => (
//                     <MenuItem value={option.value} key={uuidv4()}>{option.label}</MenuItem>
//                   ))}
//                 ></CustomInput>
//               </Grid>

//               {/* ROW 3: PHONE */}
//               <Grid item xs={6}>
//                 <CustomInput
//                   id="phone"
//                   name="phone"
//                   value={user.phone}
//                   onChange={changeField}
//                   title="Phone Number"
//                   dis={edit.disabled}
//                   req={edit.required}
//                   //DIALING CODE
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">63+</InputAdornment>
//                     )
//                   }}
//                 ></CustomInput>
//               </Grid>

//               {/* ROW 3: EMAIL */}
//               <Grid item xs={6}>
//                 <CustomInput
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={user.email}
//                   onChange={changeField}
//                   title="Email Address"
//                   dis={edit.disabled}
//                   req={edit.required}
//                 ></CustomInput>
//               </Grid>

//               {/* ROW 4: PASSWORD */}
//               <Grid item xs={6}>
//                 <CustomInput
//                   id="pass"
//                   name="pass"
//                   value={user.pass}
//                   onChange={changeField}
//                   title="Password"
//                   dis={edit.disabled}
//                   req={edit.required}
//                   type={user.showPassword ? "text" : "password"}
//                   // PASSWORD ICON
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={handlePassword}
//                           edge="end"
//                           disabled={edit.disabled}
//                         >
//                           {user.showPassword ? (
//                             <VisibilityOff />
//                           ) : (
//                             <Visibility />
//                           )}
//                         </IconButton>
//                       </InputAdornment>
//                     )
//                   }}
//                 ></CustomInput>
//               </Grid>

//               {/* BUTTON */}
//               <Grid
//                 container
//                 justifyContent={{ xs: "center", md: "flex-end" }}
//                 item
//                 xs={6}
//               >
//                 <Button
//                   sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
//                   component="button"
//                   size="large"
//                   variant="contained"
//                   color="secondary"
//                   onClick={() => props.expose("hello")}
//                 >
//                   {edit.isEdit === false ? "UPDATE" : "EDIT"}
//                 </Button>
//               </Grid>
//             </Grid>
//           </FormControl>
//         </CardContent>
//       </form>
//           </Card>

//           {/* <Grid item md={9}>
//               <SettingsCard
//                 expose={(v) => setText(v)}
//                 firstName={mainUser.firstName}
//                 lastName={mainUser.lastName}
//                 midName={mainUser.midName}
//                 phone={mainUser.phone}
//                 email={mainUser.email}
//                 pass={mainUser.pass}
//                 gender={mainUser.gender}
//               ></SettingsCard>
//             </Grid> */}
//         </Grid>
//       </Grid>
//     </CssBaseline>
//   );
// }

// export default Profile

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileCard from './ProfileCard';
import SettingsCard from './SettingsCard';
import './profile.css';
import { USERBYID } from 'api/auth';
import axios from 'axios';

// STYLE & THEME
const theme = createTheme();

// APP
export default function Profile() {
  const [text, setText] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);

  const getUser = async () => {
    const token = localStorage.getItem('token');
    setToken(token);
    try {
      const res = await axios.get(USERBYID, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Check the status code
      if (res.status === 200) {
        console.log('Success! User data retrieved:', res.data);
        setData(res.data);
      } else {
        console.log('Error:', res.status);
        // Handle other status codes if needed
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const mainUser = {
    // DEFAULT VALUES
    title: 'CEO of Apple',
    dt1: 32,
    dt2: 40,
    dt3: 50,
    firstName: { text },
    lastName: 'Doe',
    midName: 'Baker',
    gender: 'female',
    phone: '932-555-4247',
    email: 'janedoe@gmail.com',
    pass: 'password123'
  };

  // const fullName = `${mainUser.firstName} ${mainUser.lastName}`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        {/* BACKGROUND */}
        <Grid container direction="column" sx={{ overflowX: "hidden" }} className="profile_container">
          <Grid item xs={12} md={6} sm={5} >
            <img
              alt="avatar"
              style={{
                width: '100vw',
                height: '35vh',
                objectFit: 'cover',
                objectPosition: '50% 50%',
                position: 'relative'
              }}
              className="cloud"
              src="https://iris2.gettimely.com/images/default-cover-image.jpg"
            />
          </Grid>

          {/* COMPONENTS */}
          <Grid
            container
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{
              position: 'absolute',
              top: '20vh',
              px: { xs: 0, md: 7 }
            }}
            className="profileContainer"
          >
            {/* PROFILE CARD */}

            <Grid item md={3}>
              {data && data.data && (
                <ProfileCard
                  name={data.data.username}
                  sub={data.data.username}
                  dt1={mainUser.dt1}
                  dt2={mainUser.dt2}
                  dt3={mainUser.dt3}
                  avatar={data.data.avatar}
                />
              )}
            </Grid>

            {/* SETTINGS CARD */}
            <Grid item md={9}>
              {data && data.data && (
                <SettingsCard
                  username={data.data.username}
                  phone={data.data.phone}
                  avatar={data.data.avatar}
                  institution={data.data.institution}
                  email={data.data.email}
                  sem={data.data.sem}
                  year={data.data.year}
                  country={data.data.country}
                  gender={data.data.gender}
                  branch={data.data.branch}
                ></SettingsCard>
              )}
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
}
