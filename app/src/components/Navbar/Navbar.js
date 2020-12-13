import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

import NavbarBt from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import GuestButtons from "./GuestButtons";
import LoggedButton from "./LoggedButton";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
  }

  toggle = () => {
    this.setState({
      logged: !this.state.logged,
    });
  };

  componentDidMount = () => {
    console.log(localStorage)
    this.setState({
      logged: false,
    });
  };

  setLog = () => {
    if (localStorage.token) {
      console.log('oh si')
      this.setState({
        logged: true,
      });
    } else {
      console.log('oh no')
      this.setState({
        logged: false,
      });
    }
  }

  render() {
    return (
      <div>
        <NavbarBt
          bg="primary"
          variant="dark"
          fixed="top"
          collapseOnSelect
          expand="md"
        >
          <Link to="/">
            {" "}
            <NavbarBt.Brand>UniBuk</NavbarBt.Brand>{" "}
          </Link>
          <NavbarBt.Toggle aria-controls="responsive-navbar-nav" />
          <NavbarBt.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/resources" className="mr-2">
                {" "}
                Risorse{" "}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/feed" className="mr-2">
                {" "}
                Feed{" "}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="mr-2">
                {" "}
                Chi siamo?{" "}
              </Nav.Link>
            </Nav>

            <Nav>
              {this.state.logged ? (
                <LoggedButton toggle={this.toggle} />
              ) : (
                <GuestButtons toggle={this.toggle} />
              )}
            </Nav>
          </NavbarBt.Collapse>
        </NavbarBt>
      </div>
    );
  }
}
