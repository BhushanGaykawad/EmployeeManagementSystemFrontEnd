import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateEmployee.css'; // Import CSS file
import axiosInstance from './axiosInstance';
import './CreateDepartment.css';

const UpdatedRole = ({ roleID, onClose }) => {
  const navigate = useNavigate(); // For redirecting after the update
  const [role, setrole] = useState({
   roleType:"",
  });

  const [error, setError] = useState(null);
  console.log(roleID);

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
        setrole(response.data);
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
    setrole({ ...role, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const token = localStorage.getItem('token'); 
      await axiosInstance.put(`http://localhost:5270/api/Role/${roleID}`, role, {
        headers: {
        //   Authorization: `Bearer ${token}` 
        }
      });
      navigate('/roledetails'); 
      onClose(); 
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Could not update employee details.');
    }
  };

  return (
    <div className="update-employee-container">
      <h2>Update Role</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleFormSubmit} className="department-form">
                <div className="form-group">
                    <label htmlFor="roleType">Role Type</label>
                    <input
                        type="text"
                        id="roleType"
                        name="roleType"
                        value={role.roleType}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Update Role</button>
            </form>
    </div>
  );
};

export default UpdatedRole;
