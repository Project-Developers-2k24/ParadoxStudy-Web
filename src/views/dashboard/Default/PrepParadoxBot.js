// import React, { useState, useRef, useEffect } from 'react';
// import {
//   AppBar,
//   Typography,
//   IconButton,
//   TextField,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Stack,
//   InputAdornment,
//   Button,
//   Collapse,
//   ListItemAvatar,
//   Avatar,
//   Card,
//   CardContent,
//   CircularProgress
// } from '@mui/material';
// import { useMediaQuery } from '@mui/material';
// import lottieJson from '../../../utils/Animation - 1716087479028.json';
// import Lottie from 'react-lottie-player';
// import Skeleton from '@mui/material/Skeleton';
// import parse from 'html-react-parser';
// import SendIcon from '@mui/icons-material/Send';
// import FolderIcon from '@mui/icons-material/Folder';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import { grey } from '@mui/material/colors';
// import { chatbot } from 'assets/images';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { Typewriter } from 'react-simple-typewriter';
// import { USERBYID } from 'api/auth';

// const ChatBot = () => {
//   const location = useLocation();
//   const pdfData = location.state ? location.state.pdfData : null;

//   const [chat, setChat] = useState([]);
//   const [messageHistory, setMessageHistory] = useState([]);
//   const [isBotTyping, setIsBotTyping] = useState(false); // State to track if the bot is typing
//   const [token, setToken] = useState('');
//   const [data, setData] = useState([]);
//   const [userDataLoading, setUserDataLoading] = useState(false);
//   const isSmallScreen = useMediaQuery('(max-width:786px)');
//   const getUser = async () => {
//     const token = localStorage.getItem('token');
//     setToken(token);
//     try {
//       setUserDataLoading(true);
//       const res = await axios.get(USERBYID, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       // Check the status code
//       if (res.status === 200) {
//         setUserDataLoading(false);
//         console.log('Success! User data retrieved:', res.data);
//         setData(res.data);
//       } else {
//         console.log('Error:', res.status);
//         // Handle other status codes if needed
//       }
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);
//   const sendMessage = async (message) => {
//     if (message.trim() === '') return;

//     setIsLoading(true); // Show loading indicator

//     setMessageInput('');
//     setMessageHistory([...messageHistory, { user: 'You', content: message }]);
//     // setIsBotTyping(true); // Set bot typing state to true

//     try {
//       const formData = new FormData();
//       formData.append('question', message);
//       formData.append('selected_book', pdfData.docs_name);
//       formData.append('chatId', pdfData.userId);
//       const res = await axios.post('https://projectdev2114.azurewebsites.net/api/user/ask', formData);
//       console.log(res.data);

//       // Simulate typing delay before showing bot's response
//       // setTimeout(() => {
//       //   setMessageHistory((prevMessages) => [...prevMessages, { user: 'Maruti', content: 'Typing...' }]);
//       // }, 500); // Adjust delay time as needed

//       // Show bot's response after a delay
//       setTimeout(() => {
//         let formattedResponse;
//         if (Array.isArray(res.data.answer) && res.data.answer.length > 0) {
//           formattedResponse = res.data.answer.map((text) => ({
//             page: text.metadata.page,
//             content: parse(text.page_content)
//           }));
//         } else {
//           formattedResponse = [
//             {
//               page: 'N/A',
//               content: 'Please enter a relevant question from the document.'
//             }
//           ];
//         }
//         setMessageHistory((prevMessages) => [...prevMessages, { user: 'Maruti', content: formattedResponse }]);
//         // setIsBotTyping(false); // Set bot typing state to false
//         setIsLoading(false); // Hide loading indicator
//       }, 1500); // Adjust delay time as needed
//     } catch (error) {
//       console.error('Error sending message:', error);
//       // Handle error if message sending fails
//       setIsLoading(false); // Hide loading indicator
//     }
//   };

//   const getChatData = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('selected_book', pdfData.docs_name);
//       formData.append('chatId', pdfData.userId);

//       const res = await axios.post('https://projectdev2114.azurewebsites.net/api/user/getChats', formData);
//       console.log(res.data);
//       setChat(res.data.chats); // Assuming the chat data is returned in a property called "chats"
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getChatData();
//   }, []);
//   useEffect(() => {
//     // Scroll to the bottom of the page when message history changes
//     window.scrollTo(0, document.body.scrollHeight);
//   }, [messageHistory]);

