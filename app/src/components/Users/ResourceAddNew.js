import React, { Component } from 'react';

import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link, withRouter } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/esm/Jumbotron';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

class ResourceAddNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show
    }
  }

  render() {
    return (
      <Modal show = {this.state.show} onHide= {this.props.toggle} >
        <Modal.Header className = 'bg-primary text-light' closeButton>
          <h3> Carica Nuovo </h3>
        </Modal.Header>
        <Modal.Body className = 'bg-primary text-light'>
            <Form>
              <Form.Row>
                <Col> <Button variant = 'light' block> Appunti </Button> </Col>
                <Col> <Button variant = 'light' block> Software </Button> </Col>
              </Form.Row> <br/>
              <Form.Control placeholder = 'Titolo' /> <br/>
              <Form.Control as = 'textarea' row = {3} placeholder = 'Descrizione' /> <br/>
              <Form.Control placeholder = 'Photo Link'/> <br/>
              <Form.Control placeholder = 'Content Link'/>  
            </Form>
        </Modal.Body>
        <Modal.Footer className = 'bg-primary text-light'>
          <Button variant = 'light' type = 'submit'> Carica </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ResourceAddNew;