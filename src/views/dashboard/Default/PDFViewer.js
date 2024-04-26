import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Document, Page } from 'react-pdf'; // Import Document and Page components from 'react-pdf'

const PDFViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false); // State for controlling modal open/close

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(Math.max(pageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(Math.min(pageNumber + 1, numPages));
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button variant="contained" onClick={goToPrevPage} disabled={pageNumber <= 1}>
            Prev
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={goToNextPage} disabled={pageNumber >= numPages}>
            Next
          </Button>
        </Grid>
        <Grid item>
          {numPages ? (
            <span>
              Page {pageNumber} of {numPages}
            </span>
          ) : (
            <CircularProgress />
          )}
        </Grid>
        <Grid item xs={12}>
          {/* Display a button to open the PDF viewer modal */}
          <Button variant="contained" onClick={handleOpenModal}>View PDF</Button>
        </Grid>
      </Grid>

      {/* PDF Viewer Modal */}
      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>View Notes</DialogTitle>
        <DialogContent>
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

PDFViewer.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};

export default PDFViewer;
