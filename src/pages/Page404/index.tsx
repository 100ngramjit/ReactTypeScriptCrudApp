import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <Container className=" text-center col-sm-8 ml-auto mr-auto">
      <h1 className="m-0">404</h1>
      <h6>Page not found</h6>
      <p>
        <Button type="button" onClick={() => navigate(-1)}>
          go back
        </Button>
      </p>
    </Container>
  );
};
export default Page404;
