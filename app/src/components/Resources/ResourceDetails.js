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
    const res = await fetch(`http://localhost:8080/books/${match.params.resourceId}`);
    const json = await res.json();
    this.setState({
      resource: json.book,
    });
  }

  render() {
    const { resource } = this.state;
    return (
      <div>
        <p>author: {resource.author}</p>
        <p>description: {resource.description}</p>
        <p>isbn: {resource.isbn}</p>
        <p>title: {resource.title}</p>

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
  }
}

export default withRouter(Navbar);
