import React, { useState } from 'react';
import axiosInstance from './axiosInstance';
import './CreateDepartment.css'; // Import the CSS file
import { Navigate, useNavigate } from 'react-router-dom';

export default function CreateRole({onClose}) {
    const [roleData, setroleData] = useState({
        roleType: "" 
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    let navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setroleData({
            ...roleData,
            [name]: value
        });
    };
    const handleCancel = (e) => {
     
        onClose();
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(`/Role`, roleData);
            if (response.status === 200 || response.status === 201) {
                setSuccess("role Created Successfully");
                setError('');
                setroleData({
                    roleType: ""
                });
                navigate(`/roledetails`);
            } else {
                setError("Failed to create role.");
                setSuccess("");
            }
        } catch (error) {
            setError("An error occurred while creating the role.");
        }
    };

    return (
        <div className="create-department-container">
            <h2>Create New Role</h2> {/* Update the heading */}
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleFormSubmit} className="department-form">
                <div className="form-group">
                    <label htmlFor="roleType">Role Type</label>
                    <input
                        type="text"
                        id="roleType"
                        name="roleType"
                        value={roleData.roleType}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Create Role</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>

            </form>
        </div>
    );
}
