import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Blogs } from "constants/Constants";
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
  return (
    <Container>
      <h3>{Blogs}</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {blogs.data.data ? (
          blogs.data.data.map(
            ({ title, details, id }) =>
              details && (
                <Col key={id}>
                  <Card
                    style={{ width: "20rem", margin: "1rem" }}
                    bg="dark"
                    text="light"
                  >
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <hr />
                      <Card.Text>
                        {details.substr(0, 250) + "....."}
                      </Card.Text>{" "}
                    </Card.Body>
                  </Card>
                </Col>
              )
          )
        ) : (
          <Skeleton count={20} height={40} baseColor="grey" />
        )}
      </Row>
    </Container>
  );
};

export default BlogList;
