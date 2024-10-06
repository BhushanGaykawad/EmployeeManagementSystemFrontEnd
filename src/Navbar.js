import React from 'react';
import './Navbar.css'; // Ensure you have this CSS file for styling
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { isLoggedIn, LogoutUser } = useAuth();
    let navigate=useNavigate();
  
    const handleLogout = () => {
        LogoutUser();
        alert('Logged out successfully!'); 
        navigate('/home'); // Navigate to the home page after logout
    };

    return (
        <nav className="navbar">
            <ul>
            {isLoggedIn ? 'Welcome to Employee Management System' : 'Employee Management System'}
            </ul>
            <div className="sign-in-as">
                {isLoggedIn ? (
                    <>
                        <span>Signed In As: Admin</span> 
                        <button onClick={handleLogout}>Logout</button> 
                    </>
                ) : null} {/* No button when not logged in */}
            </div>
        </nav>
    );
};

export default Navbar;
