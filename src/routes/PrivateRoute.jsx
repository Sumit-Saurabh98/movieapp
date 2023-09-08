import React from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    if (!userId) {
        navigate('/authentication');
        return null; 
    }

    return <div>{children}</div>;
}

export default PrivateRoute;
