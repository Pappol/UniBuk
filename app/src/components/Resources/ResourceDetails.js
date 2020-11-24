import React, { Component } from 'react';
import Row from 'react-bootstrap/esm/Row';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {
        tags: [],
        comments: []
      }
    }
  }

  async componentDidMount() {
    const { match } = this.props;
    const res = await fetch(`http://localhost:8080/${this.props.resourceType}s/${match.params.resourceId}`);
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
  

  render() {
    const { resource } = this.state;
    if(this.props.resourceType === 'book'){
      return (
        <Jumbotron className = 'mx-5 my-5'>
          <ListGroup variant = 'flush' className = 'bg-transparent text-dark'> 
          <h3>Book Info</h3>
            <ListGroup.Item><Image src={`http://localhost:8080/${resource.image}`} thumbnail></Image></ListGroup.Item>
            <ListGroup.Item>author: {resource.author}</ListGroup.Item>
            <ListGroup.Item>description: {resource.description}</ListGroup.Item>
            <ListGroup.Item>isbn: {resource.isbn}</ListGroup.Item>
            <ListGroup.Item>title: {resource.title}</ListGroup.Item>
            <p></p>
    
            <h3>Questi sono i miei taggg</h3>
            {
              resource.tags.map(tag => (
                <ListGroup.Item>{tag}</ListGroup.Item>
              ))
            }
            <p></p>
            <h3>Questi sono i miei commentiiii</h3>
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
          <ListGroup.Item><Image src={`http://localhost:8080/${resource.image}`} thumbnail></Image></ListGroup.Item>
          <ListGroup.Item>creator: {resource.creator}</ListGroup.Item>
          <ListGroup.Item>date: {resource.date}</ListGroup.Item>
          <ListGroup.Item>name: {resource.name}</ListGroup.Item>
          <ListGroup.Item>description: {resource.description}</ListGroup.Item>
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
