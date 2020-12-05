import React, { Component } from 'react';
import { FormControl, InputGroup, Button, Container, Row } from 'react-bootstrap';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import SearchList from './SearchList.js';

class Search extends Component {

  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/:query`} >
          <SearchList />
        </Route>

        <Route path={match.path}>
          <p>Nothing to show here!</p>
          <h1>
            <Link to={'/'}>
              Go back
            </Link>
          </h1>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(Search);