import React, { useState } from 'react'
import jwtDecode from "jwt-decode";
const useTokenDecoder = () => {

    const [tokenUser, setTokenUser] = useState({});
    const token = localStorage.getItem("token");
    const decodeToken = token? jwtDecode(JSON.parse(token)): null;
    if(decodeToken){
        setTokenUser(decodeToken);
    }
  return tokenUser;
}

export default useTokenDecoder