import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import './Navbar.css';

import NavbarBt from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Navbar extends Component {
  render() {
    return (
      <div>

        <NavbarBt bg = 'primary' variant = 'dark' sticky = 'top'>

          <Link to="/"> <NavbarBt.Brand>UniBuk</NavbarBt.Brand> </Link>

          <Nav className = 'mr-auto'>
            <Nav.Link as = {NavLink} to = '/resources' className = 'mr-2'> Resources </Nav.Link>  
            <Nav.Link as = {NavLink} to = '/users' className = 'mr-2'> Users </Nav.Link>  
            <Nav.Link as = {NavLink} to = '/about' className = 'mr-2'> About </Nav.Link>  
          </Nav>

          <Form inline>
            <Link to="/user/login"> <Button variant = 'outline-light' className = 'mr-2'> Login </Button> </Link>
            <Link to="/user/signup"> <Button variant = 'outline-light'  className = 'mr-2'> Sign-up </Button> </Link>
          </Form>

        </NavbarBt>

      </div>
    );
  }
}
