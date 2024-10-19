// import React, { useState } from 'react';
// import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import { Document, Page, pdfjs } from 'react-pdf';
// import { useNavigate } from 'react-router';
// import PdfGrid from 'ui-component/pdfgrid';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const PassportPDFViewer = () => {
//   const navigate = useNavigate();
//   const [pdfFiles, setPdfFiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getPdfData = async () => {
//       setLoading(true);
//       try {
//         const id = localStorage.getItem('userId');
//         const formData = new FormData();
//         formData.append('userId', id);

//         const res = await axios.post('http://localhost:8000/api/user/getAllData', formData);
//         setPdfFiles(res.data.data); // Assuming res.data.data contains the array of PDF data
//       } catch (error) {
//         console.log(error);
//         toast.error("Failed to load PDF files.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPdfData();
//   }, []);

//   const handleChatWithMaruthi = (pdf) => {
//     navigate('/chatbot', {
//       state: {
//         pdfData: pdf
//       }
//     });
//   };

//   return (
//     <div>
//       <div>
//         {showPdf ? (
//           <div>
//             <Document file={pdfData.docs_url} onLoadSuccess={onDocumentLoadSuccess}>
//               {Array.from(new Array(numPages), (el, index) => (
//                 <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={zoomLevel} renderTextLayer={false} />
//               ))}
//             </Document>
//             <Button variant="contained" color="primary" onClick={toggleView} style={{ marginTop: '20px' }}>
//               Show Image
//             </Button>
//           </div>
//         ) : (
//           <>
//             <Card style={{ width: '200px', height: '200px', border: '2px solid #e0e0e0', marginBottom: '20px' }}>
//               <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
//                 {pdfData.docs_url ? (
//                   <Document file={pdfData.docs_url} onLoadSuccess={onDocumentLoadSuccess}>
//                     <Page pageNumber={1} width={160} height={160} renderTextLayer={false} />
//                   </Document>
//                 ) : (
//                   <img src={placeholder} alt="Passport Placeholder" style={{ width: '160px', height: '160px' }} />
//                 )}
//               </CardContent>
//             </Card>
//             <Box display="flex" flexDirection="column" gap={1} alignItems="center" mt={1} width="200px">
//               <CustomButton text="View Pdf" onClick={handleViewPDF} size="small" />

//               <CustomButton text="Chat with Maruthi" onClick={handleChatWithMaruthi} size="small" />
//             </Box>
//           </>
//         )}
//       </div>
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             {pdfData.docs_name}
//             <Box>
//               <IconButton onClick={handleZoomIn}>
//                 <ZoomInIcon />
//               </IconButton>
//               <IconButton onClick={handleZoomOut}>
//                 <ZoomOutIcon />
//               </IconButton>
//               <IconButton onClick={handleCloseDialog}>
//                 {' '}
//                 {/* Close button */}
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           <Document file={pdfData.docs_url}>
//             {Array.from(new Array(numPages), (el, index) => (
//               <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={zoomLevel} renderTextLayer={false} />
//             ))}
//           </Document>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default PassportPDFViewer;

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import PdfGrid from 'ui-component/pdfgrid';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingParadox from 'views/utilities/LoadingParadox';

const PassportPDFViewer = () => {
  const navigate = useNavigate();
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPdfData = async () => {
      setLoading(true);
      try {
        const id = localStorage.getItem('userId');
        const formData = new FormData();
        formData.append('userId', id);

        const res = await axios.post('http://localhost:8000/api/user/getAllData', formData);
        setPdfFiles(res.data.data); // Assuming res.data.data contains the array of PDF data
      } catch (error) {
        console.log(error);
        toast.error("Failed to load PDF files.");
      } finally {
        setLoading(false);
      }
    };

    getPdfData();
  }, []);

  const handleChatWithMaruti = (pdf) => {
    navigate('/chatbot', {
      state: {
        pdfData: pdf
      }
    });
  };
  const handlePdfDelete = () => {

  }

  return (
    <div>
      {/* <Box width="100%" display="flex" justifyContent="center" alignItems="center" position="relative" mb={2}>
        <Typography variant="h3" gutterBottom>
         
        </Typography>
      </Box> */}
      {loading ? (
        <LoadingParadox />
      ) : (
        <PdfGrid pdfFiles={pdfFiles} onChatWithMaruti={handleChatWithMaruti} onDeletePdf={handlePdfDelete} />
      )}
    </div>
  );
};

export default PassportPDFViewer;



