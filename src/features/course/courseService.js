import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";


const addCourse = async(courseTitle) => {
    const response = await axios.post(`${base_url}course/create`)
    if(response.data){
        return response.data;
    }
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


