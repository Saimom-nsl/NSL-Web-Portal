import axios from "axios";
import { API } from "./config";
export const loginHandler = data => {
    return axios.post(`${API}/users/signin`, data, {headers: {
        "Content-Type": "application/json"
    }});
}

export const getUserInfo = (token,employeeId) => {
    console.log("request", employeeId);
    return axios.get(`${API}/users/userinfo?employeeId=${employeeId}`, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }});
}

export const updateUserInformation = (token, employeeInfromation, userId)=> {
    return axios.put(`${API}/users/userinfo?userid=${userId}`, employeeInfromation, {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    })
}