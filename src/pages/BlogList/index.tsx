import React, { useEffect, useState } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { getBlogList } from "services/apiService";
import { LABEL_BLOGS } from "constants/Constants";
import Skeleton from "react-loading-skeleton";
import { Container, Card, Col, Row } from "react-bootstrap";

const BlogList = () => {
  const blogs: any = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const loadingToggle = () => {
    if (blogs) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getBlogList());
    loadingToggle();
  }, []);

  return (
    <Container id="bloglist">
      <h3 className="text-light">{LABEL_BLOGS}</h3>

      <Row xs={1} md={2} lg={3}>
        {!isLoading ? (
          blogs?.data?.data?.map(
            ({ title, details, id }) =>
              details && (
                <Col key={id}>
                  <Card id="card" bg="dark" text="light">
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <hr id="divider" />
                      <Card.Text>{details.substr(0, 250) + "....."}</Card.Text>
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
