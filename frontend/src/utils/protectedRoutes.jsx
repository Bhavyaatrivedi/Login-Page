// In ProtectedRoute.js or wherever you define your ProtectedRoute component
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './authProvider';

export const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route element={element} {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};
