import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const List = () => {
  const baseURL = " https://testapi.io/api/Sangramjit/resource/new";
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editingtext, setEditingtext] = useState("");

  const getData = () => {
    axios.get(baseURL).then((resp) => setTodos(resp.data.data));
    console.log("todo", todos);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(baseURL, {
      title: todo,
    });
    setTodo("");
    getData();
    toast.success("Added successfully");
  };

  const deleteTodo = (id) => {
    axios.delete(`${baseURL}/${id}`).then(() => {
      axios.get(baseURL).then((resp) => setTodos(resp.data.data));
    });
  };

  const editTodo = (id) => {
    [...todos].map((todo) => {
      if (todo.id === id) {
        axios.put(`${baseURL}/${id}`, {
          title: editingtext,
        });
      }
    });

    setIsEditing(null);
    setEditingtext("");
    getData();
  };

  return (
    <div className="todolist">
      <Toaster />
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
        />
        <button className="m-2 p-10 btn btn-primary" type="submit">
          Add
        </button>
      </form>
      <div className="todos">
        {todos.map(({ title, id }) => (
          <div key={id} className="todo-list">
            {isEditing === id ? (
              <input
                type="text"
                onChange={(e) => setEditingtext(e.target.value)}
                value={editingtext}
              />
            ) : (
              <div>{title}</div>
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
                className="m-2 p-10 btn btn-secondary"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
