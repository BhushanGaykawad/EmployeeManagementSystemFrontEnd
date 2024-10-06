import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateEmployee.css'; // Import CSS file
import axiosInstance from './axiosInstance';
import './CreateDepartment.css';

const UpdatedDepartment = ({ departmentId, onClose }) => {
  const navigate = useNavigate(); // For redirecting after the update
  const [department, setdepartment] = useState({
   departmentName:"",
  });

  const [error, setError] = useState(null);
  console.log(departmentId);

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
        setdepartment(response.data);
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
    setdepartment({ ...department, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const token = localStorage.getItem('token'); 
      await axiosInstance.put(`http://localhost:5270/api/Department/${departmentId}`, department, {
        headers: {
        //   Authorization: `Bearer ${token}` 
        }
      });
      navigate('/deptdetails'); 
      onClose(); 
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Could not update employee details.');
    }
  };

  return (
    <div className="update-employee-container">
      <h2>Update Deparment</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleFormSubmit} className="department-form">
                <div className="form-group">
                    <label htmlFor="departmentName">Name</label>
                    <input
                        type="text"
                        id="departmentName"
                        name="departmentName"
                        value={department.departmentName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Create Department</button>
            </form>
    </div>
  );
};

export default UpdatedDepartment;
