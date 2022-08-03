import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "components/Header/Header";
import React from "react";
import { Container } from "react-bootstrap";

const BlogDetails = () => {
  const baseURL = process.env.REACT_APP_URL;
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const getBlog = async (id) => {
    console.log("advbhx");
    await axios.get(`${baseURL}/${id}`).then((resp) => setBlog(resp.data));
    console.log(blog);
  };

  useEffect(() => {
    getBlog(id);
  }, []);
  return (
    <>
      <Header />
      <Container>
        <h2>Title- {blog.title}</h2>
        <p className="m-2">Details- {blog.details}</p>
      </Container>
    </>
  );
};

export default BlogDetails;
