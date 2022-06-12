import axios from "axios";
import { API } from "./config";

export const createSkill = (token, skill)=> {
    return axios.post(`${API}/skills`, skill, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}
export const getSkillForAEmployee = (token, employeeId)=> {
    return axios.get(`${API}/skills?employeeId=${employeeId}`, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    })
}

export const deleteASkillForAEmployee = (token, data)=> {
    return axios.delete(`${API}/skills`,{headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }, data: data
    })
}