// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/Dashboard';
// import RegisterPage from './pages/Register';
// import UserPage from './pages/AdminCompany/UserPage';
// import AddUserPage from './pages/AdminCompany/AddUserPage';
// function App() {
 

//   return (
//     <>
//       <Router>
//           <Routes>
//             <Route path="/Login" element={<LoginPage/>} />
//             <Route path="/Dashboard" element={<DashboardPage/>} />
//             <Route path="/Register" element={<RegisterPage/>} />
//             <Route path="/User" element={<UserPage/>} />
//             <Route path="/AddUser" element={<AddUserPage/>} />
//           </Routes>  
//       </Router>
//     </>
    
//   )
// }

// export default App

import { RouterProvider } from "react-router-dom";
import router from "./routers/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

