import React, { Component } from 'react';
import axios from 'axios'

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
      show: this.props.show,
      appunti: 'outline-light',
      software: 'outline-light',
      name: '',
      description: '',
      image: '',
      url: ''
    }
  }


  appContent = () => {
    this.setState({
      appunti: 'light',
      software: 'outline-light'
    })
  }

  softContent = () => {
    this.setState({
      appunti: 'outline-light',
      software: 'light'
    })
  }

  submitForm = () => {

    this.props.toggle();

    const content = {
      creator: this.props.match.params.userId,
      date: 2020,
      name: this.state.name,
      url: this.state.url,
      description: this.state.description,
      image: this.state.image,
    };

   axios.post(`${process.env.REACT_APP_BACKEND_URL}/v1/contents`, content)
    .then(res => {
      alert(res.data.message);
    })
    .catch(err => {
      alert('err' + err.message);
    })
  }

  render() {
    return (
      <Modal show = {this.state.show} onHide= {this.props.toggle} >
        <Modal.Header className = 'bg-primary text-light' closeButton>
          <h3> Carica Nuovo </h3>
        </Modal.Header>
        <Modal.Body className = 'bg-primary text-light'>
            <Form onSubmit = {this.submitForm} >
              <Form.Row>
                <Col> <Button variant = {this.state.appunti} onClick = {this.appContent} block> Appunti </Button> </Col>
                <Col> <Button variant = {this.state.software} onClick = {this.softContent} block> Software </Button> </Col>
              </Form.Row> <br/>
              <Form.Control placeholder = 'Titolo' onChange = {e => this.setState({ name: e.target.value })}/> <br/>
              <Form.Control as = 'textarea' row = {3} placeholder = 'Descrizione' onChange = {e => this.setState({ description: e.target.value })}/> <br/>
              <Form.Control placeholder = 'Photo Link' onChange = {e => this.setState({ image: e.target.value })}/> <br/>
              <Form.Control placeholder = 'Content Link' onChange = {e => this.setState({ url: e.target.value })}/>  
            </Form>
        </Modal.Body>
        <Modal.Footer className = 'bg-primary text-light'>
          <Button variant = 'light' type = 'submit' onClick = {this.submitForm}> Carica </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ResourceAddNew;