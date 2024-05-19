
import React, { useState, useRef } from 'react';
import {
  AppBar,
  Typography,
  IconButton,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  InputAdornment,
  Button,
  Collapse,
  ListItemAvatar,
  Avatar,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { grey } from '@mui/material/colors';
import { chatbot } from 'assets/images';
const ChatBot = () => {
  const [messageHistory, setMessageHistory] = useState([
    { user: 'Maruti', content: 'Hello! How can I help you?' },
    { user: 'You', content: 'Hi, I want to know about Book 1.' },
    { user: 'Maruti', content: 'Sure, what do you want to know about Book 1?' },
  ]);

  const messageInputRef = useRef(null);
  const [selectedBook, setSelectedBook] = useState('');
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading indicator

  const [messageInput, setMessageInput] = useState('');

  const sendMessage = (message) => {
    setIsLoading(true); // Set loading indicator to true when sending message
    setMessageInput(''); // Clear message input field
    setMessageHistory([...messageHistory, { user: 'You', content: message }]);
    setTimeout(() => {
      setMessageHistory([...messageHistory, { user: 'Maruti', content: `Sure, how can I help you with that ${message}?` }]);
      setIsLoading(false); // Set loading indicator to false when reply received
    }, 1000);
  };

  const handleBookSelection = (event) => {
    setSelectedBook(event.target.value);
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    console.log('Selected files:', files);
  };

  return (
    <div style={{ position: 'relative', backgroundColor: 'white', minHeight: '100vh', borderRadius: '10px' }}>
      <AppBar position="static" color="primary" sx={{ borderRadius: '10px', height: '50px' }}>
        <Stack direction="row" alignItems="center" >
          <Avatar alt="Maruti" src={chatbot} sx={{ ml: '2px' }} />
          <Typography variant="h4" noWrap component="div" color="white" sx={{ p: 2 }}>
            MARUTI
          </Typography>
        </Stack>
      </AppBar>
      <IconButton onClick={() => setOpen(!open)} sx={{ mt: 2, position: 'absolute', left: '0' }}>
        <KeyboardArrowRightIcon />
      </IconButton>
      <Grid container spacing={1} sx={{ maxHeight: 'calc(100vh-64px)', marginTop: '20px', marginLeft: open ? '80px' : 'auto' }}>
        <Grid item xs={2}>
          <Paper style={{ height: '100vh', overflowY: 'auto', display: open ? 'block' : 'none' }}>
            <Collapse in={open}>
              <input
                accept=".pdf"
                id="upload-file"
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                Upload the Book
              </Typography>
              <Stack direction="row" alignItems="center">
                <label htmlFor="upload-file">
                  <Button variant="contained" component="span" sx={{ mt: 2 }}>
                    <Avatar sx={{ marginRight: '8px' }}>
                      <FolderIcon />
                    </Avatar>
                    Browse File
                  </Button>
                </label>
              </Stack>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel id="book-select-label">Choose Your Book</InputLabel>
                <Select
                  labelId="book-select-label"
                  id="book-select"
                  value={selectedBook}
                  onChange={handleBookSelection}
                  label="Choose Your Book"
                >
                  <MenuItem value="">Select Book</MenuItem>
                  <MenuItem value="book1">Book 1</MenuItem>
                  <MenuItem value="book2">Book 2</MenuItem>
                  <MenuItem value="book3">Book 3</MenuItem>
                </Select>
              </FormControl>
              {selectedBook && (
                <Typography variant="h6" gutterBottom sx={{ mt: 2, ml: 1 }}>
                  Ask your query from {selectedBook}
                </Typography>
              )}
            </Collapse>
          </Paper>
        </Grid>
        <Grid item xs={8} sx={{ color: 'white' }}>
          <Paper style={{ height: '100%', overflowY: 'auto', color: "white", borderRadius: '5px', backgroundColor: 'white' }}>
            <List dense>
              {messageHistory.map((message, index) => (
                <ListItem key={index} sx={{ borderRadius: '10px' }}>
                  {message.user === 'Maruti' && (
                    <ListItemAvatar>
                      <Avatar alt="Maruti" src={chatbot} />
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    primary={message.content}
                    secondary={message.user === 'You' ?
                      <Stack direction="row" justifyContent="flex-end" alignItems="center">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: grey[400], color: 'whitesmoke' }}>You</Avatar>
                        </ListItemAvatar>
                      </Stack> : ''}
                    sx={{
                      textAlign: message.user === 'You' ? 'right' : 'left',
                      color: message.user === 'Maruti' ? 'white' : 'black',
                      backgroundColor: message.user === 'You' ? 'white' : 'white',
                      borderRadius: '10px',
                    }}
                  />
                  {message.user === 'You' && (
                    <ListItemSecondaryAction>
                      <IconButton aria-label="delete">
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))}
            </List>
            {isLoading && ( // Show loading indicator when isLoading is true
              <div>Loading...</div>
            )}
          </Paper>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              width: { xs: 'calc(100% - 450px)', md: 'calc(100% - 590px)' },
              mt: 6,
              mb: 1,
              px: 2,
              justifyContent: 'flex-end',
              position: 'fixed',
              bottom: 0, // Stick to the bottom
              zIndex: 999, // Ensure it's above other content
            }}
          >
            <TextField
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              ref={messageInputRef}
              id="message-input"
              label="Type your message..."
              multiline
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => sendMessage(messageInput)}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ textAlign: 'right' }}
            />
          </Stack>

        </Grid>
      </Grid>
    </div>
  );
};

export default ChatBot;