//   useEffect(() => {
//     if (chat.length > 0) {
//       const formattedMessages = chat
//         // .filter((chatItem) => chatItem.text && chatItem.text.length > 0) // Filter out blank or irrelevant messages
//         .map((chatItem) => {
//           if (chatItem.type === 'bot') {
//             if (Array.isArray(chatItem.text) && chatItem.text.length === 0) {
//               return {
//                 user: 'Maruti',
//                 content: 'Please enter a relevant question.'
//               };
//             } else {
//               return {
//                 user: 'Maruti',
//                 content: Array.isArray(chatItem.text)
//                   ? chatItem.text.map((text) => ({ page: text.metadata.page, content: parse(text.page_content) }))
//                   : [{ page: chatItem.text.metadata.page, content: parse(chatItem.text.page_content) }]
//               };
//             }
//           } else {
//             return {
//               user: 'You',
//               content: chatItem.text
//             };
//           }
//         });
//       setMessageHistory((prevMessages) => [...prevMessages, ...formattedMessages]);
//     }
//   }, [chat]);

//   const TypingResponse = ({ text }) => {
//     const [isVisible, setIsVisible] = useState(false);

//     useEffect(() => {
//       const timer = setTimeout(() => {
//         setIsVisible(true);
//       }, 500); // Adjust delay time as needed

//       return () => clearTimeout(timer);
//     }, []);

//     return (
//       <Typewriter
//         words={[text]} // Array containing the text to be typed
//         loop={false} // Do not loop typing animation
//         cursor
//         cursorStyle="_"
//         typeSpeed={50} // Typing speed (characters per second)
//         deleteSpeed={0} // Speed of deleting characters (characters per second)
//         delaySpeed={1000} // Delay between typing and deleting (milliseconds)
//       />
//     );
//   };
//   const messageInputRef = useRef(null);
//   const [selectedBook, setSelectedBook] = useState('');
//   const [open, setOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const [messageInput, setMessageInput] = useState('');

//   // const sendMessage = (message) => {
//   //   if (message.trim() === '') return; // Do not send empty messages
//   //   setIsLoading(true);
//   //   setMessageInput('');
//   //   setMessageHistory([...messageHistory, { user: 'You', content: message }]);
//   //   setTimeout(() => {
//   //     setMessageHistory([...messageHistory, { user: 'Maruti', content: `Sure, how can I help you with that ${message}?` }]);
//   //     setIsLoading(false);
//   //   }, 1000);
//   // };

//   const handleBookSelection = (event) => {
//     setSelectedBook(event.target.value);
//   };

//   const handleFileUpload = (event) => {
//     const files = event.target.files;
//     console.log('Selected files:', files);
//   };

