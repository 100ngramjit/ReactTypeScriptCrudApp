import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Container } from "react-bootstrap";

const BlogDetails = () => {
  const baseURL = process.env.REACT_APP_URL;
  const [blog, setBlog] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [detailsText, setDetailsText] = useState("");
  const { id } = useParams();

  const getBlog = async (id) => {
    console.log("advbhx");
    await axios.get(`${baseURL}/${id}`).then((resp) => setBlog(resp.data));
    console.log(blog);
  };

  const editTodo = (item) => {
    if (item) {
      axios
        .put(`${baseURL}/${item.id}`, {
          title: titleText,
          details: detailsText,
        })
        .then(() => {
          console.log("resolved");
          setIsEditing(false);
          setTitleText("");
          setDetailsText("");
          getBlog(item.id);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getBlog(id);
  }, []);
  return (
    <>
      <Container>
        <h2>Title- {blog.title}</h2>
        <p className="m-2">Details- {blog.details}</p>
        {isEditing ? (
          <div>
            <input
              type="text"
              onChange={(e) => setTitleText(e.target.value)}
              placeholder="edit title"
              value={titleText}
            />
            <input
              type="text"
              placeholder="edit details"
              onChange={(e) => setDetailsText(e.target.value)}
              value={detailsText}
            />
          </div>
        ) : null}
        {isEditing ? (
          <>
            <button
              className="m-2 p-10 btn btn-primary"
              onClick={() => {
                editTodo(blog);
                getBlog(blog.id);
                toast.success("Edited Successfully");
              }}
            >
              submit edits
            </button>
            <button
              className="m-2 p-10 btn btn-danger"
              onClick={() => setIsEditing(false)}
            >
              cancel
            </button>
          </>
        ) : (
          <button
            className="m-2 p-10 btn btn-secondary"
            onClick={() => {
              setIsEditing(true);
              setTitleText(blog.title);
              setDetailsText(blog.details);
            }}
          >
            edit
          </button>
        )}
      </Container>
    </>
  );
};

export default BlogDetails;