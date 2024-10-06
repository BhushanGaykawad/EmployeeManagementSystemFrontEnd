import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEmployee from './CreateEmployee';
import EmployeeDetails from './components/EmployeeDetails';
import UpdateEmployee from './UpdateEmployee';
import EmployeeSearch from './Search';
import CreateDepartment from './CreateDepartment';
import DepartmentDetails from './DepartmentDetails';
import UpdatedDepartment from './UpdateDepartment';
import DeleteDepartment from './DeleteDepartment'
import RoleDetails from './RoleDetails';
import CreateRole from './CreateRole';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function App() {
  return (
   <>
   <Navbar/>
   <Routes>
     <Route path="/" element={<HomePage/>}/>
     <Route path="/create" element={<CreateEmployee/>}/>
     <Route path="/employeedetails" element={<EmployeeDetails/>}/>
     <Route path="/update-employee/:id" element={<UpdateEmployee />} />
     <Route path="/search" element={<EmployeeSearch/>}/>
     <Route path="/createDepartment" element={<CreateDepartment/>}/>
     <Route path="/deptdetails" element={<DepartmentDetails/>}/>
     <Route path="/updatedept" element={<UpdatedDepartment/>}/>
     <Route path="/deletedept" element={<DeleteDepartment/>}/>
     <Route path="/roledetails" element={<RoleDetails/>}/>
     <Route path="/createrole" element={<CreateRole/>}/>
     <Route path="/home" element={<HomePage/>}/>
   </Routes>
  </>
  );
}

export default App;
