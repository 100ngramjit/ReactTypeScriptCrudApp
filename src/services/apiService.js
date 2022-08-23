import axios from "axios";
export const getBlogs = (url) => {
  return axios.get(url);
};

export const getBlogById = (url, id) => {
  return axios.get(`${url}/${id}`);
};
