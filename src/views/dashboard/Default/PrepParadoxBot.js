import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'; // Import the send icon

const ChatBot = ({ isOpen, onClose }) => {
    const [selectedBook, setSelectedBook] = useState(null);

    const handleBookSelection = (book) => {
        setSelectedBook(book);
        // Logic to handle book selection
    };

    const handleBookUpload = () => {
        // Logic to handle book upload
    };

    const handleMessageSend = () => {
        // Logic to send message to chatbot
        // Since we are not using the message state variable for now, this function can be empty
    };

    const getResponse = () => {
        if (!selectedBook) {
            return "Please select a book first!";
        } else {
            return `Sure! Let me help you with your questions about ${selectedBook}.`;
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>PrepParadoxBot</DialogTitle>
            <DialogContent>
                {/* Chat interface */}
                <Box mb={2}>
                    <Typography variant="subtitle1">Talk to me to solve all your study woes! 📚🚀</Typography>
                </Box>

                {/* Book selection */}
                <Box mb={2}>
                    <Typography variant="subtitle1">Select a Book:</Typography>
                    <Button variant="outlined" onClick={() => handleBookSelection('Book 1')}>Book 1</Button>
                    <Button variant="outlined" onClick={() => handleBookSelection('Book 2')}>Book 2</Button>
                    {/* Add more buttons for additional books */}
                </Box>

                {/* Book upload */}
                <Box mb={2}>
                    <Typography variant="subtitle1">Upload a Book:</Typography>
                    <Button variant="contained" onClick={handleBookUpload}>Upload</Button>
                </Box>

                {/* Chat input */}
                <Box display="flex" alignItems="center">
                    <TextField
                        variant="outlined"
                        label="Type your message here"
                        fullWidth
                    />
                    <IconButton onClick={handleMessageSend}>
                        <SendIcon />
                    </IconButton>
                </Box>

                {/* Chatbot response */}
                <Box mt={2}>
                    {getResponse()}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

ChatBot.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ChatBot;


