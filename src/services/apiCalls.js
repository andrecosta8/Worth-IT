import axios from "axios";

const API_BASE_URL = "http://localhost:5000/"

export const getProducts = async() => {
    return axios.get(`${API_BASE_URL}products`)
}
export const registerNewUser = async(user) => {
    return axios.post(`${API_BASE_URL}users`, user)
}

