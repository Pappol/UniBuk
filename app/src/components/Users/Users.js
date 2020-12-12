import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route, Switch, withRouter } from "react-router-dom";
import { Jumbotron, Form, Button } from "react-bootstrap";
import UserDetails from "./UserDetails";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actualID: String,
    };
  }

  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/:userId`}>
          <UserDetails />
        </Route>

        <Route path={match.path}>
          <Jumbotron className="mx-5">
            <Form.Label>Inserisci un ID</Form.Label>
            <Form.Control
              id="usrtxt"
              onChange={() => {
                this.setState({
                  actualID: document.getElementById("usrtxt").value,
                });
              }}
            />
            <small id="emailHelp" className="form-text text-muted">
              Try this ID: 5fab1591d9fe8e536c4df412
            </small>
            <Link to={`${match.path}/${this.state.actualID}`}>
              <Button variant="primary">
                Vai all'utente: {this.state.actualID}
              </Button>
            </Link>
          </Jumbotron>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(Users);
