import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import List from "components/List/List";

const DashboardComp = () => {
  return (
    <div>
      <Container>
        <h1 className="mt-4">Hello</h1>
        <p>Welcome to the dashboard</p>
        <List />
      </Container>
    </div>
  );
};

export default DashboardComp;
