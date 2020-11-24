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
      type: 'none',
      resources: []
    }
  }

  componentDidMount() {
    this.getResources("books");
  }

  getResources = async (kind) => {
    const res = await fetch(`http://localhost:8080/${kind}`);
    const json = await res.json();
    if (kind === 'books') {
      this.setState({
        type: 'book',
        resources: json.books
      }); 
    } else if(kind === 'contents') {
      this.setState({
        type: 'content',
        resources: json.contents
      });  
    }
  }

  render() {
    const { resources } = this.state;
    return (
      <Switch>
        <Route path={`${this.props.match.path}/:resourceId`}>
          <ResourceDetails resourceType = {resources.type}/>
        </Route>
        <Route path="/resources">
          <Container className='p-0' >
            <h1>All Resources</h1>
            <Button variant='primary' onClick={() => this.getResources("books")}>Libri</Button>
            <Button variant='primary' onClick={() => this.getResources("contents")}>Contenuti</Button>
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
