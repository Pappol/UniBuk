import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

class ResourceShow extends Component {
  constructor(props) {
    super(props);
  }

  edit = () => {
    this.props.toggle();
  }
    
  render() {
    return(
      <>
        <ListGroup.Item><Image src={ `${this.props.image}`.startsWith('http://') || `${this.props.image}`.startsWith('https://') ? this.props.image : `${process.env.REACT_APP_BACKEND_URL}/${this.props.image}`} thumbnail></Image></ListGroup.Item>
        <ListGroup.Item>link: <a href = {this.props.url}>{this.props.url}</a></ListGroup.Item>
        <ListGroup.Item>creator: {this.props.creator}</ListGroup.Item>
        <ListGroup.Item>date: {this.props.date}</ListGroup.Item>
        <ListGroup.Item>name: {this.props.name}</ListGroup.Item>
        <ListGroup.Item>description: {this.props.description}</ListGroup.Item>
        {localStorage.myId === this.props.creator ? <Button onClick = {this.props.toggle} >Modifica</Button> : null }
      </>
    )
  }
}

export default withRouter(ResourceShow);