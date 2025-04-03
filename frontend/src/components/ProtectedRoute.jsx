import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
//   const token = localStorage.getItem('adminToken');
  
  // If using your API key system instead of JWT
  // const isAuthenticated = !!token;
  
  // For your current system using ADMIN_KEY
  const isAuthenticated = true; // You might want to verify the token with your backend

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;