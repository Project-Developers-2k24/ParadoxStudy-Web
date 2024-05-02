import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthorized }) => {
  return isAuthorized ? children : <Navigate replace to="/pages/login/login3" />; // Redirect to login
};

export default ProtectedRoute;
