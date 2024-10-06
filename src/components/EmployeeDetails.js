import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import DataTable from 'react-data-table-component';
import UpdateEmployee from '../UpdateEmployee';
import DeleteEmployee from '../DeleteEmployee';
import CreateEmployee from '../CreateEmployee';
import Sidebar from '../Sidebar';

export default function EmployeeDetails() {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [filteredEmployeeDetails, setFilteredEmployeeDetails] = useState([]);
  const [error, setError] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedDeletedEmployeeId, setDeletedSelectedEmployeeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5270/api/Employee`);
        console.log("Response Data:", response.data);
        setEmployeeDetails(response.data);
        setFilteredEmployeeDetails(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError(error.message);
      }
    };
    getEmployee();
  }, []);

  useEffect(() => {
    const filteredData = employeeDetails.filter(employee =>
      employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeePhoneNumber.includes(searchTerm) ||
      employee.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.roleType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployeeDetails(filteredData);
  }, [searchTerm, employeeDetails]);

  const formatDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return "N/A"; 
    const dateParts = dateString.split('T');
    return dateParts.length > 0 ? dateParts[0] : "N/A"; 
  };

  const handleUpdate = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setShowUpdateForm(true);
  };

  const handleDelete = (employeeId) => {
    setDeletedSelectedEmployeeId(employeeId);
    setShowDeleteForm(true);
  };

  const columns = [
    {
      name: 'Employee ID',
      selector: row => row.employeeId,
      sortable: true,
      center: true,
      width: '100px',
    },
    {
      name: 'Employee Name',
      selector: row => row.employeeName,
      sortable: true,
      center: true,
      width: '150px',
    },
    {
      name: 'Employee Email',
      selector: row => row.employeeEmail,
      sortable: true,
      center: true,
      width: '200px',
    },
    {
      name: 'Employee Phone Number',
      selector: row => row.employeePhoneNumber,
      sortable: true,
      center: true,
      width: '150px',
    },
    {
      name: 'Employee Department',
      selector: row => row.departmentName,
      sortable: true,
      center: true,
      width: '150px',
    },
    {
      name: 'Employee Role',
      selector: row => row.roleType,
      sortable: true,
      center: true,
      width: '150px',
    },
    {
      name: 'Date Of Joining',
      selector: row => row.dateOfJoining,
      sortable: true,
      center: true,
      width: '150px',
      cell: row => formatDate(row.dateOfJoining),
    },
    {
      name: 'Employee Salary',
      selector: row => row.employeeSalary,
      sortable: true,
      center: true,
      width: '120px',
    },
    {
      name: 'Update',
      cell: row => (
        <button
          style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
          onClick={() => handleUpdate(row.employeeId)}
        >
          Update
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Delete',
      cell: row => (
        <button
          style={{ backgroundColor: '#f44336', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
          onClick={() => handleDelete(row.employeeId)}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    header: {
      style: {
        backgroundColor: '#0d6efd',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#0d6efd',
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        justifyContent: 'center',
        color: 'white',
      },
    },
    rows: {
      style: {
        backgroundColor: '#f5f5f5',
        '&:nth-of-type(odd)': {
          backgroundColor: '#f1f1f1',
        },
      },
    },
    cells: {
      style: {
        justifyContent: 'center',
      },
    },
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '240px', padding: '20px', flexGrow: 1 , width: '95vw'}}>
        <h2 style={{ textAlign: 'center', color: '#0d6efd' }}>Employee List</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {!showUpdateForm && !showDeleteForm && !showCreateForm && (
          <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search by Name, Email, Phone Number, Department, or Role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '300px',
                marginRight: '20px',
              }}
            />
            <button 
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setShowCreateForm(true)}
            >
              Create Employee
            </button>
          </div>
        )}

        {showCreateForm && (
          <CreateEmployee onClose={() => setShowCreateForm(false)} />
        )}

        {showUpdateForm ? (
          <UpdateEmployee employeeId={selectedEmployeeId} onClose={() => setShowUpdateForm(false)} />
        ) : showDeleteForm ? (
          <DeleteEmployee employeeId={selectedDeletedEmployeeId} onClose={() => setShowDeleteForm(false)} />
        ) : (
          <div style={{ overflowX: 'auto', marginTop: '20px',  width:'90%'}}>
            <DataTable
              columns={columns}
              data={filteredEmployeeDetails}
              customStyles={customStyles}
              pagination
              fixedHeader
              style={{ minWidth: '600px' }} // Set minimum width instead of max width
            />
          </div>
        )}
      </div>
    </div>
  );
}
