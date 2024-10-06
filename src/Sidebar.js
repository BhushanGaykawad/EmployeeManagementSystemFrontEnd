// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/close

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle the sidebar open state
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <div className="toggle-icon" onClick={toggleSidebar}>
                <i className={`fas ${isOpen ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
            </div>
            {isOpen && (
                <div>
                    <ul>
                        <li>
                            <Link to="/deptdetails">Department Details</Link>
                        </li>
                        <li>
                            <Link to="/roledetails">Role Details</Link>
                        </li>
                        <li>
                            <Link to="/employeedetails">Employee Details</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
