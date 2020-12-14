import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default class GuestButtons extends Component {
  render(){
    return(
    <Form inline>
      <Link to = {{pathname: '/user/login', query:{toggle:this.props.toggle}}}> <Button variant = 'outline-light' className = 'mr-2'> Login </Button> </Link>
      <Link to="/user/signup"> <Button variant = 'outline-light'  className = 'mr-2'> Sign-up </Button> </Link>
    </Form>
    )
  }
}
 