import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Drawer,
  TextField,
  Button,
  Typography,
  CircularProgress,
  MenuItem
} from '@mui/material';
import { pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import PdfGrid from 'ui-component/pdfgrid'; // Import the PdfGrid component
import { bookTypes } from 'api/Books';
import LoadingParadox from 'views/utilities/LoadingParadox';
import { useQuery } from 'react-query';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResourceViewer = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('');
  const [filename, setFilename] = useState('');
  const [uploadedResource, setUploadedResource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);

  const {
    data: pdfFiles = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery('pdfData', async () => {
    const formData = new FormData();
    const id = localStorage.getItem('userId');
    formData.append('userId', id);

    const res = await axios.post('http://localhost:8000/api/user/getAllData', formData);
    if (res.data && res.data.data) {
      return res.data.data; // Assuming res.data.data contains the array of PDF data
    } else {
      throw new Error('Data format error');
    }
  });

  const handleViewPDF = (r) => {
    setUploadedResource(r.docs_url);
  };

  const onChatWithMaruti = (resource) => {
    navigate('/chatbot', {
      state: {
        pdfData: resource
      }
    });
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setUploadedResource(file);

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = async function () {
        try {
          const pdfData = new Uint8Array(this.result);
          const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
          const page = await pdf.getPage(1);

          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport
          };

          await page.render(renderContext).promise;

          const imgUrl = canvas.toDataURL();
          setPdfPreview(imgUrl);
        } catch (error) {
          console.error('Error rendering PDF:', error);
        }
      };

      fileReader.readAsArrayBuffer(file);
    }
  };

  const handlePdfDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const res = await axios.delete('http://localhost:8000/api/user/deleteBook', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { selected_book: resourceToDelete.docs_name }
      });
      console.log(res.data)
      if (res.data) {
        toast.success('Delete successful!');
        console.log('Delete successful', res.data);

        setConfirmDeleteOpen(false);
        setLoading(false);
        // Add a slight delay before refetching
        await refetch();
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      setLoading(false);
      setConfirmDeleteOpen(false);
      toast.error('Error deleting PDF');
      console.log('Error deleting PDF', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePreview = () => {
    setUploadedResource(null);
    setPdfPreview(null);
  };

  const handleFormSubmit = async (e) => {
    setUploadProgress(0);
    e.preventDefault();
    const id = localStorage.getItem('userId');

    // Check for duplicate PDFs
    if (uploadedResource && pdfFiles.some((file) => file.docs_name === uploadedResource.name)) {
      toast.error('The same PDF already exists!');
      return; // Prevent further execution if a duplicate is found
    }

    if (uploadedResource) {
      setLoading(true);
      const formData = new FormData();
      formData.append('pdf', uploadedResource); // Append the uploaded file
      formData.append('type', type); // Append type
      formData.append('subject', subject); // Append subject
      formData.append('filename', filename); // Append filename

      formData.append('userId', id); // Append user ID
      formData.append('chatId', id); // Append chat ID

      try {
        const response = await axios.post('http://localhost:8000/api/user/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
          },

          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress); // Update upload progress state
          }
        });

        if (response.data && response.data.axiosResponseData) {
          const newResource = {
            docs_url: response.data.axiosResponseData.uri,
            docs_name: response.data.axiosResponseData.docs_name,
            userId: response.data.axiosResponseData.userId,
            type: type,
            subject: subject,
            filename: filename
          };
          // setPdfFiles((prevData) => {
          //   return Array.isArray(prevData) ? [...prevData, newResource] : [prevData, newResource];
          // });
          toast.success(response.data.message);
          await refetch();
        } else {
          throw new Error('Upload failed');
        }

        setUploadedResource(null);
        setPdfPreview(null); // Clear the PDF preview
        setType('');
        setSubject('');
        setFilename('');
        setDrawerOpen(false);
        await refetch();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error uploading file');
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const openConfirmDelete = (resource) => {
    setResourceToDelete(resource);
    setConfirmDeleteOpen(true);
  };

  const closeConfirmDelete = () => {
    setConfirmDeleteOpen(false);
    setResourceToDelete(null);
  };
  return (
    <>
      {isLoading ? (
        <LoadingParadox />
      ) : (
        <Box style={{ mt: '2px' }}>
          <Box width="100%" display="flex" justifyContent="center" alignItems="center" position="relative" mb={2}>
            <Typography variant="h3" gutterBottom>
              Learning Resources
            </Typography>
            <IconButton onClick={handleDrawerOpen} style={{ position: 'absolute', right: 20 }}>
              <FolderOpenIcon />
            </IconButton>
          </Box>
          <PdfGrid pdfFiles={pdfFiles} onChatWithMaruti={onChatWithMaruti} onDeletePdf={openConfirmDelete} /> {/* Use PdfGrid component */}
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
            <Box p={2} width={250}>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  select // Use select to create a dropdown
                  label="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  {bookTypes.map((bookType) => (
                    <MenuItem key={bookType} value={bookType}>
                      {bookType}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} fullWidth margin="normal" />
                <TextField label="Filename" value={filename} onChange={(e) => setFilename(e.target.value)} fullWidth margin="normal" />
                <Button variant="contained" component="label" fullWidth>
                  Choose File
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {pdfPreview && (
                  <Box mt={2} position="relative" display="flex" justifyContent="center">
                    <img src={pdfPreview} alt="PDF Preview" width="100" />
                    <IconButton onClick={handleRemovePreview} aria-label="remove" style={{ position: 'absolute', top: 0, right: 0 }}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}
                {loading ? (
                  <>
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} style={{ marginTop: '20px' }}>
                      <CircularProgress value={uploadProgress} />
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                      Uploading: {uploadProgress}%
                    </Typography>
                  </>
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
        </Box>
      )}
      <Dialog
        open={confirmDeleteOpen}
        onClose={closeConfirmDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete PDF'}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this PDF?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDelete} color="primary">
            Cancel
          </Button>
          {loading ? (
            <Button onClick={handlePdfDelete} color="primary" autoFocus>
              <CircularProgress value={uploadProgress} />
            </Button>
          ) : (
            <Button onClick={handlePdfDelete} color="primary" autoFocus>
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResourceViewer;
