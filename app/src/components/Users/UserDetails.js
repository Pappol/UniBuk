import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/esm/Jumbotron';

import Container from 'react-bootstrap/Container'
import Switch from 'react-bootstrap/esm/Switch';
import { withRouter } from 'react-router-dom';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {}
    }
  }

  async componentDidMount() {
    const { match } = this.props;
    console.log(this.props)
    const res = await fetch(`http://localhost:8080/user/${match.params.userId}`);
    const json = await res.json();
    this.setState({
      resource: json.user,
    });
  }

  render() {
    const { resource } = this.state;
    return (
        <Jumbotron className = 'mx-5 my-5'>
          <h3> Profilo Utente </h3>
          <h4>UserDetails</h4>
          <p>e-mail: {resource.email}</p>
          <h4>Student Creeds</h4>
        </Jumbotron>      
    )
  }
}

export default withRouter(UserDetails);