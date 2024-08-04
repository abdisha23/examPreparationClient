import axios from "axios";
import { base_url, authentication } from "../../utils/axiosConfig";

const addCourse = async (title) => {
  const response = await axios.post(
    `${base_url}course/create`,
    title,
    authentication
  );
  if (response.data) {
    return response.data;
  }
};
const getCourses = async () => {
  const response = await axios.get(`${base_url}course/all`);
  if (response.data) {
    return response.data;
  }
};

export const courseService = {
  addCourse,
  getCourses,
};
