// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Box, Typography, Button } from '@mui/material';
// import { notes } from 'assets/images';
// import CustomButton from './CustomButton';
// import PdfViewerModal from './PDFViewer'; // Import the PdfViewerModal component
// import {file} from '../../../assets/images/index';
// const NotesComponent = () => {
//   const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

//   const handleViewNotes = () => {
//     // Logic for handling the View Notes button click
//     // Open the PDF viewer modal
//     setIsPdfModalOpen(true);
//   };

//   const handlePrepParadoxBot = () => {
//     // Logic for handling the PrepParadoxBot button click
//   };

//   const subject = window.location.pathname.split('/').pop();

//   return (
//     <Box mt={3} display="flex" justifyContent="center" alignItems="center">
//       <Box mr={3}>
//         {/* Display the image */}
//         <img src={notes} alt="Notes" style={{ width: '400px', height: 'auto' }} />
//       </Box>
//       <Box textAlign="center">
//         <Typography variant="h4" gutterBottom>
//           Notes for {subject}
//         </Typography>
//         <Box mt={2}>
//           {/* Use the CustomButton component with appropriate text and onClick handlers */}
//           <CustomButton text="View Notes" onClick={handleViewNotes} />
//           <CustomButton text="PrepParadoxBot" onClick={handlePrepParadoxBot} />
//         </Box>
//       </Box>
//       {/* Render the PDF viewer modal */}
//       <PdfViewerModal
//         open={isPdfModalOpen}
//         onClose={() => setIsPdfModalOpen(false)}
//         pdfUrl={file}
//       />
//     </Box>
//   );
// };

// NotesComponent.propTypes = {
//   branch: PropTypes.string.isRequired,
// };

// export default NotesComponent;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { notes } from 'assets/images';
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import ChatBot from './PrepParadoxBot';// Import your ChatBot component

const NotesComponent = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const handleViewNotes = () => {
    // Navigate to another page where the user can view the PDF
    navigate('/pdf-viewer');
  };

  const handlePrepParadoxBot = () => {
    // Logic for handling the PrepParadoxBot button click
    // For now, let's just open the chatbot
    setIsChatBotOpen(true);
  };

  const subject = window.location.pathname.split('/').pop();

  return (
    <Box mt={3} display="flex" justifyContent="center" alignItems="center">
      <Box mr={3}>
        {/* Display the image */}
        <img src={notes} alt="Notes" style={{ width: '400px', height: 'auto' }} />
      </Box>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Notes for {subject}
        </Typography>
        <Box mt={2}>
          {/* Use the CustomButton component with appropriate text and onClick handlers */}
          <CustomButton text="View Notes" onClick={handleViewNotes} />
          {/* Open the chatbot when this button is clicked */}
          <CustomButton text="PrepParadoxBot" onClick={handlePrepParadoxBot} />
        </Box>
      </Box>
      {/* Render the ChatBot component */}
      <ChatBot isOpen={isChatBotOpen} onClose={() => setIsChatBotOpen(false)} />
    </Box>
  );
};

NotesComponent.propTypes = {
  branch: PropTypes.string.isRequired,
};

export default NotesComponent;
