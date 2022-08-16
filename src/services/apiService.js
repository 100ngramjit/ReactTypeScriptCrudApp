import axios from "axios";

export const getBlogs = async (url) => {
  await axios.get(url);
};
