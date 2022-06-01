import React, {useContext} from 'react';
import { ProjectContext } from '../Context/createContext';
import jwt_decode from "jwt-decode";

const useAuth = () => {
    // const {initialState,userInfo} = useContext(ProjectContext);
    let isAuth = false;
    const localtoken = localStorage.getItem("token");
    if(localtoken){

        const {exp, ...rest} = jwt_decode(localtoken);
        // console.log(exp);
        if(new Date().getTime() <= exp * 1000){
            isAuth = true;
        }else{
            isAuth = false;
            localStorage.removeItem("token");
        }
    }else{
        isAuth = false;
    }
    // console.log(isAuth);

  return isAuth;
}

export default useAuth