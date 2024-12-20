import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
  element: React.ReactElement;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element, isAuthenticated, isAdmin }) => {
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" />;
  }

  if (!isAdmin) {
    // Redirect to not authorized page if not an admin
    return <Navigate to="/not-authorized" />;
  }

  // Render the element if authenticated and authorized
  return element;
};

export default AuthRoute;