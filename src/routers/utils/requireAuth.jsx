import { Navigate, Outlet } from "react-router-dom";

const requireAuth = ({ redirectPath }) => {
  const isAuthenticate = localStorage.getItem('token');

  if (!isAuthenticate) return <Navigate to={redirectPath} />;

  return <Outlet />;
};

export default requireAuth;