import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateEmployee.css'; // Import CSS file
import axiosInstance from './axiosInstance';

const UpdateEmployee = ({ employeeId, onClose }) => {
  const navigate = useNavigate(); // For redirecting after the update
  const [employee, setEmployee] = useState({
    employeeName: '',
    employeeEmail: '',
    employeePhoneNumber: '',
    employeeDepartmentId: '',
    employeeRoleId: '',
    dateOfJoining: '',
    employeeSalary: ''
  });

  const [error, setError] = useState(null);
  
  const [departments, setDepartments] = useState([]); 
  const [roles, setRoles] = useState([]);
  
  
  useEffect(() => {
    const fetchDepartments = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:5270/api/Department'); // Adjust the endpoint as necessary
            setDepartments(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
            setError("Failed to fetch departments.");
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:5270/api/Role'); // Adjust the endpoint as necessary
            setRoles(response.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
            setError("Failed to fetch roles.");
        }
    };

    fetchDepartments();
    fetchRoles();
}, []);

  // Fetch existing employee details using employeeId prop
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const response = await axiosInstance.get(`http://localhost:5270/api/Employee/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Attach the token here
          }
        });
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setError('Could not fetch employee details.');
      }
    };

    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]); // Add employeeId as a dependency

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const token = localStorage.getItem('token'); 
      await axiosInstance.put(`http://localhost:5270/api/Employee/${employeeId}`, employee, {
        headers: {
        //   Authorization: `Bearer ${token}` 
        }
      });
      navigate('/employeedetails'); 
      onClose(); 
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Could not update employee details.');
    }
  };

  return (
    <div className="update-employee-container">
      <h2>Update Employee</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="update-employee-form">
        <div className="form-group">
          <label>Employee Name:</label>
          <input
            type="text"
            name="employeeName"
            value={employee.employeeName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="employeeEmail"
            value={employee.employeeEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="employeePhoneNumber"
            value={employee.employeePhoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
                    <label htmlFor="employeeDepartmentId">Department</label>
                    <select
                        id="employeeDepartmentId"
                        name="employeeDepartmentId"
                        value={employee.employeeDepartmentId}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Department</option>
                        {departments.map(department => (
                            <option key={department.departmentId} value={department.departmentId}>
                                {department.departmentName} {/* Adjust according to your data structure */}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="employeeRoleId">Role</label>
                    <select
                        id="employeeRoleId"
                        name="employeeRoleId"
                        value={employee.employeeRoleId}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Role</option>
                        {roles.map(role => (
                            <option key={role.roleID} value={role.roleID}>
                                {role.roleType} {/* Adjust according to your data structure */}
                            </option>
                        ))}
                    </select>
                </div>
        <div className="form-group">
          <label>Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            value={employee.dateOfJoining.split('T')[0]} // Format the date for input
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Salary:</label>
          <input
            type="number"
            name="employeeSalary"
            value={employee.employeeSalary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Update Employee</button>
        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button> {/* Cancel button */}
      </form>
    </div>
  );
};

export default UpdateEmployee;
