import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { Typography } from '@mui/material';
import loadingJson from '../../utils/paradoxLoader.json';

const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "Your time is limited, don't waste it living someone else's life.",
    "Paradox study makes studying easier. 📚",
    "When the Maruti goes high, it helps in solving any question.",
    "Universal concept coming soon! 🔍",
  ];
function LoadingParadox() {
  const [quote, setQuote] = useState(""); // Initialize with an empty string

  useEffect(() => {
    // Select a random quote when the component mounts
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);

    // Change quote every 3 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div style={styles.loaderContainer}>
      <div style={styles.content}>
        <Lottie loop animationData={loadingJson} play style={{ width: 150, height: 150 }} />
        <Typography variant="h2" style={styles.heading}>
          Paradox Study
        </Typography>
        <Typography variant="body1" style={styles.quote}>
          {quote}
        </Typography>
      </div>
    </div>
  );
}

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)' // Optional: for a semi-transparent background
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    marginTop: '20px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
  },
  quote: {
    marginTop: '10px',
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '0 20px',
  }
};

export default LoadingParadox;
