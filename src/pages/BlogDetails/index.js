import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Cancel, SubmitEdits, Edit } from "components/Constants";
import { Container, Button, Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const BlogDetails = () => {
  const baseURL = process.env.REACT_APP_URL;
  const [blog, setBlog] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [detailsText, setDetailsText] = useState("");
  const { id } = useParams();

  const getBlog = async (id) => {
    await axios.get(`${baseURL}/${id}`).then((resp) => setBlog(resp.data));
  };

  const editTodo = (item) => {
    if (item) {
      axios
        .put(`${baseURL}/${item.id}`, {
          title: titleText,
          details: detailsText,
        })
        .then(() => {
          setIsEditing(false);
          setTitleText("");
          setDetailsText("");
          getBlog(item.id);
          toast.success("Edited Successfully");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getBlog(id);
  }, []);
  return (
    <Container>
      {Object.keys(blog).length ? (
        <Card style={{ margin: "1rem" }} bg="dark" text="light">
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title> {blog.details}
            {isEditing ? (
              <div>
                <input
                  type="text"
                  onChange={(e) => setTitleText(e.target.value)}
                  placeholder="edit title"
                  value={titleText}
                />{" "}
                <input
                  type="text"
                  placeholder="edit details"
                  onChange={(e) => setDetailsText(e.target.value)}
                  value={detailsText}
                />
              </div>
            ) : null}
            <p>
              {isEditing ? (
                <>
                  <Button
                    onClick={() => {
                      editTodo(blog);
                      getBlog(blog.id);
                    }}
                  >
                    {SubmitEdits}
                  </Button>{" "}
                  <Button variant="danger" onClick={() => setIsEditing(false)}>
                    {Cancel}
                  </Button>
                </>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(true);
                    setTitleText(blog.title);
                    setDetailsText(blog.details);
                  }}
                >
                  {Edit}
                </Button>
              )}
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Skeleton count={30} />
      )}
    </Container>
  );
};

export default BlogDetails;
