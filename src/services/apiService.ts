import axios from "axios";
import { baseURL } from "api_urls/ApiLinks";

export const getBlogs = (url: string) => {
  return axios.get(url);
};

export const getBlogById = (id: string) => {
  return axios.get(`${baseURL}/${id}`);
};

export const editTodoById = (
  id: string | undefined,
  titleText: string,
  detailsText: string
) => {
  return axios.put(`${baseURL}/${id}`, {
    title: titleText,
    details: detailsText,
  });
};

export const deleteTodoById = (id: string) => {
  return axios.delete(`${baseURL}/${id}`);
};

export const postTodo = (todo: string) => {
  return axios.post(baseURL, {
    title: todo,
  });
};

export const getBlogList: any = () => {
  return (dispatch: (arg0: { type: string; data: any }) => void) => {
    axios.get(baseURL).then((res) => {
      dispatch({
        type: "FETCH_DATA_SUCCESS",
        data: res.data,
      });
    });
  };
};
