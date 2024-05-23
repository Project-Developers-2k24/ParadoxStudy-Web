import React, { useEffect, useState } from 'react';
import PassportPDFViewer from './PDFViewer'; // Assuming the component file is named PassportPDFViewer.js
import { useParams } from 'react-router';
import { Typography, Grid } from '@mui/material'; // Import Grid component from Material-UI
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';

const Data = () => {
  const { year, branch, subject } = useParams();
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  const getPdfData = async () => {
    try {
      const id = localStorage.getItem('userId');
      setUserId(id);
      const formData = new FormData();
      formData.append('userId', id);

      const res = await axios.post('https://projectdev2114.azurewebsites.net/api/user/getAllData', formData);
      setPdfFiles(res.data.data); // Assuming res.data.data contains the array of PDF data
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPdfData();
  }, []);

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Notes for {subject} ({branch}-{year} Year)
      </Typography>
      {/* Wrap PassportPDFViewer components in a Grid container */}
      <Grid container spacing={2}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <Skeleton variant="rounded" width="100%" height={200} />
              </Grid>
            ))
          : pdfFiles.map((pdf, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <PassportPDFViewer pdfData={pdf} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default Data;
