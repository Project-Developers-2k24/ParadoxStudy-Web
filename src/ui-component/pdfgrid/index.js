import React from 'react';
import { Grid, Card, CardContent, Box } from '@mui/material';
import { Document, Page } from 'react-pdf';
import CustomButton from 'views/dashboard/Default/CustomButton';

const PdfGrid = ({ pdfFiles, onChatWithMaruthi }) => {
  return (
    <Grid container spacing={2}>
      {pdfFiles.map((resource, index) => (
        <Grid key={`pdf_${index}`} item xs={12} sm={6} md={3} container direction="column" alignItems="center">
          <Card style={{ width: '200px', height: '200px', border: '2px solid #ccc', borderColor: '#e0e0e0' }}>
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
              <Document file={resource.docs_url}>
                <Page pageNumber={1} width={160} height={160} renderTextLayer={false} />
              </Document>
            </CardContent>
          </Card>
          <Box display="flex" flexDirection="column" gap={1} mt={1} width="200px">
            <CustomButton text="View PDF" onClick={() => window.open(resource.docs_url, '_blank')} size="small" />
            <CustomButton text="Chat with Maruthi" onClick={() => onChatWithMaruthi(resource)} size="small" />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PdfGrid;
