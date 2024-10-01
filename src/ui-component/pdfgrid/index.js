import React from 'react';
import { Grid, Card, CardContent, Box, IconButton, Typography } from '@mui/material';
import { Document, Page } from 'react-pdf';
import CustomButton from 'views/dashboard/Default/CustomButton';
import DeleteIcon from '@mui/icons-material/Delete';

const PdfGrid = ({ pdfFiles, onChatWithMaruti, onDeletePdf }) => {
  return (
    <Grid container spacing={2}>
      {pdfFiles.map((resource, index) => (
        <Grid key={`pdf_${index}`} item xs={12} sm={6} md={3} container direction="column" alignItems="center">
          <Typography variant="h6" align="center" style={{ marginTop: '10px', marginBottom: '10px' }}>
            {resource.subject}
          </Typography>
          <Card
            style={{
              width: '200px',
              height: '200px',
              border: '2px solid #e0e0e0',
              position: 'relative'
            }}
          >
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
              <Document file={resource.docs_url} onLoadError={(error) => console.error('Error loading document:', error)}>
                <Page pageNumber={1} width={160} height={160} renderTextLayer={false} />
              </Document>
            </CardContent>
            <IconButton
              onClick={() => onDeletePdf(resource)}
              aria-label="delete"
              style={{ position: 'absolute', top: '3px', right: '3px', zIndex: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Card>
          <Box display="flex" flexDirection="column" gap={1} mt={1} width="200px">
            <CustomButton text="View PDF" onClick={() => window.open(resource.docs_url, '_blank')} size="small" />
            <CustomButton text="Chat with Maruti" onClick={() => onChatWithMaruti(resource)} size="small" />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PdfGrid;
