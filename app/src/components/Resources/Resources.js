import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Route, Switch } from 'react-router-dom';
import ResourceCard from './ResourceCard';
import ResourceDetails from './ResourceDetails'
import { withRouter } from 'react-router-dom';

class Resources extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resources: []
    }
  }

  componentDidMount() {
    this.getResources();
  }

  getResources = async (event) => {
    const res = await fetch('http://localhost:8080/books');
    const json = await res.json();
    this.setState({
      resources: json.books
    });
  }

  render() {
    const { resources } = this.state;
    return (
      <Switch>
        <Route path={`${this.props.match.path}/:resourceId`}>
          <ResourceDetails />
        </Route>
        <Route path="/resources">
          <Container className='p-0' >
            <h1>All Resources</h1>
            <Button variant='primary' onClick={this.getResources}>Aggiorna risorse</Button>
            {
              resources.map(resource => (
                <Row key={resource._id}>
                  <Col className='col-sm-12 col-md-6 col-lg-4'>
                    <ResourceCard resource={resource} />
                  </Col>
                </Row>
              ))
            }
          </Container>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(Resources);
