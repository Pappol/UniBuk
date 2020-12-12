import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

export class Login extends Component {
  handleSubmit = (e) => {
    let errflag = false;
    e.preventDefault();
    const data = {
      email: this.email,
      password: this.password,
    };
    console.table(data);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, data)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('myId', res.data.id);
        localStorage.setItem('myUni', res.data.university);
        console.log(localStorage);
        this.props.location.query.toggle();
      })
      .then((errflag) => {
        if (!errflag) {
          alert("Successfully logged in");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        errflag = true;
      });
  };

  render() {
    return (
      <Jumbotron className="mx-auto mt-5">
        <h3>SignIn</h3>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => (this.email = e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => (this.password = e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" block>
            Sign in
          </Button>

          <br />
          <Link to="/user/signup" className="text-primary">
            Don't have an account? Sign-up
          </Link>
        </Form>
      </Jumbotron>
    );
  }
}
