import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import EmployeeList from './component/EmployeeList'
import EmployeeDetail from './component/EmployeeDetail'
import AddEmployee from './component/AddEmployee';
import EditEmployee from './component/EditEmployee'
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <SideBar/> */}
      <Routes>
        <Route path='/' element={<EmployeeList/>} />
        <Route path='/create' element={<AddEmployee/>} />
        <Route path='/edit/:employeeId' element={<EditEmployee />} />
        <Route path='/employee/infor/:emId' element={<EmployeeDetail />} />
      </Routes>
    </>
  );
}

export default App;
