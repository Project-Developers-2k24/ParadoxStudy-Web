import React, { useState } from 'react';
import { Card, CardContent, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';
import CustomButton from './CustomButton';
import placeholder from '../../../assets/images/icons/placeholder.jpg';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PassportPDFViewer = ({ pdfData }) => {
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const toggleView = () => {
    setShowPdf(!showPdf); // Toggle between PDF and image
  };

  const handleViewPDF = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChatWithMaruthi = () => {
    // Implement the logic to open the chat with Maruthi here
    navigate('/chatbot', {
      state: {
        pdfData: pdfData
      }
    });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => prev + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => prev - 0.1);
  };

  return (
    <div>
      {showPdf ? (
        <div>
          <Document file={pdfData.docs_url} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={zoomLevel} renderTextLayer={false} />
            ))}
          </Document>
          <button onClick={toggleView}>Show Image</button>
        </div>
      ) : (
        <div>
          <Card style={{ width: '200px', height: '200px', border: '2px solid #ccc', marginBottom: '20px', borderColor: '#e0e0e0' }}>
            <CardContent>
              {pdfData.docs_url ? (
                <Document file={pdfData.docs_url} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={1} width={160} height={160} renderTextLayer={false} />
                </Document>
              ) : (
                <img src={placeholder} alt="Passport Placeholder" style={{ width: '200px', height: '200px' }} />
              )}
            </CardContent>
          </Card>
          {/* Add AnimateButton component for View PDF */}
          <Box display="flex" flexDirection="column" gap={1}>
            <Box>
              <CustomButton text="View Pdf" onClick={handleViewPDF} size="small" />
            </Box>
            <Box>
              <CustomButton text="Chat with Maruthi" onClick={handleChatWithMaruthi} size="small" />
            </Box>
          </Box>
        </div>
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {pdfData.docs_name}
            <Box>
              <IconButton onClick={handleZoomIn}>
                <ZoomInIcon />
              </IconButton>
              <IconButton onClick={handleZoomOut}>
                <ZoomOutIcon />
              </IconButton>
              <IconButton onClick={handleCloseDialog}>
                {' '}
                {/* Close button */}
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Document file={pdfData.docs_url}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={zoomLevel} renderTextLayer={false} />
            ))}
          </Document>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PassportPDFViewer;
