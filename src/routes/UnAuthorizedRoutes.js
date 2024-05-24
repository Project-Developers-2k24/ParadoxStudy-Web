import { Navigate } from 'react-router-dom';

const UnauthorizedRoute = ({ children, isAuthorized }) => {
  return isAuthorized ? <Navigate replace to="/" /> : children; // Redirect if authorized
};

export default UnauthorizedRoute;
