import React, { Component } from 'react';
import './ResourceCard.css'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link, withRouter } from 'react-router-dom';

class ResourceCard extends Component {
  render() {
    const { resource, match } = this.props;
    return (
      <Card className='mb-4 box-shadow'>
        <Card.Header>{resource.isbn}</Card.Header>
        <Card.Img variant='top' src=''></Card.Img>
        <Card.Body>
          <Card.Title>{resource.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{resource.author}</Card.Subtitle>
          <Card.Text>{resource.description}</Card.Text>
          <Link to={`${match.path}/${resource._id}`}>
            <Button variant="primary">Visualizza</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(ResourceCard);