//   return (
//     <div style={{ position: 'relative', backgroundColor: 'white', minHeight: '100vh', borderRadius: '10px', padding: '10px' }}>
//       <AppBar position="static" color="primary" sx={{ borderRadius: '10px', height: '50px', marginBottom: '10px' }}>
//         <Stack direction="row" alignItems="center">
//           {userDataLoading ? (
//             <Skeleton variant="cirlce" width={20} height={40} />
//           ) : (
//             <Avatar alt="Maruti" src={chatbot} sx={{ ml: '2px' }} />
//           )}
//           <Typography variant="h4" noWrap component="div" color="white" sx={{ p: 2 }}>
//             MARUTI :
//           </Typography>
//           <Typography variant="h3" noWrap component="div" color="purple" sx={{ p: 2 }}>
//             Document - {pdfData.docs_name}
//           </Typography>
//         </Stack>
//       </AppBar>
//       {/* <IconButton onClick={() => setOpen(!open)} sx={{ mt: 2, position: 'absolute', left: '0' }}>
//         <KeyboardArrowRightIcon />
//       </IconButton> */}
//       <Grid container spacing={1} sx={{ marginTop: '20px', marginBottom: '100px', flexDirection: 'row', justifyContent: 'center' }}>
//         {/* <Grid item xs={12} sm={open ? 3 : 2} md={2}>
//           <Paper style={{ height: '100vh', overflowY: 'auto', display: open ? 'block' : 'none' }}>
//             <Collapse in={open}>
//               <input accept=".pdf" id="upload-file" multiple type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
//               <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
//                 Upload the Book
//               </Typography>
//               <Stack direction="row" alignItems="center">
//                 <label htmlFor="upload-file">
//                   <Button variant="contained" component="span" sx={{ mt: 2 }}>
//                     <Avatar sx={{ marginRight: '8px' }}>
//                       <FolderIcon />
//                     </Avatar>
//                     Browse File
//                   </Button>
//                 </label>
//               </Stack>
//               <FormControl fullWidth sx={{ mt: 3 }}>
//                 <InputLabel id="book-select-label">Choose Your Book</InputLabel>
//                 <Select
//                   labelId="book-select-label"
//                   id="book-select"
//                   value={selectedBook}
//                   onChange={handleBookSelection}
//                   label="Choose Your Book"
//                 >
//                   <MenuItem value="">Select Book</MenuItem>
//                   <MenuItem value="book1">Book 1</MenuItem>
//                   <MenuItem value="book2">Book 2</MenuItem>
//                   <MenuItem value="book3">Book 3</MenuItem>
//                 </Select>
//               </FormControl>
//               {selectedBook && (
//                 <Typography variant="h6" gutterBottom sx={{ mt: 2, ml: 1 }}>
//                   Ask your query from {selectedBook}
//                 </Typography>
//               )}
//             </Collapse>
//           </Paper>
//         </Grid> */}
//         <Grid item xs={12} sm={open ? 9 : 10}>
//           <Paper style={{ height: '100%', overflowY: 'auto', borderRadius: '5px', backgroundColor: 'white' }}>
//             <List dense>
//               {messageHistory.map((message, index) => (
//                 <React.Fragment key={index}>
//                   <ListItem sx={{ borderRadius: '10px', flexDirection: isSmallScreen ? 'column' : 'row' }}>
//                     {/* Display Maruti's avatar if the message is from Maruti */}
//                     {message.user === 'Maruti' && !isSmallScreen && (
//                       <ListItemAvatar>
//                         <Avatar
//                           alt="Maruti"
//                           src={chatbot}
//                           style={{
//                             height: '40px',
//                             width: '40px'
//                           }}
//                         />
//                       </ListItemAvatar>
//                     )}
//                     {message.user === 'Maruti' && isSmallScreen && (
//                       <ListItemAvatar>
//                         <Avatar
//                           alt="Maruti"
//                           src={chatbot}
//                           style={{
//                             height: '35px',
//                             width: '35px',
//                             justifyContent: 'flex-start',
//                             marginLeft: '-200%'
//                           }}
//                         />
//                       </ListItemAvatar>
//                     )}
//                     {/* Render message content */}
//                     <ListItemText
//                       primary={
//                         Array.isArray(message.content) ? (
//                           // If content is an array, map through it and display each text item in a Card component
//                           message.content.map((textItem, textIndex) => (
//                             <Card
//                               key={textIndex}
//                               sx={{
//                                 backgroundColor: message.user === 'You' ? 'lightgrey' : 'lightgrey',
//                                 marginBottom: 4, // Adjust margin for spacing between cards
//                                 borderRadius: '10px'
//                                 // marginLeft:"10%"
//                               }}
//                             >
//                               <CardContent>
//                                 {/* Display page number and content */}
//                                 <Typography variant="subtitle2" color="textSecondary" gutterBottom>
//                                   Page {textItem.page}
//                                 </Typography>
//                                 <Typography variant="body1">{textItem.content}</Typography>
//                               </CardContent>
//                             </Card>
//                           ))
//                         ) : (
//                           <>
//                             <div
//                               style={{
//                                 display: 'flex',
//                                 flexDirection: message.user === 'You' ? 'row' : 'column',
//                                 width: isSmallScreen && message.user === 'You' ? '320px' : '100%',
//                                 gap: '3%'
//                               }}
//                             >

