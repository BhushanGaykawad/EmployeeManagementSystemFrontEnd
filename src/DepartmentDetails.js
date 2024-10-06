import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Ensure this is correctly pointing to your Axios instance
import DataTable from 'react-data-table-component';
import UpdatedDepartment from './UpdateDepartment';
import DeleteDepartment from './DeleteDepartment';
import Sidebar from './Sidebar';
import CreateDepartment from './CreateDepartment';
import { useNavigate } from 'react-router-dom';

export default function DepartmentDetails() {
  const [departmentDetails, setDepartmentDetails] = useState([]);
  const [filteredDepartmentDetails, setFilteredDepartmentDetails] = useState([]);
  const [error, setError] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedDeletedDepartmentId, setSelectedDeletedDepartmentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false); // State for create form visibility
  const navigate = useNavigate();

  const getDepartment = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:5270/api/Department'); // Adjust the endpoint to get departments
      console.log("Response Data:", response.data); // Log the full response
      setDepartmentDetails(response.data);
      setFilteredDepartmentDetails(response.data); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching department data:", error); // Log the error
      setError(error.message);
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  useEffect(() => {
    // Filter department details based on the search term
    const filteredData = departmentDetails.filter(department =>
      department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartmentDetails(filteredData);
  }, [searchTerm, departmentDetails]);

  // Add Update and Delete button actions
  const handleUpdate = (departmentId) => {
    setSelectedDepartmentId(departmentId);
    setShowUpdateForm(true);
  };

  const handleDelete = (departmentId) => {
    setSelectedDeletedDepartmentId(departmentId);
    setShowDeleteForm(true);
  };

  const handleCreate = () => {
    setShowCreateForm(true); 
  };

  // Define the columns for the DataTable
  const columns = [
    {
      name: 'Department ID',
      selector: row => row.departmentId, // Ensure you are using the correct field name
      sortable: true,
      center: true, // Center text alignment
    },
    {
      name: 'Department Name',
      selector: row => row.departmentName,
      sortable: true,
      center: true,
    },
    {
      name: 'Update', // Update button column
      cell: row => (
        <button
          style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
          onClick={() => handleUpdate(row.departmentId)}
        >
          Update
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Delete', // Delete button column
      cell: row => (
        <button
          style={{ backgroundColor: '#f44336', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
          onClick={() => handleDelete(row.departmentId)}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Custom styling for the table
  const customStyles = {
    header: {
      style: {
        backgroundColor: '#0d6efd', // Change header background color
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
        justifyContent: 'center', // Center align header
        color: 'white',
      },
    },
    rows: {
      style: {
        backgroundColor: '#f5f5f5', // Set alternate row colors
        '&:nth-of-type(odd)': {
          backgroundColor: '#f1f1f1',
        },
      },
    },
    cells: {
      style: {
        justifyContent: 'center', // Center align cells
      },
    },
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
    getDepartment(); // Refresh department details after creating a new department
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '230px', width: '1200px' }}>
        <h2 style={{ textAlign: 'center', color: '#0d6efd' }}>Department List</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {!showUpdateForm && !showDeleteForm && !showCreateForm && (
          <div style={{ margin: '20px 0' }}>
            <input
              type="text"
              placeholder="Search by Department Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '300px',
                marginLeft: '20px', // Margin to the left for spacing
                marginRight: '20px', // Margin to the right for spacing
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
              onClick={handleCreate}
            >
              Create Department
            </button>
          </div>
        )}

        {showCreateForm ? (
          <CreateDepartment onClose={handleCloseCreateForm} /> 
        ) : showUpdateForm ? (
          <UpdatedDepartment departmentId={selectedDepartmentId} onClose={() => setShowUpdateForm(false)} />
        ) : showDeleteForm ? (
          <DeleteDepartment departmentId={selectedDeletedDepartmentId} onClose={() => setShowDeleteForm(false)} />
        ) : (
          <DataTable
            title="Department Details"
            columns={columns}
            data={filteredDepartmentDetails} // Use filtered data for display
            pagination
            highlightOnHover
            pointerOnHover
            striped
            customStyles={customStyles} // Apply custom styles
          />
        )}
      </div>
    </div>
  );
}
