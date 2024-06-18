import axios from "axios";
import { base_url, authentication } from "../../utils/axiosConfig";


const signup = async(userData) => {
    const response = await axios.post(`${base_url}user/signup`, userData)
    if(response.data){
        return response.data;
    }
}
const register = async(userData) => {
    const response = await axios.post(`${base_url}user/register`, userData, authentication)
    if(response.data){
        return response.data;
    }
}
const login = async(userData) => {
    const response = await axios.post(`${base_url}user/user-login`, userData)
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    }
};

export const userService = {
    signup,
    register,
    login,
}