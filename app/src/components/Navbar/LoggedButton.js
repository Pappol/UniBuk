import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'

export default class LoggedButton extends Component {

  constructor(props) {
    super(props);
    this.state ={
      userName: null
    }
  }

  getUserName = async () => {

    if(localStorage.myId) {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${localStorage.myId}`);
      const json = await res.json();
      this.setState({
        userName: json.user.username
      });
    } else {
      this.setState({
        userName: null
      });
    }
  }

  componentDidMount() {
    this.getUserName();
  }

  logout = () => {
    localStorage.token = '';
    localStorage.myId = '';
    localStorage.myUni = '';
    console.log(localStorage)
    this.props.toggle()
  }

  render(){
    return(
    <Form inline>
      <Nav.Link as = {NavLink} to = {`/users/${localStorage.myId}`} > <Form.Label> {this.state.userName} </Form.Label> </Nav.Link>
      <Button variant = 'outline-light' className = 'mr-2' onClick = {this.logout}> Logout </Button>
    </Form>
    )
  }
}