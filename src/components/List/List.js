import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const List = () => {
  const baseURL = process.env.REACT_APP_URL;
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [detailsText, setDetailsText] = useState("");

  const getData = async () => {
    await axios.get(baseURL).then((resp) => setTodos(resp.data.data));
    console.log("todo", todos);
  };

  const inputRef = useRef(null);
  useEffect(() => {
    getData();
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(baseURL, {
        title: todo,
      })
      .then(() => {
        setTodo("");
        getData();
        toast.success("Added successfully");
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`${baseURL}/${id}`).then(() => {
      axios.get(baseURL).then((resp) => setTodos(resp.data.data));
    });
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
            setIsEditing(null);
            setTitleText("");
            setDetailsText("");
            getData();
          });
      }
    });
  };

  return (
    <Container className="justify-contact-center">
      <h3>List</h3>
      <form
        className="todo-form"
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
        />
        <button className="m-2 p-10 btn btn-primary" type="submit">
          Add
        </button>
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
                  // value={title}
                />
                <input
                  type="text"
                  placeholder="edit details"
                  onChange={(e) => setDetailsText(e.target.value)}
                  // value={details}
                />
              </div>
            ) : (
              <div className="mr-0">{title}</div>
            )}
            <button
              className="m-2 p-10 btn btn-danger"
              onClick={() => {
                deleteTodo(id);
                toast.error("Deleted Successfully ");
              }}
            >
              delete
            </button>
            {isEditing === id ? (
              <button
                className="m-2 p-10 btn btn-primary"
                onClick={() => {
                  editTodo(id);
                  getData();
                  toast.success("Edited Successfully");
                }}
              >
                submit edits
              </button>
            ) : (
              <button
                className="m-2 p-10 btn btn-secondary"
                onClick={() => {
                  setIsEditing(id);
                  getData();
                }}
              >
                edit
              </button>
            )}

            <Link to={`/dashboard/${id}`}>
              <button className="m-2 btn btn-info">view</button>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default List;
