import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { Container, Card, CardGroup, Col, Row } from "react-bootstrap";

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
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {blogs.data.data ? (
          blogs.data.data.map(({ title, details, id }) => (
            <Col>
              <Card
                key={id}
                style={{ width: "20rem", margin: "1rem" }}
                bg="info"
                text="light"
              >
                {details ? (
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <hr />
                    <Card.Text>
                      {details.substr(0, 250) + "....."}
                    </Card.Text>{" "}
                  </Card.Body>
                ) : (
                  ""
                )}
              </Card>
            </Col>
          ))
        ) : (
          <Skeleton count={20} />
        )}
      </Row>
    </Container>
  );
};

export default BlogList;
