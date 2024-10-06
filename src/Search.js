import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from './axiosInstance';

const EmployeeSearch = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setEmployeeId(e.target.value);
  };

  // Fetch employee details
  const fetchEmployee = async () => {
    setError(null); 
    try {
      const response = await axiosInstance.get(`http://localhost:5270/api/Employee/${employeeId}`); // Adjust URL accordingly
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
      setError('Could not fetch employee details. Please check the employee ID.');
      setEmployee(null); // Reset employee data on error
    }
  };

  return (
    <div>
      <h2>Search Employee by ID</h2>
      <input
        type="number"
        placeholder="Enter Employee ID"
        value={employeeId}
        onChange={handleChange}
        required
      />
      <button onClick={fetchEmployee}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {employee && (
        <div>
          <h3>Employee Details</h3>
          <p><strong>Employee ID:</strong> {employee.employeeId}</p>
          <p><strong>Name:</strong> {employee.employeeName}</p>
          <p><strong>Email:</strong> {employee.employeeEmail}</p>
          <p><strong>Phone Number:</strong> {employee.employeePhoneNumber}</p>
          <p><strong>Department ID:</strong> {employee.employeeDepartmentId}</p>
          <p><strong>Role ID:</strong> {employee.employeeRoleId}</p>
          <p><strong>Date of Joining:</strong> {employee.dateOfJoining}</p>
          <p><strong>Salary:</strong> {employee.employeeSalary}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;
