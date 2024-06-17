import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";


const register = async(userData) => {
    const response = await axios.post(`${base_url}user/register`, userData)
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
    register,
    login,
}