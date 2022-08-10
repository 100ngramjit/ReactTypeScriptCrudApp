import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

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
        });
      // .catch((err) => toast.error(err));
    } else {
      toast.error("Input field empty! please write something before adding");
    }
  };

  const deleteTodo = (id) => {
    axios.delete(`${baseURL}/${id}`).then(() => {
      axios.get(baseURL).then((resp) => setTodos(resp.data.data));
      toast.error("Deleted Successfully ");
    });
    // .catch((err) => toast.error(err));
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
            setTitleText("");
            setDetailsText("");
            getData();
          });
        // .catch((err) => toast.error(err));
      }
    });
  };

  return (
    <Container>
      {todos.length ? (
        <Container className="text-center">
          <h3>List</h3>
          <form
            className="text-center"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              className="input"
              placeholder="Add a new task"
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              ref={inputRef}
            />{" "}
            <Button disabled={!todo} type="submit">
              Add
            </Button>{" "}
          </form>
          <div className="todos">
            {todos.map(({ title, details, id }) => (
              <div key={id} className=".flex-column">
                {isEditing === id ? (
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
                ) : (
                  <li>{title}</li>
                )}
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteTodo(id);
                  }}
                >
                  Delete
                </Button>{" "}
                {isEditing === id ? (
                  <Button
                    onClick={() => {
                      editTodo(id);
                      getData();
                    }}
                    disabled={!titleText}
                  >
                    submit edits
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(id);
                      getData();
                    }}
                  >
                    Edit
                  </Button>
                )}
                <Link to={`/dashboard/${id}`}>
                  {" "}
                  <Button variant="info">View</Button>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <Skeleton count={20} />
      )}
    </Container>
  );
};

export default List;
