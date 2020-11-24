import React, { Component } from 'react';
import Row from 'react-bootstrap/esm/Row';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

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
        <div>
          <p>author: {resource.author}</p>
          <p>description: {resource.description}</p>
          <p>isbn: {resource.isbn}</p>
          <p>title: {resource.title}</p>
          <p></p>
  
          <h3>Questi sono i miei taggg</h3>
          {
            resource.tags.map(tag => (
              <p>{tag}</p>
            ))
          }
  
          <h3>Questi sono i miei commentiiii</h3>
          {
            resource.comments.map(comment => (
              <>
                <p>{comment.text}</p>
                <p>{comment.author}</p>
              </>
            ))
          }
        </div>
      );
    } else if(this.props.resourceType === 'content'){
      return (
       <div>
         <p>creator: {resource.creator}</p>
         <p>date: {resource.date}</p>
         <p>name: {resource.name}</p>
         <p>description: {resource.description}</p>
         <h3>Questi sono i miei commentiiii</h3>
         {
           resource.comments.map(comment => (
             <>
               <p>{comment.rank}</p>
               <p>{comment.text}</p>
               <p>{comment.author}</p>
             </>
           ))
         }
       </div>
      );
    } else {
      return (<div><p>Resource type undefined</p></div>);
    }
  }
}

export default withRouter(Navbar);
