import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for the loader
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

export default function ProfileCard(props) {
  const [avatar, setAvatar] = useState(props.avatar);
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  const handleImageChange = async (event) => {
    try {
      setLoading(true); // Set loading to true when uploading starts
      setError(null); // Reset error state

      const token = localStorage.getItem('token');
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axios.patch(UPDATE, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      toast.success('Avatar updated successfully');
      setAvatar(response.data.data.avatar); // Update avatar state with the new avatar URL
      setLoading(false); // Set loading to false when upload is completed
    } catch (error) {
      setError('Error updating avatar'); // Set error message
      console.error('Error updating avatar:', error);
      toast.error('Avatar update failed');
      setLoading(false); // Set loading to false in case of error
    }
  };

  const handleCameraIconClick = () => {
    document.getElementById('imageInput').click();
  };

  return (
    <Card variant="outlined">
      <Grid container direction="column" justifyContent="center" alignItems="center" className="test">
        <Grid item sx={{ p: '1.5rem 0rem', textAlign: 'center' }}>
          {loading ? (
            <CircularProgress sx={{ color: 'secondary.main' }} />
          ) : (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <PhotoCameraIcon
                  onClick={handleCameraIconClick}
                  sx={{
                    border: '5px solid white',
                    backgroundColor: '#ff558f',
                    borderRadius: '50%',
                    padding: '.2rem',
                    width: 35,
                    height: 35
                  }}
                ></PhotoCameraIcon>
              }
            >
              <Avatar sx={{ width: 100, height: 100, mb: 1.5 }} src={avatar}></Avatar>
            </Badge>
          )}

          <Typography variant="h6">{props.name}</Typography>
          <Typography color="text.secondary">{props.sub}</Typography>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography style={styles.details}>Detail 1</Typography>
            <Typography style={styles.details}>Detail 2</Typography>
            <Typography style={styles.details}>Detail 3</Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'end' }}>
            <Typography style={styles.value}>{props.dt1}</Typography>
            <Typography style={styles.value}>{props.dt2}</Typography>
            <Typography style={styles.value}>{props.dt3}</Typography>
          </Grid>
        </Grid>
        <Grid item style={styles.details} sx={{ width: '100%' }}>
          <Button variant="contained" color="secondary" sx={{ width: '99%', p: 1, my: 2 }}>
            View Public Profile
          </Button>
        </Grid>
        {/* Render loader if loading state is true */}
        {error && <Typography color="error">{error}</Typography>} {/* Render error message if error state is not null */}
        <input type="file" id="imageInput" accept="image/jpeg" style={{ display: 'none' }} onChange={handleImageChange} />
      </Grid>
    </Card>
  );
}
