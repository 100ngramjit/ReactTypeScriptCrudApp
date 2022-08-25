import axios from "axios";
import { baseURL } from "api_urls/ApiLinks";

export const getBlogs = (url) => {
  return axios.get(url);
};

export const getBlogById = (id) => {
  return axios.get(`${baseURL}/${id}`);
};

export const EditTodoById = (id, titleText, detailsText) => {
  return axios.put(`${baseURL}/${id}`, {
    title: titleText,
    details: detailsText,
  });
};

export const DeleteTodoById = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export const PostTodo = (todo) => {
  return axios.post(baseURL, {
    title: todo,
  });
};

export const getBlogList: any = () => {
  return (dispatch) => {
    axios.get(baseURL).then((res) =>
      dispatch({
        type: "FETCH_DATA_SUCCESS",
        data: res.data,
      })
    );
  };
};
