import React, { Component } from 'react';
import './Book.css'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Book extends Component {
  render() {
    console.log("BOOK", this.props);
    return (
      <Card className='mb-4 box-shadow' >
        <Card.Header>{this.props.isbn}</Card.Header>
        <Card.Img variant='top' src=''></Card.Img>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.author}</Card.Subtitle>
          <Card.Text>{this.props.description}</Card.Text>
          <Button variant="primary">Visualizza</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Book;