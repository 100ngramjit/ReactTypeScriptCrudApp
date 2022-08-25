import axios from "axios";
import { baseURL } from "api_urls/ApiLinks";

export const getBlogs = (url) => {
  return axios.get(url);
};

export const getBlogById = (id) => {
  return axios.get(`${baseURL}/${id}`);
};

export const editTodoById = (id, titleText, detailsText) => {
  return axios.put(`${baseURL}/${id}`, {
    title: titleText,
    details: detailsText,
  });
};

export const deleteTodoById = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export const postTodo = (todo) => {
  return axios.post(baseURL, {
    title: todo,
  });
};

export const getBlogList: any = () => {
  return (dispatch) => {
    axios.get(baseURL).then((res) => {
      dispatch({
        type: "FETCH_DATA_SUCCESS",
        data: res.data,
      });
    });
  };
};
