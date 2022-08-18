import axios from "axios";
export const getBlogs = async (url) => {
  const response = axios.get(url);
  return await response;
};
