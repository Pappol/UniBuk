import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class SearchList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      books: [],
      users: []
    }
  }

  async componentDidMount() {
    const { query } = this.props.match.params;
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search/${query}`);
    const json = await res.json();
    this.setState({
      contents: json.contents,
      books: json.books,
      users: json.users
    });
  }

  render() {
    const { contents, books, users } = this.state;
    console.log("CONTENTS", contents);
    console.log("BOOKS", books);
    console.log("USERS", users);
    
    return (
      <>
        <h3>Contents</h3>
        <ListGroup>
          {
            contents.map(content => (
              <ListGroup.Item key={content._id}><Link to={`/resources/${content._id}`}>{content.name}</Link></ListGroup.Item>
            ))
          }
        </ListGroup>
        <br />
        <h3>Books</h3>
        <ListGroup>
          {
            books.map(book => (
              <ListGroup.Item key={book._id}><Link to={`/books/${book._id}`}>{book.title}</Link></ListGroup.Item>
            ))
          }
        </ListGroup>
        <br />
        <h3>Users</h3>
        <ListGroup>
          {
            users.map(user => (
              <ListGroup.Item key={user._id}><Link to={`/users/${user._id}`}>{user.firstName}</Link></ListGroup.Item>
            ))
          }
        </ListGroup>
      </>
    );
  }
}

export default withRouter(SearchList);