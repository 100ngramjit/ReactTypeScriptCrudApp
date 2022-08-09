import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Page404 = () => {
  return (
    <Container className=" text-center col-sm-8 ml-auto mr-auto">
      <h1 class="m-0">404</h1>
      <h6>Page not found</h6>
      <p>
        <Link to={"/"}>
          <Button type="button" variant="success">
            Go Back
          </Button>
        </Link>
      </p>
    </Container>
  );
};
export default Page404;
