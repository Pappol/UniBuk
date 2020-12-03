import axios from 'axios';

import React, { Component } from 'react';
import Col from 'react-bootstrap/Col'
import { withRouter } from 'react-router-dom';

import ResourceTag from './ResourceTag'

import Jumbotron from 'react-bootstrap/Jumbotron'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTag: '',
      resource: {
        tags: [],
        comments: []
      }
    }
  }

  async componentDidMount() {
    const { match } = this.props;
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${this.props.resourceType}s/${match.params.resourceId}`);
    const json = await res.json();
    if(this.props.resourceType === 'book'){
      this.setState({
        resource: json.book,
      });
    }
    else if(this.props.resourceType === 'content'){
      this.setState({
        resource: json.content,
      });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { match } = this.props;
    let taggg = this.state.newTag.split(',');

    const token = "Bearer " + localStorage.token;
    const headers = {
      'Content-type': 'application/json',
      'Authorization': token
    }
    const data = [
      {
        "propName": "tags",
        "value": taggg
      }
    ];

    await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/${this.props.resourceType}s/${match.params.resourceId}`, data, {
      headers: headers
    });

    this.setState(prevState => ({
      resource: {
        ...prevState.resource,
        tags: taggg
      }
    }));

    console.log(this.state);
  }
  

  render() {
    const { resource } = this.state;

    if(this.props.resourceType === 'book'){
      return (

        <Jumbotron className = 'mx-5 my-5'>

          <ListGroup variant = 'flush' className = 'bg-transparent text-dark'> 
          <h3>Book Info</h3>
            <ListGroup.Item><Image src={`${process.env.REACT_APP_BACKEND_URL}/${resource.image}`} thumbnail></Image></ListGroup.Item>
            <ListGroup.Item>author: {resource.author}</ListGroup.Item>
            <ListGroup.Item>description: {resource.description}</ListGroup.Item>
            <ListGroup.Item>isbn: {resource.isbn}</ListGroup.Item>
            <ListGroup.Item>title: {resource.title}</ListGroup.Item>
            <p></p>
    
            <h3>Tag</h3>
            <ListGroup horizontal>
              {
                this.state.resource.tags.map(tag => (
                  <ResourceTag text = {tag}> </ResourceTag>
                ))
              }
            </ListGroup>
            <p></p>
            <h3>Commenti</h3>
            {
              resource.comments.map(comment => (
                <ListGroup>
                  <ListGroup.Item>author: {comment.author}</ListGroup.Item>
                  <ListGroup.Item>{comment.text}</ListGroup.Item>
                </ListGroup>
              ))
            }
          </ListGroup>
        </Jumbotron>
      );
    } else if(this.props.resourceType === 'content'){
      return (
       <Jumbotron>
         <ListGroup>
          <h3>Content Info</h3>
          <ListGroup.Item><Image src={`${process.env.REACT_APP_BACKEND_URL}/${resource.image}`} thumbnail></Image></ListGroup.Item>
          <ListGroup.Item>creator: {resource.creator}</ListGroup.Item>
          <ListGroup.Item>date: {resource.date}</ListGroup.Item>
          <ListGroup.Item>name: {resource.name}</ListGroup.Item>
          <ListGroup.Item>description: {resource.description}</ListGroup.Item>
          <p/>

          <h3>Tag <h4>(edit) </h4> </h3>
            <ListGroup horizontal>
              {
                resource.tags.map(tag => (
                  <ResourceTag text = {tag} />
                ))
              }
              {/* <ResourceTag text = 'add' option = '+' variant = 'info' onClick = { () => this.showForm()} /> */}
            </ListGroup>
            <Form onSubmit = {this.handleSubmit}>
              <Form.Row>
                <Col>
                  <Form.Control  placeholder = 'Your tags is empity :(' defaultValue = {this.state.resource.tags} onChange = { e => this.state.newTag = e.target.value} />              
                </Col>
                <Col>
                  <Button variant = 'primary' type = 'submit'> Aggiungi </Button>
                </Col>
              </Form.Row>
            </Form>
          <p/>

          <h3>Questi sono i miei commentiiii</h3>
          {
            resource.comments.map(comment => (
              <ListGroup>
                <ListGroup.Item>author: {comment.author}</ListGroup.Item>
                <ListGroup.Item>rank: {comment.rank}</ListGroup.Item>
                <ListGroup.Item>{comment.text}</ListGroup.Item>
                <p></p>
              </ListGroup>
            ))
          }
         </ListGroup>
       </Jumbotron>
      );
    } else {
      return (<div><p>Resource type undefined</p></div>);
    }
  }
}

export default withRouter(Navbar);
