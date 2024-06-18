import axios from "axios";
import { base_url, authentication } from "../../utils/axiosConfig";


const createExam = async(courseId, examData) => {
    const response = await axios.post(`${base_url}exam/create/${courseId}`, examData, authentication);
    console.log(courseId)
    console.log(examData)
    console.log(response.error)
    if(response.data){
        return response.data;
    }
}
const getExams = async(courseId) => {
    const response = await axios.get(`${base_url}exam/all/${courseId}`, authentication)
    if(response.data){
        return response.data;
    }
}

export const examService = {
    createExam,
    getExams
}
