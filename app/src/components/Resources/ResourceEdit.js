import axios from 'axios';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class ResourceEdit extends Component {

  constructor(props) {
    super(props);
  }

  edit = () => {
    //patch content
    this.props.toggle();
  }  

  render() {
    return(
      <>
        <ListGroup.Item> image: <Form.Control defaultValue = {this.props.image} /> </ListGroup.Item>
        <ListGroup.Item> link: <Form.Control defaultValue = {this.props.link} /> </ListGroup.Item>
        <ListGroup.Item> creator: {this.props.creator} </ListGroup.Item>
        <ListGroup.Item> date: <Form.Control defaultValue = {this.props.date} /> </ListGroup.Item>
        <ListGroup.Item> name: <Form.Control defaultValue = {this.props.name} /> </ListGroup.Item>
        <ListGroup.Item> description: <Form.Control defaultValue = {this.props.description} /> </ListGroup.Item>
        <ListGroup.Item>
          <Form.Row>
            <Col> <Button variant = 'primary' onClick = {this.edit} block> Modifica </Button> </Col>
            <Col> <Button variant = 'outline-primary' onClick = {this.props.toggle} block> Annulla </Button> </Col>
          </Form.Row>
        </ListGroup.Item>
        <p></p>
      </>
    )
  }
}

export default withRouter(ResourceEdit);