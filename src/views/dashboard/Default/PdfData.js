import React, { useEffect, useState } from 'react';
import PassportPDFViewer from './PDFViewer'; // Assuming the component file is named PassportPDFViewer.js
import { useParams } from 'react-router';
import { Typography, Grid } from '@mui/material'; // Import Grid component from Material-UI
import axios from 'axios';

const Data = () => {
  const { year, branch, subject } = useParams();
  const [pdfFiles, setPdfFiles] = useState([]);
  
  const getPdfData = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', '65fbad5c75999ee397495616');

      const res = await axios.post('http://20.42.96.57:8000/getAllData', formData);
      setPdfFiles(res.data.data); // Assuming res.data.data contains the array of PDF data
      console.log(res.data)
    } catch (error) {
      console.log(error);
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
        {pdfFiles.map((pdf, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <PassportPDFViewer pdfData={pdf} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Data;
