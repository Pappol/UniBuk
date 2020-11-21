import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <h1>This is my navbar and it's present everywhere is the webiste</h1>
        <Link to="/about">About</Link>
        <br />
        <Link to="/resources">Resources</Link>
        <br />
        <Link to="/users">Users</Link>
        <br />
        <Link to="/user/login">Login</Link>
        <br />
        <Link to="/user/signup">Signup</Link>
        <br />
        <Link to="/">Home</Link>
        <hr />
      </div>
    );
  }
}
