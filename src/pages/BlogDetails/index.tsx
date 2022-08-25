import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  LABEL_CANCEL,
  LABEL_EDIT,
  LABEL_SUBMIT_EDITS,
} from "constants/Constants";
import { Container, Button, Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { getBlogById, EditTodoById } from "services/apiService";

const BlogDetails = () => {
  const [blog, setBlog] = useState({
    createdAt: "",
    details: "",
    id: null,
    title: "",
    updatedAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [detailsText, setDetailsText] = useState("");
  const { id } = useParams();

  const getBlog = async (id: string) => {
    try {
      const response = await getBlogById(id);
      setBlog(response.data);
    } catch (err) {
      toast.error(err);
    }
  };

  const editTodo = async (item: any) => {
    if (item) {
      try {
        const response = await EditTodoById(id, titleText, detailsText);
        if (response.status === 200) {
          setIsEditing(false);
          setTitleText("");
          setDetailsText("");
          getBlog(item.id);
          toast.success("Edited Successfully");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEditButtonClick = (blog: any) => {
    setIsEditing(true);
    setTitleText(blog.title);
    setDetailsText(blog.details);
  };

  useEffect(() => {
    getBlog(id);
  }, []);
  return (
    <Container>
      {blog.title ? (
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
              <Card.Text>
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
              </Card.Text>
            ) : (
              <div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleEditButtonClick(blog);
                  }}
                  className="m-2"
                >
                  {LABEL_EDIT}
                </Button>
              </div>
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
