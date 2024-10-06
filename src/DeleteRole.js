import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateDepartment.css';
import axiosInstance from './axiosInstance';

const DeleteRole = ({ roleID, onClose }) => {
  const navigate = useNavigate(); // For redirecting after the update
  const [role, setRole] = useState({
      roleType:" ",
  });

  const [error, setError] = useState(null);

  // Fetch existing employee details using employeeId prop
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const response = await axiosInstance.get(`http://localhost:5270/api/Role/${roleID}`, {
          headers: {
            Authorization: `Bearer ${token}` // Attach the token here
          }
        });
        setRole(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setError('Could not fetch employee details.');
      }
    };

    if (roleID) {
        fetchRole();
    }
  }, [roleID]); // Add employeeId as a dependency

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(`Are you sure you want to delete department: ${role.roleType}?`);

    if (confirmDelete) {
        try {
          await axiosInstance.delete(`http://localhost:5270/api/Role/${roleID}`);
          navigate('/roledetails'); 
          onClose(); 
        } catch (error) {
          console.error('Error deleting employee:', error);
          setError('Could not delete employee details.');
        }
      }
  };

  return (
    <div className="update-employee-container">
      <h2>Delete Role</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleFormSubmit} className="department-form">
                <div className="form-group">
                    <label htmlFor="departmentName">Name</label>
                    <input
                        type="text"
                        id="roleType"
                        name="roleType"
                        value={role.roleType}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Delete Role</button>
            </form>
    </div>
  );
};

export default DeleteRole;
