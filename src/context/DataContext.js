import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const DataContext = createContext();

function DataProvider({ children }) {
  const baseURL = process.env.REACT_APP_URL;
  const [todos, setTodos] = useState([]);
  const getData = async () => {
    await axios.get(baseURL).then((resp) => setTodos(resp.data.data));
    console.log("axaiusxh", todos);
  };

  useEffect(() => {
    getData();
  }, []);

  //   const localUname = `${get(
  //     loggedInUserObj,
  //     "firstName",
  //     ""
  //   )} ${get(loggedInUserObj, "lastName", "")}`;

  return <DataContext.Provider value={todos}>{children}</DataContext.Provider>;
}

export { DataProvider, DataContext };
