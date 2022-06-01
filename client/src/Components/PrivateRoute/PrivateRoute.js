import React from 'react';
import {Navigate, Link, useNavigate} from "react-router-dom"
import useAuth from '../../Hooks/Auth';

const PrivateRoute = ({children}) => {
    const auth = useAuth();
    const navigate = useNavigate();
    return auth ? children : <Navigate to="/login" />;

    
}

export default PrivateRoute