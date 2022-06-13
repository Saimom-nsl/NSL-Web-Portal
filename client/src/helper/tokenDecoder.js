import jwtDecode from "jwt-decode";

const token = localStorage.getItem("token");
export const userInfoFromToken = () => {
    const jwt = JSON.parse(localStorage.getItem('token'));
    if(jwt !== null){
    const decoded = jwtDecode(jwt);
    return {
        ...decoded,
        token: jwt,
    }
}
}

