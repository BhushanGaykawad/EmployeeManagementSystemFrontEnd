import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import './CreateEmployee.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

export default function CreateEmployee({ onClose }) {
    const [employeeData, setEmployeeData] = useState({
        employeeName: "",
        employeeEmail: "",
        employeePhoneNumber: "",
        employeeDepartmentId: "", // Changed initial state to an empty string
        employeeRoleId: "", // Changed initial state to an empty string
        dateOfJoining: "",
        employeeSalary: null,
    });

    const [departments, setDepartments] = useState([]); // State for departments
    const [roles, setRoles] = useState([]); // State for roles
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

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

    // Function to handle the cancel button click
    const handleCancel = () => {
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value, // Store the selected value directly
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(`http://localhost:5270/api/Employee`, employeeData);
            if (response.status === 200 || response.status === 201) {
                setSuccess("Employee Created Successfully");
                setError('');
                // Reset the form data
                setEmployeeData({
                    employeeName: "",
                    employeeEmail: "",
                    employeePhoneNumber: "",
                    employeeDepartmentId: "", // Reset to an empty string
                    employeeRoleId: "", // Reset to an empty string
                    dateOfJoining: "",
                    employeeSalary: null,
                });
            } else {
                setError("Failed to create employee.");
                setSuccess("");
            }
        } catch (error) {
            setError("An error occurred while creating the employee.");
        }
    };

    return (
        <div className="create-employee-container">
            <h2>Create New Employee</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleFormSubmit} className="employee-form">
                <div className="form-group">
                    <label htmlFor="employeeName">Name</label>
                    <input
                        type="text"
                        id="employeeName"
                        name="employeeName"
                        value={employeeData.employeeName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="employeeEmail">Email</label>
                    <input
                        type="email"
                        id="employeeEmail"
                        name="employeeEmail"
                        value={employeeData.employeeEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="employeePhoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="employeePhoneNumber"
                        name="employeePhoneNumber"
                        value={employeeData.employeePhoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="employeeDepartmentId">Department</label>
                    <select
                        id="employeeDepartmentId"
                        name="employeeDepartmentId"
                        value={employeeData.employeeDepartmentId}
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
                        value={employeeData.employeeRoleId}
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
                    <label htmlFor="employeeSalary">Salary</label>
                    <input
                        type="number"
                        id="employeeSalary"
                        name="employeeSalary"
                        step="0.01"
                        value={employeeData.employeeSalary === null ? "" : employeeData.employeeSalary}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfJoining">Date Of Joining</label>
                    <input
                        type="date"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        value={employeeData.dateOfJoining}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Create Employee</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}
