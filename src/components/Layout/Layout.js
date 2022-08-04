import React from "react";
import Header from "components/Header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <main>{children}</main>
      </Header>
    </>
  );
};

export default Layout;
