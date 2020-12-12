import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import './Navbar.css';

import NavbarBt from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import GuestButtons from './GuestButtons'
import LoggedButton from './LoggedButton'

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: false
    }
  }

  toggle = () => {
    this.setState({
      logged: !this.state.logged
    });
  }

  componentDidMount = () => {
    if(localStorage.myId == null || localStorage.myId == '') {
      this.setState({
        logged: false
      });
    } else {
      this.setState({
        logged: true
      });
    }
  }

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

          <Nav>           
            { this.state.logged ? <LoggedButton toggle = {this.toggle} /> : <GuestButtons toggle = {this.toggle} /> }
          </Nav>

        </NavbarBt>

      </div>
    );
  }
}
