import axios from "axios";
export const getBlogs = async (url) => {
  const response = axios.get(url);
  return await response;
};

export const getBlogById = async (url, id) => {
  const response = axios.get(`${url}/${id}`);
  return await response;
};
