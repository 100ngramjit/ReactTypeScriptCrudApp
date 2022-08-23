import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  LABEL_CANCEL,
  LABEL_EDIT,
  LABEL_SUBMIT_EDITS,
} from "constants/Constants";
import { baseURL } from "api_urls/ApiLinks";
import { Container, Button, Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { getBlogById } from "services/apiService";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [detailsText, setDetailsText] = useState("");
  const { id } = useParams();

  const getBlog = async (id) => {
    try {
      await getBlogById(baseURL, id).then((resp) => setBlog(resp.data));
    } catch (err) {
      toast.error(err);
    }
  };

  const editTodo = (item) => {
    if (item) {
      try {
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
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEditButtonClick = (blog) => {
    setIsEditing(true);
    setTitleText(blog.title);
    setDetailsText(blog.details);
  };

  useEffect(() => {
    getBlog(id);
  }, []);
  return (
    <Container>
      {Object.keys(blog).length ? (
        <Card style={{ margin: "1rem" }} bg="dark" text="light">
          <Card.Body>
            <Card.Title>{blog?.title}</Card.Title> {blog?.details}
            {isEditing ? (
              <div>
                <input
                  type="text"
                  onChange={(e) => setTitleText(e.target.value)}
                  placeholder="edit title"
                  value={titleText}
                  className="m-2"
                />
                <input
                  type="text"
                  placeholder="edit details"
                  onChange={(e) => setDetailsText(e.target.value)}
                  value={detailsText}
                  className="m-2"
                />
              </div>
            ) : null}
            {isEditing ? (
              <>
                <Button
                  onClick={() => {
                    editTodo(blog);
                  }}
                  className="m-2"
                >
                  {LABEL_SUBMIT_EDITS}
                </Button>
                <Button
                  variant="danger"
                  className="m-2"
                  onClick={() => setIsEditing(false)}
                >
                  {LABEL_CANCEL}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleEditButtonClick(blog);
                  }}
                  className="m-2"
                >
                  {LABEL_EDIT}
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Skeleton count={30} height={40} baseColor="grey" />
      )}
    </Container>
  );
};

export default BlogDetails;
