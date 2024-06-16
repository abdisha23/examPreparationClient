import axios from 'axios';

import { base_url, config } from "../../utils/axiosConfig";

const createCourseMaterial = async (courseId, data) => {
  // Existing createCourseMaterial function
};

const getCourseMaterials = async (courseId) => {
  const response = await axios.get(`${base_url}course-material/material/getall/${courseId}`);
  return response.data;
};

export const courseMaterialService = {
  createCourseMaterial,
  getCourseMaterials,
};

