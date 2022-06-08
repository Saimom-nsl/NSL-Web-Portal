import axios from "axios";
import { API } from "./config";
export const newEmployee = (data, token)=>{
    return axios.post(`${API}/employees/`,data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}
export const getAllEmployees = (token, query)=> {

    return axios.get(`${API}/employees/all?sortBy=${query?.sortBy}&orderBy=${query?.orderBy}`, {
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
export const nslIdCount = token=> axios.get(`${API}/employees/nslcount`,{
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
})