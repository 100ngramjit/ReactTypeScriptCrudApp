import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";

const List = () => {
  const baseURL = process.env.REACT_APP_URL;
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [detailsText, setDetailsText] = useState("");

  const getData = async () => {
    await axios.get(baseURL).then((resp) => setTodos(resp.data.data));
  };

  const inputRef = useRef(null);
  useEffect(() => {
    getData();
    // inputRef.current.focus();
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
    [...todos].map((todo) => {
      if (todo.id === id) {
        axios
          .put(`${baseURL}/${id}`, {
            title: titleText,
            details: detailsText,
          })
          .then(() => {
            toast.success("Edited Successfully");
            setIsEditing(null);
            // setTitleText("");
            // setDetailsText("");
            getData();
          })
          .catch((err) => toast.error(err));
      }
    });
  };

  return (
    <Container>
      {/* <h3>Todo List</h3> */}
      {todos.length ? (
        <>
          <form
            className="text-center"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Container>
              <input
                placeholder="Add a new title"
                type="text"
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
                ref={inputRef}
              />{" "}
              <Button disabled={!todo} type="submit" className="m-2">
                Add
              </Button>{" "}
            </Container>
          </form>
          <Table bordered hover responsive="lg" size="lg" variant="dark">
            <thead>
              <tr>
                <th>Index</th>
                <th>Title</th>
                <th>Description</th>
                <th style={{ width: "250px" }}>Actions</th>
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
                      <>{details && details.substr(0, 100) + "....."}</>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteTodo(id);
                      }}
                    >
                      Delete
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
                          Submit Edits
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(null);
                          }}
                          variant="danger"
                        >
                          Cancel
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
                          Edit
                        </Button>{" "}
                      </>
                    )}
                    <Link to={`/dashboard/${id}`}>
                      <Button variant="info">View</Button>
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
