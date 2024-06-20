import React from 'react';
import { Navigate } from 'react-router-dom';

const decodeToken = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/Login" />;
  }

  let userRole;
  try {
    const decodedToken = decodeToken(token);
    userRole = decodedToken.role;
    localStorage.setItem('role', userRole); 
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to="/Login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;