//                               <Card
//                                 sx={{
//                                   backgroundColor: message.user === 'You' ? 'Black' : 'lightgrey',
//                                   marginBottom: 1.5, // Adjust margin for spacing between cards
//                                   borderRadius: '10px',
//                                   maxWidth: message.user === 'You' ? '100%' : '70%',
//                                   width: message.user === 'You' ? '100%' : '70%',
//                                   marginLeft: message.user === 'You' ? (isSmallScreen ? '30%' : '50%') : '50%'
//                                   // marginRight: message.user === 'You' ? '0%' : '20%'
//                                 }}
//                               >
//                                 <CardContent>
//                                   <Typography variant={isSmallScreen ? 'h6' : 'h4'} sx={{ color: 'white' }}>
//                                     {message.content}
//                                   </Typography>
//                                 </CardContent>
//                               </Card>
//                               <>
//                                 {
//                                   message.user === 'You' ? (
//                                     <Stack direction="row" justifyContent="center" alignItems="center">
//                                       <ListItemAvatar>
//                                         <div
//                                           style={{
//                                             marginLeft: '12px',
//                                             flexDirection: 'row',
//                                             justifyContent: 'center'
//                                           }}
//                                         >
//                                           {userDataLoading ? (
//                                             <Skeleton variant="cirlce" width={20} height={40} />
//                                           ) : (
//                                             <>
//                                               {isSmallScreen ? (
//                                                 <Avatar
//                                                   sx={{ bgcolor: grey[400], color: 'whitesmoke', fontSize: '20px' }}
//                                                   style={{
//                                                     height: '35px',
//                                                     width: '35px'
//                                                   }}
//                                                   src={data.data.avatar ? data.data.avatar : null}
//                                                 />
//                                               ) : (
//                                                 <Avatar
//                                                   sx={{ bgcolor: grey[400], color: 'whitesmoke', fontSize: '20px' }}
//                                                   style={{
//                                                     height: '40px',
//                                                     width: '40px'
//                                                   }}
//                                                   src={data.data.avatar ? data.data.avatar : null}
//                                                 />
//                                               )}
//                                             </>
//                                           )}
//                                         </div>
//                                         {userDataLoading ? (
//                                           <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: 'black' }}>
//                                             <Skeleton variant="text" />
//                                           </Typography>
//                                         ) : (
//                                           <Typography
//                                             variant="body1"
//                                             sx={{ whiteSpace: 'pre-wrap', color: 'black', fontSize: isSmallScreen ? '10px' : '15px' }}
//                                           >
//                                             {data.data.username}
//                                           </Typography>
//                                         )}
//                                       </ListItemAvatar>
//                                     </Stack>
//                                   ) : null // If the message is not from the user, secondary content is null
//                                 }
//                               </>
//                             </div>
//                           </>
//                           // If content is not an array, render it as a Typography component
//                         )
//                       }
//                       sx={{
//                         // Align text based on the message sender
//                         textAlign: message.user === 'You' ? 'right' : 'left',
//                         color: 'black',
//                         borderRadius: '10px'
//                       }}
//                     />
//                     {/* Display delete button for messages from the user */}
//                     {message.user === 'You' && (
//                       <ListItemSecondaryAction>
//                         <IconButton aria-label="delete"></IconButton>
//                       </ListItemSecondaryAction>
//                     )}
//                   </ListItem>
//                 </React.Fragment>
//               ))}
//             </List>

//             {isLoading && ( // Show loading indicator when isLoading is true
//               <Lottie loop animationData={lottieJson} play style={{ width: 150, height: 150 }} />
//             )}
//           </Paper>

//           <Stack
//             direction="row"
//             alignItems="center"
//             justifyContent="center"
//             position="fixed" // Fixed position
//             bottom={0} // Stick to the bottom
//             width={isSmallScreen ? '83%' : '69%'} // Full width
//             marginRight={20}
//             zIndex={999} // Ensure it's above other content
//             backgroundColor="white"
//             borderRadius={10}
//             padding={2} // Add padding for better spacing
//             sx={{
//               '@media (max-width: 600px)': {
//                 // Adjust stack direction for small screens
//                 flexDirection: 'column'
//               }
//             }}
//           >
//             <TextField
//               variant="outlined"
//               placeholder="Enter your query"
//               value={messageInput}
//               onChange={(e) => setMessageInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   sendMessage(messageInput);
//                 }
//               }}
//               fullWidth
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton edge="end" color="primary" onClick={() => sendMessage(messageInput)}>
//                       {isLoading ? <CircularProgress /> : <SendIcon />}
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//               sx={{
//                 '& .MuiInputBase-root': {
//                   borderRadius: '10px',
//                   backgroundColor: 'white'
//                 },
//                 '& .Mui-focused fieldset': {
//                   borderColor: 'white'
//                 }
//               }}
//             />
//           </Stack>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default ChatBot;

