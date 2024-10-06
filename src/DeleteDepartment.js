import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateDepartment.css';
import axiosInstance from './axiosInstance';

const DeleteDepartment = ({ departmentId, onClose }) => {
  const navigate = useNavigate(); // For redirecting after the update
  const [dept, setdept] = useState({
      departmentName:" ",
  });

  const [error, setError] = useState(null);

  // Fetch existing employee details using employeeId prop
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const response = await axiosInstance.get(`http://localhost:5270/api/Department/${departmentId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Attach the token here
          }
        });
        setdept(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setError('Could not fetch employee details.');
      }
    };

    if (departmentId) {
        fetchDepartment();
    }
  }, [departmentId]); // Add employeeId as a dependency

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdept({ ...dept, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(`Are you sure you want to delete department: ${dept.departmentName}?`);

    if (confirmDelete) {
        try {
          await axiosInstance.delete(`http://localhost:5270/api/Department/${departmentId}`);
          navigate('/deptdetails'); 
          onClose(); 
        } catch (error) {
          console.error('Error deleting employee:', error);
          setError('Could not delete employee details.');
        }
      }
  };

  return (
    <div className="update-employee-container">
      <h2>Delete Department</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleFormSubmit} className="department-form">
                <div className="form-group">
                    <label htmlFor="departmentName">Name</label>
                    <input
                        type="text"
                        id="departmentName"
                        name="departmentName"
                        value={dept.departmentName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Delete Department</button>
            </form>
    </div>
  );
};

export default DeleteDepartment;
