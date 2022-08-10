import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const BlogList = () => {
  const baseURL = process.env.REACT_APP_URL;
  const blogs = useSelector((state) => state);
  const dispatch = useDispatch();

  const getData = () => {
    return (dispatch) => {
      axios.get(baseURL).then((res) =>
        dispatch({
          type: "FETCH_DATA",
          data: res.data,
        })
      );
    };
  };

  useEffect(() => {
    dispatch(getData());
  }, []);
  console.log(blogs.data.data);
  return (
    <div className="container mt-4">
      {blogs.data.data ? (
        blogs.data.data.map(({ details, id }) => (
          <div key={id}>
            <li>{details}</li>
          </div>
        ))
      ) : (
        <Skeleton count={20} />
      )}
    </div>
  );
};

export default BlogList;
