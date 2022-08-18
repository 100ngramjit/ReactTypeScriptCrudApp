import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import SweetAlert from "react-bootstrap-sweetalert";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import {
  Add,
  Edit,
  View,
  Index,
  Description,
  Actions,
  Title,
  Delete,
  Cancel,
  SubmitEdits,
} from "components/Constants";
import { getBlogs } from "services/apiService";
import { Link } from "react-router-dom";
import { Container, Button, Table, Form, InputGroup } from "react-bootstrap";

const List = () => {
  const baseURL = process.env.REACT_APP_URL;
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [detailsText, setDetailsText] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const getData = () => {
    getBlogs(baseURL).then((resp) => setTodos(resp.data.data));
  };

  const inputRef = useRef(null);
  useEffect(() => {
    // inputRef.current.focus();
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

  return (
    <Container>
      {todos.length ? (
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
                />{" "}
                <Button disabled={!todo} type="submit" className="ml-3">
                  {Add}
                </Button>{" "}
              </InputGroup>
            </Form.Group>
          </Form>
          <Table bordered hover responsive="lg" size="lg" variant="dark">
            <thead>
              <tr>
                <th>{Index}</th>
                <th>{Title}</th>
                <th>{Description}</th>
                <th style={{ width: "250px" }}>{Actions}</th>
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
                    {deleteConfirmation === id ? (
                      <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, delete it!"
                        confirmBtnBsStyle="danger"
                        title="Are you sure?"
                        style={{ backgroundColor: "#454d55" }}
                        onConfirm={() => {
                          deleteTodo(id);
                          setDeleteConfirmation(false);
                        }}
                        onCancel={() => {
                          setDeleteConfirmation(false);
                        }}
                      >
                        You will not be able to recover this imaginary file!
                      </SweetAlert>
                    ) : (
                      // <SweetAlert
                      //   showCloseButton
                      //   title="Are you sure?"
                      //   showCancel
                      //   confirmBtnText="Yes, delete it!"
                      //   confirmBtnBsStyle="danger"
                      //   onConfirm={() => {
                      //     deleteTodo(id);
                      //     setDeleteConfirmation(false);
                      //   }}
                      //   onCancel={() => {
                      //     setDeleteConfirmation(false);
                      //   }}
                      // ></SweetAlert>
                      " "
                    )}
                    <Button
                      variant="danger"
                      onClick={() => {
                        setDeleteConfirmation(id);
                      }}
                    >
                      {Delete}
                    </Button>{" "}
                    {isEditing === id ? (
                      <div>
                        <Button
                          onClick={() => {
                            editTodo(id);
                            getData();
                          }}
                          disabled={!titleText}
                        >
                          {SubmitEdits}
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(null);
                          }}
                          variant="danger"
                        >
                          {Cancel}
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setIsEditing(id);
                            setTitleText(title);
                            setDetailsText(details);
                            getData();
                          }}
                        >
                          {Edit}
                        </Button>{" "}
                      </>
                    )}
                    <Link to={`/dashboard/${id}`}>
                      <Button variant="info">{View}</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Skeleton count={20} />
      )}
    </Container>
  );
};

export default List;
