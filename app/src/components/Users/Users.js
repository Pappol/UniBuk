import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import UserDetails from './UserDetails';
import Button from 'react-bootstrap/Button'

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actualID: String
    }
  }

  render() {
    console.log(this.props)
    return (
      <Switch>
        <Route path={`${this.props.match.path}/:userId`} >
          <UserDetails />
        </Route>
        <Route path = {'/users'}>
          <Jumbotron className = 'mx-5'>
            <Form.Label>Inserisci un ID</Form.Label>
            <Form.Control id = 'usrtxt' onChange = { () => {this.setState({actualID: document.getElementById('usrtxt').value}) }}></Form.Control>
            <small id="emailHelp" className="form-text text-muted">Try this ID: 5fab1591d9fe8e536c4df412</small>
            <Link to = { `${this.props.match.path}`+ '/' + this.state.actualID }>
              <Button variant = 'primary'>Vai all'utente: {this.state.actualID}</Button>
            </Link>
          </Jumbotron>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(Users);