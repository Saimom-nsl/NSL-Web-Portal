import jwtDecode from 'jwt-decode';
import React, {  } from 'react';
import { Navigate, useNavigate} from "react-router-dom"
// import { ProjectContext } from '../../Context/createContext';
import useAuth from '../../Hooks/Auth';
const AdminRoute = ({children})=> {
    // const {user, tokenUser} = useContext(ProjectContext);
    const token = JSON.parse(localStorage.getItem("token"));
    let user = {}
    if(token){
        user = jwtDecode(token)
    }
    const Auth = useAuth();
    return (Auth && (user?.role?.name === "superadmin"))? children: <Navigate to={"/dashboard"} />
}

export default AdminRoute;