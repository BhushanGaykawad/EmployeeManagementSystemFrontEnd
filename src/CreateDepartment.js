import React, { useState } from 'react';
import axiosInstance from './axiosInstance';
import './CreateDepartment.css'; // Import the CSS file

export default function CreateDepartment({onClose}) {
    const [departmentData, setDepartmentData] = useState({
        departmentName: "" // Ensure this is correctly initialized
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCancel = (e) => {
        // e.preventDefault();
        // navigate('/employeedetails');
        onClose();// Navigate back to the employee details route
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartmentData({
            ...departmentData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(`http://localhost:5270/api/Department`, departmentData);
            if (response.status === 200 || response.status === 201) {
                setSuccess("Department Created Successfully");
                setError('');
                setDepartmentData({
                    departmentName: "" // Resetting departmentName to an empty string
                });
            } else {
                setError("Failed to create Department.");
                setSuccess("");
            }
        } catch (error) {
            setError("An error occurred while creating the Department.");
        }
    };

    return (
        <div className="create-department-container">
            <h2>Create New Department</h2> {/* Update the heading */}
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleFormSubmit} className="department-form">
                <div className="form-group">
                    <label htmlFor="departmentName">Name</label>
                    <input
                        type="text"
                        id="departmentName"
                        name="departmentName"
                        value={departmentData.departmentName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Create Department</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}
