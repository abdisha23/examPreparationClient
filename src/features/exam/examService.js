import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";


const create = async(examData) => {
    const response = await axios.post(`${base_url}exam/create`, examData)
    if(response.data){
        return response.data;
    }
}

export const examService = {
    create,
    
}
// const login = async(userData) => {
//     const response = await axios.post(`${base_url}user/user-login`, userData)
//     if(response.data){
//         localStorage.setItem("user", JSON.stringify(response.data));
//         return response.data;
//     }
// };