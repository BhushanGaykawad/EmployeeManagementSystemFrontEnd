import React from 'react';
import './HomePage.css';
import Login from './Login';

const HomePage = () => {
    const headingStyle = {
        fontFamily: "'Pacifico', cursive",
        fontSize: '4rem',
        color: '#4a90e2',
        background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), 0 0 10px #4a90e2, 0 0 20px #4a90e2',
        letterSpacing: '5px',
        wordSpacing: '10px',
        cursor: 'pointer',
    };

    return (
        <div className="container">
            <div className="left-side">
                <h1 style={headingStyle}>Employee Management System</h1>
            </div>
            <div className="right-side">
                <div className="login-box">
                    <h2>Login</h2>
                    <Login /> {/* Directly include Login component here */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
