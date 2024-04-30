import React, { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomInput from "./CustomInput";
import Typography from "views/utilities/Typography";

const styles = {
    details: {
      padding: "1rem",
      borderTop: "1px solid #e1e1e1"
    },
    value: {
      padding: "1rem 2rem",
      borderTop: "1px solid #e1e1e1",
      color: "#899499"
    }
  };

export default function SettingsCard(props) {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const semSelect = [
    {
      value: "I",
      label: "I"
    },
    {
      value: "II",
      label: "II"
    },
    {
      value: "III",
      label: "III"
    },
    {
      value: "IV",
      label: "IV"
    },
    {
      value: "V",
      label: "V"
    },
    {
      value: "VI",
      label: "VI"
    },
    {
      value: "VII",
      label: "VII"
    },
    {
      value: "VIII",
      label: "VIII"
    }
  ];

  const [user, setUser] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    userName: props.userName,
    institution : props.institution,
    year : props.year,
    sem: props.sem,
    phone: props.phone,
    // email: props.email,
    // pass: props.pass,
    // showPassword: false
  });

  const changeField = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true
  });
  <Typography style={styles.value}>{props.dt1}</Typography>

  const handlePassword = () => {
    user.showPassword = !user.showPassword;
    setUser({ ...user });
  };

  return (
    <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
      <br></br>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="one" label="Account" />
        <Tab value="two" label="Tab 2" />
        <Tab value="three" label="Tab 3" />
      </Tabs>
      <Divider></Divider>

      <form>
        <CardContent
          sx={{
            p: 3,
            maxHeight: { md: "40vh" },
            textAlign: { xs: "center", md: "start" }
          }}
        >
          <FormControl fullWidth>
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              columnSpacing={5}
              rowSpacing={3}
            >
              <Grid component="form" item xs={6}>
                <CustomInput
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={changeField}
                  title="First Name"
                  dis={edit.disabled}
                  req={edit.required}
                ></CustomInput>
              </Grid>

              <Grid component="form" item xs={6}>
                <CustomInput
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={changeField}
                  title="Last Name"
                  dis={edit.disabled}
                  req={edit.required}
                ></CustomInput>
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  id="userName"
                  name="userName"
                  value={user.userName}
                  onChange={changeField}
                  title="Username"
                  dis={edit.disabled}
                  req={edit.required}
                ></CustomInput>
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  id="institution"
                  name="institution"
                  value={user.institution}
                  onChange={changeField}
                  title="Institution"
                  dis={edit.disabled}
                  req={edit.required}
                ></CustomInput>
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  id="year"
                  name="year"
                  value={user.year}
                  onChange={changeField}
                  title="Year"
                  dis={edit.disabled}
                  req={edit.required}
                ></CustomInput>
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  select
                  id="sem"
                  name="sem"
                  value={user.sem}
                  onChange={changeField}
                  title="Semester"
                  dis={edit.disabled}
                  req={edit.required}
                  content={semSelect.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                ></CustomInput>
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={changeField}
                  title="Phone Number"
                  dis={edit.disabled}
                  req={edit.required}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">91+</InputAdornment>
                    )
                  }}
                ></CustomInput>
              </Grid>

              {/* <Grid item xs={6}>
                <CustomInput
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={changeField}
                  title="Email Address"
                  dis={edit.disabled}
                  req={edit.required}
                ></CustomInput>
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  id="pass"
                  name="pass"
                  value={user.pass}
                  onChange={changeField}
                  title="Password"
                  dis={edit.disabled}
                  req={edit.required}
                  type={user.showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePassword}
                          edge="end"
                          disabled={edit.disabled}
                        >
                          {user.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                ></CustomInput>
              </Grid> */}

              <Grid
                container
                justifyContent={{ xs: "center", md: "flex-end" }}
                item
                xs={6}
              >
                <Button
                  sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                  component="button"
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={() => props.expose("hello")}
                >
                  {edit.isEdit === false ? "UPDATE" : "EDIT"}
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </form>
    </Card>
  );
}
