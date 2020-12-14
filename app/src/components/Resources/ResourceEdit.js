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
    this.state = {
      image: this.props.image,
      link: this.props.link,
      date: this.props.date,
      name: this.props.name,
      description: this.props.description
    };
  }

  edit = async () => {
    //patch content
    const { match } = this.props;

    const token = "Bearer " + localStorage.token;
    const headers = {
      'Content-type': 'application/json',
      'Authorization': token
    }
    const data = [
      {
        "propName": "image",
        "value": this.state.image
      },
      {
        "propName": "url",
        "value": this.state.link
      },
      {
        "propName": "date",
        "value": this.state.date
      },
      {
        "propName": "name",
        "value": this.state.name
      },
      {
        "propName": "description",
        "value": this.state.description
      }
    ];

    await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/${localStorage.kind}/${this.props.genProps.match.params.resourceId}`, data, {
      headers: headers
    });

    const content = {
      image: this.state.image,
      link: this.state.link,
      creator: this.props.creator,
      date: this.state.date,
      name: this.state.name,
      description: this.state.description
    }

    //cambio render
    this.props.change(content);
    this.props.toggle();
  }  

  render() {
    return(
      <>
        <ListGroup.Item> image: <Form.Control defaultValue = {this.props.image}  onChange = {e => this.setState({ image: e.target.value })} /> </ListGroup.Item>
        <ListGroup.Item> link: <Form.Control defaultValue = {this.props.link}  onChange = {e => this.setState({ link: e.target.value })} /> </ListGroup.Item>
        <ListGroup.Item> creator: {this.props.creator} </ListGroup.Item>
        <ListGroup.Item> date: <Form.Control defaultValue = {this.props.date}  onChange = {e => this.setState({ date: e.target.value })} /> </ListGroup.Item>
        <ListGroup.Item> name: <Form.Control defaultValue = {this.props.name}  onChange = {e => this.setState({ name: e.target.value })} /> </ListGroup.Item>
        <ListGroup.Item> description: <Form.Control defaultValue = {this.props.description}  onChange = {e => this.setState({ description: e.target.value })} /> </ListGroup.Item>
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