import axios from "axios";
import { API } from "./config";

export const getAllRoles = token => {
    return axios.get(`${API}/roles/`, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }});
}