import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/authcontext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        // Redirect unauthenticated users to login with the attempted route saved
        return <Navigate to="/auth" state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;