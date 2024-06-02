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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress

  const handleImageChange = async (event) => {
    try {
      setLoading(true);
      setError(null);
      setUploadProgress(0); // Reset upload progress state
  
      const token = localStorage.getItem('token');
      const file = event.target.files[0];
  
      const formData = new FormData();
      formData.append('avatar', file);
  
      const response = await axios.patch(UPDATE, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.log('Upload progress:', progress); // Log progress to check if it's updating correctly
          setUploadProgress(progress); // Update upload progress state
        }
      });
  
      console.log(response.data);
      toast.success('Avatar updated successfully');
      setAvatar(response.data.data.avatar);
      setLoading(false);
    } catch (error) {
      setError('Error updating avatar');
      console.error('Error updating avatar:', error);
      toast.error('Avatar update failed');
      setLoading(false);
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
            <div>
              <CircularProgress sx={{ color: 'secondary.main', marginBottom: '1rem' }} />
              <Typography variant="body2" color="text.secondary">
                Uploading: {uploadProgress}%
              </Typography>
            </div>
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
        {error && <Typography color="error">{error}</Typography>}
        <input type="file" id="imageInput" accept="image/jpeg" style={{ display: 'none' }} onChange={handleImageChange} />
      </Grid>
    </Card>
  );
}
