import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";


const createForum = async(forumData) => {
    const response = await axios.post(`${base_url}forum/create`, forumData)
    if(response.data){
        return response.data;
    }
}
const getForum = async() => {
    const response = await axios.get(`${base_url}forum/all`)
    if(response.data){
        return response.data;
    }
};

export const forumService = {
    createForum,
    getForum

}