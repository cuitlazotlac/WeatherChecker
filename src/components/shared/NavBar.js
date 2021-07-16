import React from "react";
import Navbar from "react-bootstrap/Navbar";

import logo from "../../ressources/images/logo.svg";
import github from "../../ressources/images/github-dark.png";


export const NavBar = () => {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Weather Checker
          {/* <img
            alt=""
            src={github}
            className="github-icon"
          />{" "} */}
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};
