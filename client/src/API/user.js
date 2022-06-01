import axios from "axios";
import { API } from "./config";
export const loginHandler = data => {
    return axios.post(`${API}/users/signin`, data, {headers: {
        "Content-Type": "application/json"
    }});
}

export const getUserInfo = token => {
    return axios.get(`${API}/users/userinfo`, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }});
}