import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";


const createQuiz = async(courseId, quizData) => {
    const response = await axios.post(`${base_url}quiz/create/${courseId}`, quizData);
    if(response.data){
        return response.data;
    }
}
const getQuizzes = async(courseId) => {
    const response = await axios.get(`${base_url}quiz/all/${courseId}`)
    if(response.data){
        return response.data;
    }
}

export const quizService = {
    createQuiz,
    getQuizzes
}
