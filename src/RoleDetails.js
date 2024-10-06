import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Ensure this is correctly pointing to your Axios instance
import DataTable from 'react-data-table-component';
import UpdatedRole from './UpdatedRole';
import DeleteRole from './DeleteRole';
import Sidebar from './Sidebar';
import CreateRole from './CreateRole'; // Import the CreateRole component

export default function RoleDetails() {
  const [roleDetails, setRoleDetails] = useState([]);
  const [filteredRoleDetails, setFilteredRoleDetails] = useState([]);
  const [error, setError] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedDeletedRoleId, setSelectedDeletedRoleId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // State for create form visibility
  const [searchTerm, setSearchTerm] = useState('');


  const getRole = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:5270/api/Role'); // Adjust the endpoint to get roles
      console.log("Response Data:", response.data); // Log the full response
      setRoleDetails(response.data);
      setFilteredRoleDetails(response.data); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching role data:", error); // Log the error
      setError(error.message);
    }
  };
  
  useEffect(() => {
   
    getRole();
  }, []);

  useEffect(() => {
    // Filter role details based on the search term
    const filteredData = roleDetails.filter(role =>
      role.roleType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoleDetails(filteredData);
  }, [searchTerm, roleDetails]);

  // Add Update and Delete button actions
  const handleUpdate = (roleId) => {
    setSelectedRoleId(roleId);
    setShowUpdateForm(true);
  };

  const handleDelete = (roleId) => {
    setSelectedDeletedRoleId(roleId);
    setShowDeleteForm(true);
  };

  const handleCreate = () => {
    setShowCreateForm(true); // Show the create form
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
    getRole(); // Refresh role details after creating a new role
  };

  // Define the columns for the DataTable
  const columns = [
    {
      name: 'Role ID',
      selector: row => row.roleID, // Ensure you are using the correct field name
      sortable: true,
      center: true, // Center text alignment
    },
    {
      name: 'Role Name',
      selector: row => row.roleType,
      sortable: true,
      center: true,
    },
    {
      name: 'Update', // Update button column
      cell: row => (
        <button
          style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
          onClick={() => handleUpdate(row.roleID)}
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
          onClick={() => handleDelete(row.roleID)}
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

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '230px', width: '1200px' }}>
        <h2 style={{ textAlign: 'center', color: '#0d6efd' }}>Role List</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {!showUpdateForm && !showDeleteForm && !showCreateForm && (
          <div style={{ margin: '20px 0' }}>
            <input
              type="text"
              placeholder="Search by Role Name"
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
              onClick={handleCreate} // Call handleCreate on button click
            >
              Create Role
            </button>
          </div>
        )}

        {showCreateForm ? (
          <CreateRole onClose={handleCloseCreateForm} /> // Pass onClose prop to CreateRole
        ) : showUpdateForm ? (
          <UpdatedRole roleID={selectedRoleId} onClose={() => setShowUpdateForm(false)} />
        ) : showDeleteForm ? (
          <DeleteRole roleID={selectedDeletedRoleId} onClose={() => setShowDeleteForm(false)} />
        ) : (
          <DataTable
            title="Role Details"
            columns={columns}
            data={filteredRoleDetails} // Use filtered data for display
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
