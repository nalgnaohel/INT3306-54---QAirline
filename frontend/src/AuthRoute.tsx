import React, {useEffect} from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
  element: React.ReactElement;
  authRole: string;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element, authRole }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  console.log(currentUser.type);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (authRole === 'admin') {
    if (currentUser.type !== 'admin') {
      return <Navigate to="/" />;
    }
  }

  if (authRole === 'client') {
    if (currentUser.type !== 'client') {
      if (currentUser.type === 'admin') {
        return <Navigate to="/admin" />;
      } else {
        return <Navigate to="/" />;
      }
    }
  }
  // Render the element if authenticated and authorized
  return element;
};

export default AuthRoute;