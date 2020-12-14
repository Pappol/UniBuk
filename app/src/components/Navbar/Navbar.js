import React, { Component } from "react";
import { Navbar as NavbarBt, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import GuestButtons from "./GuestButtons";
import LoggedButton from "./LoggedButton";
import "./Navbar.css";

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
    if (localStorage.token) {
      this.setState({
        logged: true,
      });
    } else {
      this.setState({
        logged: false,
      });
    }
  };

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
            <NavbarBt.Brand>UniBuk</NavbarBt.Brand>
          </Link>
          <NavbarBt.Toggle aria-controls="responsive-navbar-nav" />
          <NavbarBt.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/resources" className="mr-2">
                Risorse
              </Nav.Link>
              <Nav.Link as={NavLink} to="/feed" className="mr-2">
                Feed
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="mr-2">
                Chi siamo?
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
