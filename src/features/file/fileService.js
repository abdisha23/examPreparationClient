import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";


const uploadFile = async(courseId) => {
    
}
const getCourses = async() => {
    const response = await axios.get(`${base_url}course/all`)
    if(response.data){
        return response.data;
    }
}

export const courseService = {
    getCourses
}


