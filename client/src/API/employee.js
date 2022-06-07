import axios from "axios";
import { API } from "./config";

export const getAllEmployees = (token)=> {

    return axios.get(`${API}/employees/all`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
})
}


export const getSingleEmployee = (empId, token)=> axios.get(`${API}/employees/${empId}`,{
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
})