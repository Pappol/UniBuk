import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export default class LoggedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      profileImage: null,
    };
  }

  getUserName = async () => {
    if (localStorage.myId) {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${localStorage.myId}`
      );
      const json = await res.json();
      this.setState({
        userName: json.user.username,
        profileImage: json.user.profileImage,
      });
    } else {
      this.setState({
        userName: null,
      });
    }
  };

  componentDidMount() {
    this.getUserName();
  }

  logout = () => {
    localStorage.clear();
    this.props.toggle();
  };

  render() {
    return (
      <Form inline>
        <img
          style={{ width: "30px", height: "30px", borderRadius: "80px" }}
          src={this.state.profileImage}
          alt={this.state.profileImage}
        ></img>
        <Nav.Link as={NavLink} to={`/users/${localStorage.myId}`}>
          {" "}
          <Form.Label> {this.state.userName} </Form.Label>{" "}
        </Nav.Link>
        <Link to="/">
          {" "}
          <Button
            variant="outline-light"
            className="mr-2"
            onClick={this.logout}
          >
            {" "}
            Logout{" "}
          </Button>{" "}
        </Link>
      </Form>
    );
  }
}
