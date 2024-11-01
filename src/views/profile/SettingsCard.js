import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomInput from './CustomInput';
import Typography from 'views/utilities/Typography';
import axios from 'axios';
import { UPDATE } from 'api/auth';
import { toast } from 'react-toastify';

const styles = {
  details: {
    padding: '1rem',
    borderTop: '1px solid #e1e1e1'
  },
  value: {
    padding: '1rem 2rem',
    borderTop: '1px solid #e1e1e1',
    color: '#899499'
  }
};

export default function SettingsCard(props) {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const engineeringBranches = [
    {
      value: 'CHE',
      label: 'Chemical Engineering'
    },
    {
      value: 'CIV',
      label: 'Civil Engineering'
    },
    {
      value: 'CPE',
      label: 'Computer Engineering'
    },
    {
      value: 'ELE',
      label: 'Electrical Engineering'
    },
    {
      value: 'MEC',
      label: 'Mechanical Engineering'
    },
    {
      value: 'CSE',
      label: 'Computer Science and Engineering'
    },
    {
      value: 'ECE',
      label: 'Electronics and Communication Engineering'
    },
    {
      value: 'IOT',
      label: 'Internet of Things'
    }
  ];

  const semSelect = [
    {
      value: 'I',
      label: 'I'
    },
    {
      value: 'II',
      label: 'II'
    },
    {
      value: 'III',
      label: 'III'
    },
    {
      value: 'IV',
      label: 'IV'
    },
    {
      value: 'V',
      label: 'V'
    },
    {
      value: 'VI',
      label: 'VI'
    },
    {
      value: 'VII',
      label: 'VII'
    },
    {
      value: 'VIII',
      label: 'VIII'
    }
  ];
  const countrySelect = [
    {
      value: 'USA',
      label: 'United States'
    },
    {
      value: 'UK',
      label: 'United Kingdom'
    },
    {
      value: 'FR',
      label: 'France'
    },
    {
      value: 'DE',
      label: 'Germany'
    },
    {
      value: 'IT',
      label: 'Italy'
    },
    {
      value: 'CA',
      label: 'Canada'
    },
    {
      value: 'AU',
      label: 'Australia'
    },
    {
      value: 'IN',
      label: 'India'
    },
    {
      value: 'BR',
      label: 'Brazil'
    },
    {
      value: 'RU',
      label: 'Russia'
    }
  ];

  const [user, setUser] = useState({
    username: props.username,
    institution: props.institution,
    year: props.year,
    sem: props.sem,
    phone: props.phone,
    gender: props.gender, // Add gender field
    country: props.country, // Add country field
    branch: props.branch,
    avatar: props.avatar
  });

  const changeField = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value, avatar: props.avatar });
  };
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.patch(UPDATE, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('update succesfully');
      console.log(res.data);
    } catch (error) {
      toast.success('error in update profile succesfully');
      console.error(error);
    }
  };
  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true
  });

  const handlePassword = () => {
    user.showPassword = !user.showPassword;
    setUser({ ...user });
  };

  return (
    <Card variant="outlined" sx={{ height: '100%', width: '100%' }}>
      <br></br>
      <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary">
        <Tab value="one" label="Account" />
        <Tab value="two" label="Tab 2" />
        <Tab value="three" label="Tab 3" />
      </Tabs>
      <Divider></Divider>

      <form>
        <CardContent
          sx={{
            p: 3,
            textAlign: { xs: 'center', md: 'start' },
            // pb: '10rem',
          }}
        >
          <FormControl fullWidth>
            <Grid
              container
              direction={{ xs: 'column', md: 'row' }}
              columnSpacing={5}
              rowSpacing={3}
            >
              <Grid item xs={6}>
                <CustomInput
                  id="username"
                  name="username"
                  value={user.username}
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
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
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
                    startAdornment: <InputAdornment position="start">91+</InputAdornment>
                  }}
                ></CustomInput>
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  select
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={changeField}
                  title="Gender"
                  dis={edit.disabled}
                  req={edit.required}
                  content={[
                    <MenuItem key="male" value="male">
                      Male
                    </MenuItem>,
                    <MenuItem key="female" value="female">
                      Female
                    </MenuItem>,
                    <MenuItem key="other" value="other">
                      Other
                    </MenuItem>
                  ]}
                ></CustomInput>
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  select
                  id="country"
                  name="country"
                  value={user.country}
                  onChange={changeField}
                  title="Country"
                  dis={edit.disabled}
                  req={edit.required}
                  content={countrySelect.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                ></CustomInput>
              </Grid>
              <Grid item xs={6}>
                <CustomInput
                  select
                  id="branch"
                  name="branch"
                  value={user.branch}
                  onChange={changeField}
                  title="Branch"
                  dis={edit.disabled}
                  req={edit.required}
                  content={engineeringBranches.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                ></CustomInput>
              </Grid>

              <Grid container justifyContent={{ xs: 'center', md: 'flex-end' }} item xs={6}>
                <Button
                  sx={{ my: 2, mb: 2, py: '1rem', height: '3rem' }} // Added py: '1rem' for padding
                  component="button"
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </form>
    </Card>
  );
}