import React, { useState, useRef, useEffect } from 'react';
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
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import lottieJson from '../../../utils/Animation - 1716087479028.json';
import Lottie from 'react-lottie-player';
import Skeleton from '@mui/material/Skeleton';
import parse from 'html-react-parser';
import SendIcon from '@mui/icons-material/Send';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { grey } from '@mui/material/colors';
import { chatbot } from 'assets/images';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { pdfjs, Document, Page } from 'react-pdf';
import { Typewriter } from 'react-simple-typewriter';
import { USERBYID } from 'api/auth';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import MinimizeIcon from '@mui/icons-material/Minimize';
import { px } from 'framer-motion';
import LoadingParadox from 'views/utilities/LoadingParadox';
import { useQuery } from 'react-query';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const ChatBot = () => {
  const location = useLocation();
  function copyCode(button) {
    const codeBlock = button.parentElement.nextElementSibling.firstElementChild;
    const range = document.createRange();
    range.selectNodeContents(codeBlock);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    alert('Code copied to clipboard!');
  }

  const pdfData = location.state ? location.state.pdfData : null;

  const [chat, setChat] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false); // State to track if the bot is typing
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isChatLoading, setIsChatLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isSmallScreen = useMediaQuery('(max-width:786px)');

  const getUser = async () => {
    const token = localStorage.getItem('token');
    setToken(token);
    try {
      setUserDataLoading(true);
      const res = await axios.get(USERBYID, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Check the status code
      if (res.status === 200) {
        setUserDataLoading(false);
        console.log('Success! User data retrieved:', res.data);
        setData(res.data);
      } else {
        console.log('Error:', res.status);
        // Handle other status codes if needed
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const sendMessage = async (message) => {
    if (message.trim() === '') return;

    setIsLoading(true); // Show loading indicator

    setMessageInput('');
    setMessageHistory([...messageHistory, { user: 'You', content: message }]);
    // setIsBotTyping(true); // Set bot typing state to true

    try {
      const formData = new FormData();
      formData.append('question', message);
      formData.append('selected_book', pdfData.docs_name);
      formData.append('chatId', pdfData.userId);
      const res = await axios.post('https://projectdev2114.azurewebsites.net/api/user/ask', formData);
      console.log(res.data);

      // Simulate typing delay before showing bot's response
      // setTimeout(() => {
      //   setMessageHistory((prevMessages) => [...prevMessages, { user: 'Maruti', content: 'Typing...' }]);
      // }, 500); // Adjust delay time as needed

      // Show bot's response after a delay
      setTimeout(() => {
        let formattedResponse;
        if (Array.isArray(res.data.answer) && res.data.answer.length > 0) {
          formattedResponse = res.data.answer.map((text) => ({
            page: text.metadata.page,
            content: parse(text.page_content)
          }));
        } else {
          formattedResponse = [
            {
              page: 'N/A',
              content: 'Please enter a relevant question from the document.'
            }
          ];
        }
        setMessageHistory((prevMessages) => [...prevMessages, { user: 'Maruti', content: formattedResponse }]);
        // setIsBotTyping(false); // Set bot typing state to false
        setIsLoading(false); // Hide loading indicator
      }, 1500); // Adjust delay time as needed
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error if message sending fails
      setIsLoading(false); // Hide loading indicator
    }
  };

  const getChatData = async (page) => {
    const formData = new FormData();
    formData.append('selected_book', pdfData.docs_name);
    formData.append('chatId', pdfData.userId);
    formData.append('page', page);
    formData.append('limit', 16);

    const res = await axios.post('https://projectdev2114.azurewebsites.net/api/user/getChats', formData);
    return res.data;
  };

  const {
    data: chatData,
    isLoading: isChatLoading,
    error: chatError,
    refetch: refetchChat
  } = useQuery(
    ['chatData', currentPage], // Query key, including currentPage as a dependency
    () => getChatData(currentPage), // Fetch function
    {
      enabled: !!pdfData, // Enable the query only if pdfData exists
      refetchOnWindowFocus: false // Disable automatic refetching on window focus
    }
  );

  useEffect(() => {
    // Update local state or perform other actions based on chatData, isChatLoading, or chatError
    if (chatData) {
      setChat(chatData.chats); // Assuming chat data is stored in 'chats' property
      setCurrentPage(chatData.currentPage);
      setTotalPages(chatData.totalPages);
    }
  }, [chatData, isChatLoading, chatError]); // Dependency array to watch for changes

  useEffect(() => {
    // Scroll to the bottom of the page when the component initially renders
    if (currentPage == 1) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [messageHistory, currentPage]); // Empty dependency array ensures this effect runs only once
  useEffect(() => {
    // Function to handle scrolling to the top of the chat window
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop === 0 && currentPage < totalPages) {
        // If the user scrolls to the top and there are more pages available
        setCurrentPage((prevPage) => prevPage + 1); // Update the current page to fetch more data
      }
    };

    // Add event listener to detect scrolling
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up event listener
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, totalPages]);

  useEffect(() => {
    // Fetch additional chat data when the current page changes
    if (currentPage > 0) {
      getChatData(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (chat.length > 0) {
      const formattedMessages = chat.map((chatItem) => {
        if (chatItem.type === 'bot') {
          if (Array.isArray(chatItem.text) && chatItem.text.length === 0) {
            return {
              user: 'Maruti',
              content: 'Please enter a relevant question.'
            };
          } else {
            return {
              user: 'Maruti',
              content: Array.isArray(chatItem.text)
                ? chatItem.text.map((text) => ({ page: text.metadata.page, content: parse(text.page_content) }))
                : [{ page: chatItem.text.metadata.page, content: parse(chatItem.text.page_content) }]
            };
          }
        } else {
          return {
            user: 'You',
            content: chatItem.text
          };
        }
      });
      setMessageHistory((prevMessages) => [...formattedMessages, ...prevMessages]);
    }
  }, [chat]);

  const TypingResponse = ({ text }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500); // Adjust delay time as needed

      return () => clearTimeout(timer);
    }, []);

    return (
      <Typewriter
        words={[text]} // Array containing the text to be typed
        loop={false} // Do not loop typing animation
        cursor
        cursorStyle="_"
        typeSpeed={50} // Typing speed (characters per second)
        deleteSpeed={0} // Speed of deleting characters (characters per second)
        delaySpeed={1000} // Delay between typing and deleting (milliseconds)
      />
    );
  };
  const messageInputRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [numPages, setNumPages] = useState(null);

  // const sendMessage = (message) => {
  //   if (message.trim() === '') return; // Do not send empty messages
  //   setIsLoading(true);
  //   setMessageInput('');
  //   setMessageHistory([...messageHistory, { user: 'You', content: message }]);
  //   setTimeout(() => {
  //     setMessageHistory([...messageHistory, { user: 'Maruti', content: `Sure, how can I help you with that ${message}?` }]);
  //     setIsLoading(false);
  //   }, 1000);
  // };

  // Function to handle opening the PDF dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Function to handle closing the PDF dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Function to zoom in the PDF
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  // Function to zoom out the PDF
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(0.1, prevZoom - 0.1));
  };

  // Function to set the number of pages in the PDF
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Existing functions and states...

  // Function to handle opening the sidebar
  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  // Function to handle closing the sidebar
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // Function to handle opening the PDF using a dialog box
  const handleOpenPDF = () => {
    // Add code to open the PDF using a dialog box
    handleOpenDialog();
  };

  return (
    <>
      {isChatLoading && currentPage == 1 ? (
        <LoadingParadox />
      ) : (
        <div style={{ position: 'relative', backgroundColor: 'white', minHeight: '100vh', borderRadius: '10px', padding: '10px' }}>
          <AppBar position="static" color="primary" sx={{ borderRadius: '10px', height: '50px', marginBottom: '10px' }}>
            <Stack direction="row" alignItems="center">
              {userDataLoading ? (
                <Skeleton variant="cirlce" width={20} height={40} />
              ) : (
                <Avatar alt="Maruti" src={chatbot} sx={{ ml: '2px' }} />
              )}
              <Typography variant="h4" noWrap component="div" color="white" sx={{ p: 2 }}>
                MARUTI :
              </Typography>
              <Typography variant="h3" noWrap component="div" color="purple" sx={{ p: 2 }}>
                Sub - {pdfData.type} : File - {pdfData.filename}
              </Typography>
            </Stack>
          </AppBar>
          {/* <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} sx={{ mt: 2, position: 'absolute', left: '0' }}>
      <KeyboardArrowRightIcon />
    </IconButton> */}
          <Grid container spacing={1} sx={{ marginTop: '20px', marginBottom: '100px', flexDirection: 'row', justifyContent: 'center' }}>
            {/* <Grid item xs={12} sm={open ? 3 : 2} md={2}>
        <Paper style={{ height: '100vh', overflowY: 'auto', display: sidebarOpen ? 'block' : 'none' }}>
        <Collapse in={sidebarOpen}>
        <Button onClick={handleOpenPDF} variant="contained" color="primary">
          Open PDF
         </Button>
          </Collapse>
        </Paper>
      </Grid> */}

            <Grid item xs={12} sm={open ? 9 : 10}>
              <Paper style={{ height: '102%', overflowY: 'auto', borderRadius: '5px', backgroundColor: 'white' }}>
                {isChatLoading && (
                  <div style={{ textAlign: 'center', margin: '10px' }}>
                    <CircularProgress color="primary" />
                  </div>
                )}
                <List dense>
                  {messageHistory.map((message, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ borderRadius: '10px', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                        {/* Display Maruti's avatar if the message is from Maruti */}
                        {message.user === 'Maruti' && !isSmallScreen && (
                          <ListItemAvatar>
                            <Avatar
                              alt="Maruti"
                              src={chatbot}
                              style={{
                                height: '40px',
                                width: '40px'
                              }}
                            />
                          </ListItemAvatar>
                        )}
                        {message.user === 'Maruti' && isSmallScreen && (
                          <ListItemAvatar>
                            <Avatar
                              alt="Maruti"
                              src={chatbot}
                              style={{
                                height: '35px',
                                width: '35px',
                                justifyContent: 'flex-start',
                                marginLeft: '-200%'
                              }}
                            />
                          </ListItemAvatar>
                        )}
                        {/* Render message content */}
                        <ListItemText
                          primary={
                            Array.isArray(message.content) ? (
                              // If content is an array, map through it and display each text item in a Card component
                              message.content.map((textItem, textIndex) => (
                                <Card
                                  key={textIndex}
                                  sx={{
                                    backgroundColor: message.user === 'You' ? 'lightgrey' : 'lightgrey',
                                    marginBottom: 4, // Adjust margin for spacing between cards
                                    borderRadius: '10px'
                                    // marginLeft:"10%"
                                  }}
                                >
                                  <CardContent>
                                    {/* Display page number and content */}
                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                      Page {textItem.page}
                                    </Typography>
                                    <Typography variant="body1">{textItem.content}</Typography>
                                  </CardContent>
                                </Card>
                              ))
                            ) : (
                              <>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: message.user === 'You' ? 'row' : 'column',
                                    width: isSmallScreen && message.user === 'You' ? '320px' : '100%',
                                    gap: '3%'
                                  }}
                                >
                                  <Card
                                    sx={{
                                      backgroundColor: message.user === 'You' ? 'Black' : 'lightgrey',
                                      marginBottom: 1.5, // Adjust margin for spacing between cards
                                      borderRadius: '10px',
                                      maxWidth: message.user === 'You' ? '100%' : '70%',
                                      width: message.user === 'You' ? '100%' : '70%',
                                      marginLeft: message.user === 'You' ? (isSmallScreen ? '30%' : '50%') : '50%'
                                      // marginRight: message.user === 'You' ? '0%' : '20%'
                                    }}
                                  >
                                    <CardContent>
                                      <Typography variant={isSmallScreen ? 'h6' : 'h4'} sx={{ color: 'white' }}>
                                        {/* <div dangerouslySetInnerHTML={{ __html: message.content }} /> */}
                                        {message.content}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                  <>
                                    {
                                      message.user === 'You' ? (
                                        <Stack direction="row" justifyContent="center" alignItems="center">
                                          <ListItemAvatar>
                                            <div
                                              style={{
                                                marginLeft: '12px',
                                                flexDirection: 'row',
                                                justifyContent: 'center'
                                              }}
                                            >
                                              {userDataLoading ? (
                                                <Skeleton variant="cirlce" width={20} height={40} />
                                              ) : (
                                                <>
                                                  {isSmallScreen ? (
                                                    <Avatar
                                                      sx={{ bgcolor: grey[400], color: 'whitesmoke', fontSize: '20px' }}
                                                      style={{
                                                        height: '35px',
                                                        width: '35px'
                                                      }}
                                                      src={data.data.avatar ? data.data.avatar : null}
                                                    />
                                                  ) : (
                                                    <Avatar
                                                      sx={{ bgcolor: grey[400], color: 'whitesmoke', fontSize: '20px' }}
                                                      style={{
                                                        height: '40px',
                                                        width: '40px'
                                                      }}
                                                      src={data.data.avatar ? data.data.avatar : null}
                                                    />
                                                  )}
                                                </>
                                              )}
                                            </div>
                                            {userDataLoading ? (
                                              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: 'black' }}>
                                                <Skeleton variant="text" />
                                              </Typography>
                                            ) : (
                                              <Typography
                                                variant="body1"
                                                sx={{ whiteSpace: 'pre-wrap', color: 'black', fontSize: isSmallScreen ? '10px' : '15px' }}
                                              >
                                                {data.data.username}
                                              </Typography>
                                            )}
                                          </ListItemAvatar>
                                        </Stack>
                                      ) : null // If the message is not from the user, secondary content is null
                                    }
                                  </>
                                </div>
                              </>
                              // If content is not an array, render it as a Typography component
                            )
                          }
                          sx={{
                            // Align text based on the message sender
                            textAlign: message.user === 'You' ? 'right' : 'left',
                            color: 'black',
                            borderRadius: '10px'
                          }}
                        />
                        {/* Display delete button for messages from the user */}
                        {message.user === 'You' && (
                          <ListItemSecondaryAction>
                            <IconButton aria-label="delete"></IconButton>
                          </ListItemSecondaryAction>
                        )}
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>

                {isLoading && ( // Show loading indicator when isLoading is true
                  <Lottie loop animationData={lottieJson} play style={{ width: 150, height: 150 }} />
                )}
              </Paper>

              {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          position="fixed" // Fixed position
          bottom={0} // Stick to the bottom
          width={isSmallScreen ? '83%' : '69%'} // Full width
          marginRight={20}
          zIndex={999} // Ensure it's above other content
          backgroundColor="white"
          borderRadius={10}
          padding={2} // Add padding for better spacing
          sx={{
            '@media (max-width: 600px)': {
              // Adjust stack direction for small screens
              flexDirection: 'column'
            }
          }}
        >
          <Button onClick={handleOpenDialog} variant="contained" color="primary"
           style={{
            position: 'fixed',
            bottom: '20px',
            left: '10px',
            zIndex: '1000'
          }}
          >
          Open PDF
        </Button>
          <TextField
            variant="outlined"
            placeholder="Enter your query"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(messageInput);
              }
            }}
            fullWidth
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" color="primary" onClick={() => sendMessage(messageInput)}>
                    {isLoading ? <CircularProgress /> : <SendIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '10px',
                backgroundColor: 'white'
              },
              '& .Mui-focused fieldset': {
                borderColor: 'white'
              }
            }}

          />
          
        </Stack> */}
              <Stack
                direction={isSmallScreen ? 'column' : 'row'}
                alignItems="center"
                justifyContent="center"
                position="fixed"
                bottom={0}
                width={isSmallScreen ? '100%' : '69%'}
                padding={2}
                zIndex={999}
                sx={{
                  '@media (max-width: 600px)': {
                    flexDirection: 'column'
                  }
                }}
              >
                <Button
                  onClick={handleOpenDialog}
                  variant="contained"
                  color="primary"
                  size="small" // Reduce button size
                  sx={{ marginRight: isSmallScreen ? 50 : 2 }} // Adjust margin for smaller screens
                >
                  Open PDF
                </Button>
                <TextField
                  variant="outlined"
                  placeholder="Enter your query"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage(messageInput);
                    }
                  }}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" color="primary" onClick={() => sendMessage(messageInput)}>
                          {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '10px',
                      backgroundColor: 'white'
                    },
                    '& .Mui-focused fieldset': {
                      borderColor: 'white'
                    }
                  }}
                />
              </Stack>
            </Grid>
          </Grid>

          <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>
              {pdfData.docs_name}
              <IconButton onClick={handleCloseDialog} sx={{ position: 'absolute', right: 6, top: 6 }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ width: isSmallScreen ? '90vw' : '80vw', height: isSmallScreen ? '70vh' : '80vh' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <IconButton onClick={handleZoomIn}>
                  <ZoomInIcon />
                </IconButton>
                <IconButton onClick={handleZoomOut}>
                  <ZoomOutIcon />
                </IconButton>
              </Stack>
              <Document file={pdfData.docs_url} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={zoomLevel} renderTextLayer={false} />
                ))}
              </Document>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default ChatBot;
