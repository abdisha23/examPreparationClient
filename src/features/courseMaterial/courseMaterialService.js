import axios from 'axios';
import { base_url, config } from "../../utils/axiosConfig";

const createCourseMaterial = async (courseId, fileToUpload, title, description) => {
  try {
    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('title', title);
    formData.append('description', description);

    const response = await axios.post(`${base_url}course-material/material/upload/${courseId}`, formData, config);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error for the calling function to handle
  }
};

const getCourseMaterials = async (courseId) => {
  try {
    const response = await axios.get(`${base_url}course-material/material/getall/${courseId}`, config);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error for the calling function to handle
  }
};

export const courseMaterialService = {
  createCourseMaterial,
  getCourseMaterials,
};
