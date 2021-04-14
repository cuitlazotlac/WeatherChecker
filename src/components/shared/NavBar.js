import React from "react";
import Navbar from 'react-bootstrap/Navbar'

import logo from '../../ressources/images/logo.svg'

export const NavBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Weather Checker
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};
