import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import SweetAlert from "react-bootstrap-sweetalert";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import {
  LABEL_ADD,
  LABEL_EDIT,
  LABEL_VIEW,
  LABEL_INDEX,
  LABEL_DESCRIPTION,
  LABEL_ACTIONS,
  LABEL_TITLE,
  LABEL_DELETE,
  LABEL_CANCEL,
  LABEL_SUBMIT_EDITS,
  LABEL_NO_RESULTS,
  LABEL_PERMANENT_DELETION,
} from "constants/Constants";
import { baseURL } from "api_urls/ApiLinks";
import { getBlogs } from "services/apiService";
import { Link } from "react-router-dom";
import { Container, Button, Table, Form, InputGroup } from "react-bootstrap";

const List = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [detailsText, setDetailsText] = useState("");
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(null);
  const [isTodoListLoading, setIsTodoListLoading] = useState(true);

  const getData = () => {
    getBlogs(baseURL)
      .then((resp) => {
        setTodos(resp.data.data);
        setIsTodoListLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsTodoListLoading(false);
      });
  };

  const inputRef = useRef(null);
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      axios
        .post(baseURL, {
          title: todo,
        })
        .then(() => {
          setTodo("");
          getData();
          toast.success("Added successfully");
        })
        .catch((err) => toast.error(err));
    } else {
      toast.error("Input field empty! please write something before adding");
    }
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${baseURL}/${id}`)
      .then(() => {
        axios.get(baseURL).then((resp) => setTodos(resp.data.data));
        setDeleteConfirmationModalOpen(false);
        toast.error("Deleted Successfully ");
      })
      .catch((err) => toast.error(err));
  };

  const editTodo = (id) => {
    axios
      .put(`${baseURL}/${id}`, {
        title: titleText,
        details: detailsText,
      })
      .then(() => {
        toast.success("Edited Successfully");
        setIsEditing(null);
        getData();
      })
      .catch((err) => toast.error(err));
  };
  const handleEditButtonClick = (id, title, details) => {
    setIsEditing(id);
    setTitleText(title);
    setDetailsText(details);
  };
  return (
    <Container>
      {!isTodoListLoading ? (
        todos.length ? (
          <>
            <Form
              className="text-center"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <Form.Group className="m-3">
                <InputGroup>
                  <Form.Control
                    placeholder="Add a new title"
                    type="text"
                    onChange={(e) => setTodo(e.target.value)}
                    value={todo}
                    ref={inputRef}
                  />
                  <Button disabled={!todo} type="submit" className="ml-3">
                    {LABEL_ADD}
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
            <Table bordered hover responsive="lg" size="lg" variant="dark">
              <thead>
                <tr>
                  <th>{LABEL_INDEX}</th>
                  <th>{LABEL_TITLE}</th>
                  <th>{LABEL_DESCRIPTION}</th>
                  <th style={{ width: "260px" }}>{LABEL_ACTIONS}</th>
                </tr>
              </thead>
              <tbody>
                {todos.map(({ title, details, id }, index) => (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      {isEditing === id ? (
                        <div>
                          <textarea
                            type="text"
                            onChange={(e) => setTitleText(e.target.value)}
                            placeholder="edit title"
                            value={titleText ? titleText : " "}
                          />
                        </div>
                      ) : (
                        <div>{title}</div>
                      )}
                    </td>
                    <td>
                      {isEditing === id ? (
                        <textarea
                          type="text"
                          placeholder="edit details"
                          onChange={(e) => {
                            setDetailsText(e.target.value);
                          }}
                          value={detailsText ? detailsText : " "}
                        />
                      ) : (
                        <>
                          {details &&
                            (details.length < 50
                              ? details
                              : details.substr(0, 50) + ".....")}
                        </>
                      )}
                    </td>
                    <td>
                      {isDeleteConfirmationModalOpen === id ? (
                        <SweetAlert
                          showCancel
                          confirmBtnText="Yes, delete it!"
                          confirmBtnBsStyle="danger"
                          cancelBtnBsStyle="secondary"
                          title="Are you sure?"
                          style={{ backgroundColor: "#454d55" }}
                          onConfirm={() => {
                            deleteTodo(id);
                          }}
                          onCancel={() => {
                            setDeleteConfirmationModalOpen(false);
                          }}
                        >
                          {LABEL_PERMANENT_DELETION}
                        </SweetAlert>
                      ) : (
                        " "
                      )}
                      <Button
                        variant="danger"
                        onClick={() => {
                          setDeleteConfirmationModalOpen(id);
                        }}
                        className="m-2"
                      >
                        {LABEL_DELETE}
                      </Button>
                      {isEditing === id ? (
                        <div>
                          <Button
                            onClick={() => {
                              editTodo(id);
                            }}
                            disabled={!titleText}
                            className="m-2"
                          >
                            {LABEL_SUBMIT_EDITS}
                          </Button>
                          <Button
                            onClick={() => {
                              setIsEditing(null);
                            }}
                            variant="danger"
                            className="m-2"
                          >
                            {LABEL_CANCEL}
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              handleEditButtonClick(id, title, details);
                            }}
                            className="m-2"
                          >
                            {LABEL_EDIT}
                          </Button>
                        </>
                      )}
                      <Link to={`/dashboard/${id}`}>
                        <Button variant="info" className="m-2">
                          {LABEL_VIEW}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <div>{LABEL_NO_RESULTS}</div>
        )
      ) : (
        <Skeleton count={20} height={40} baseColor="#6c757d" />
      )}
    </Container>
  );
};

export default List;
