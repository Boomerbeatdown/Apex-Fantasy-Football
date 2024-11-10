// src/components/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = Boolean(localStorage.getItem('accessToken')); // Check if user is authenticated

    return isAuthenticated ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
