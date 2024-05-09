
import React from 'react';
import PassportPDFViewer from './PDFViewer'; // Assuming the component file is named PassportPDFViewer.js
import { useParams } from 'react-router';
import { Typography, Grid } from '@mui/material'; // Import Grid component from Material-UI

const Data = () => {
  const { year, branch, subject } = useParams();
  const pdfFiles = [
    { url: '/clmsCertificateishika.pdf', name: 'PDF 1' },
    { url: '/sample.pdf', name: 'PDF 2' },
    { url: '/clmsCertificateishika.pdf', name: 'PDF 3' },
    { url: '/clmsCertificateishika.pdf', name: 'PDF 4' },
    { url: '/clmsCertificateishika.pdf', name: 'PDF 1' },
    { url: '/sample.pdf', name: 'PDF 2' },
    { url: '/clmsCertificateishika.pdf', name: 'PDF 3' },
    { url: '/clmsCertificateishika.pdf', name: 'PDF 4' },
  ];

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Notes for {subject} ({branch}-{year} Year)
      </Typography>
      {/* Wrap PassportPDFViewer components in a Grid container */}
      <Grid container spacing={2}>
        {pdfFiles.map((pdf, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            {/* Set xs={12} to occupy full width on extra small screens */}
            {/* Set sm={6} to occupy 50% of the width on medium screens */}
            {/* Set md={3} to occupy 25% of the width on large screens */}
            <PassportPDFViewer pdfData={pdf} /> {/* Adjusted prop name here */}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Data;
