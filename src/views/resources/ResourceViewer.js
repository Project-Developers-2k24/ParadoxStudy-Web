import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Drawer,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress
} from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';
import CustomButton from 'views/dashboard/Default/CustomButton';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CloseIcon from '@mui/icons-material/Close';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import axios from 'axios';
import { toast } from 'react-toastify';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResourceViewer = () => {
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [uploadedResource, setUploadedResource] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPdfData = async () => {
      try {
        const formData = new FormData();
        const id = localStorage.getItem('userId');
        formData.append('userId', id);

        const res = await axios.post('https://projectdev2114.azurewebsites.net/api/user/getAllData', formData);
        setPdfFiles(res.data.data); // Assuming res.data.data contains the array of PDF data
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPdfData();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleViewPDF = (r) => {
    setUploadedResource(r.docs_url);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChatWithMaruthi = (e) => {
    navigate('/chatbot', {
      state: {
        pdfData: e
      }
    });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => prev + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => prev - 0.1);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleFileChange = (e) => {
    setUploadedResource(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem('userId');
    if (uploadedResource) {
      setLoading(true);
      const formData = new FormData();
      formData.append('pdf', uploadedResource); // Append the uploaded file
      formData.append('name', subject); // Append other form fields
      formData.append('sem', year); // Append other form fields
      formData.append('userId', id); // Append other form fields
      formData.append('chatId', id); // Append other form fields

      try {
        const response = await axios.post('https://projectdev2114.azurewebsites.net/api/user/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
          }
        });

        // Assuming the backend responds with some data
        console.log('Response:', response.data);

        const newResource = { docs_url: response.data.axiosResponseData.uri, docs_name: uploadedResource.name, subject, year };
        setPdfFiles((prevData) => {
          return Array.isArray(prevData) ? [...prevData, newResource] : [prevData, newResource];
        });
        toast.success(response.data.message);
        setLoading(false);
        setUploadedResource(null);
        setSubject('');
        setYear('');
        setDrawerOpen(false);
        // Update UI or take further actions based on the response
      } catch (error) {
        setLoading(false);
        setUploadedResource(null);
        setSubject('');
        setYear('');
        setDrawerOpen(false);
        toast.error(error.response.data.message);
        console.error('Error uploading file:', error);
        // Handle error
      }
    }
  };

  return (
    <Box style={{ mt: '2px' }}>
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" position="relative" mb={2}>
        <Typography variant="h3" gutterBottom>
          Learning Resources
        </Typography>
        <IconButton onClick={handleDrawerOpen} style={{ position: 'absolute', right: 20 }}>
          <FolderOpenIcon />
        </IconButton>
      </Box>
      <Grid container spacing={1}>
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
              <CustomButton text="View PDF" onClick={() => handleViewPDF(resource)} size="small" />
              <CustomButton text="Chat with Maruthi" onClick={() => handleChatWithMaruthi(resource)} size="small" />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box p={2} width={250}>
          <form onSubmit={handleFormSubmit}>
            <TextField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} fullWidth margin="normal" />
            <TextField label="Sem" value={year} onChange={(e) => setYear(e.target.value)} fullWidth margin="normal" />
            <Button variant="contained" component="label" fullWidth>
              Choose File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {loading ? (
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} style={{ marginTop: '20px' }}>
                <CircularProgress />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!uploadedResource}
                style={{ marginTop: '20px' }}
              >
                Upload
              </Button>
            )}
          </form>
        </Box>
      </Drawer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            PDF Viewer
            <Box>
              <IconButton onClick={handleZoomIn}>
                <ZoomInIcon />
              </IconButton>
              <IconButton onClick={handleZoomOut}>
                <ZoomOutIcon />
              </IconButton>
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Document file={uploadedResource}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={zoomLevel} renderTextLayer={false} />
            ))}
          </Document>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ResourceViewer;
