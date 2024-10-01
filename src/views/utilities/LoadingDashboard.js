import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { Typography } from '@mui/material';
//import dashboardLoaderJson from '../../utils/dashboardLoader.json'; // Lottie JSON for dashboard loader
import { Loader } from 'assets/images';

const quotes = [
    "Welcome to Paradox Study! 📚",
    "Get ready to dive deep into knowledge.",
    "Your learning journey begins now!",
    "Unlock new possibilities with Paradox Study.",
    "Innovating the way you study.",
    "We’re setting up your dashboard, please wait...",
    "Almost there, preparing your personalized study hub.",
    "Where knowledge meets innovation. 🚀",
    "Connecting you to infinite learning possibilities...",
    "The gateway to efficient learning is being prepared..."
];

const LoadingDashboard = () => {
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
                <Lottie loop animationData={Loader} play style={{ width: 150, height: 150 }} />
                <Typography variant="h4" style={styles.heading}>
                    Welcome To Paradox Study...
                </Typography>
                <Typography variant="body1" style={styles.quote}>
                    {quote}
                </Typography>
            </div>
        </div>
    );
};

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
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: for a semi-transparent background
        zIndex: 9999 // Ensure the loader appears on top
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heading: {
        marginTop: '20px',
        color: '#555',
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

export default LoadingDashboard;
