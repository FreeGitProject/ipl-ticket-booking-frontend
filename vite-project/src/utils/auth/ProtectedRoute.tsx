import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from './helpers';
import { toast } from 'react-hot-toast';

interface ProtectedRouteProps {
  roles?: string[];
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roles = [],
  redirectPath = '/login',
  children,
}) => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const hasRequiredRole = roles.length === 0 || hasRole(roles);

  if (!isAuth) {
    toast.error('Please login to access this page');
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (!hasRequiredRole) {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;