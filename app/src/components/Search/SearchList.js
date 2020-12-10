import React, { Component } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class SearchList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      contents: [],
      users: [],
      loaded: false,
    }
  }

  async componentDidMount() {
    const { query } = this.props.match.params;
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search/${query}`);
    const json = await res.json();
    this.setState({
      contents: json.contents,
      books: json.books,
      users: json.users,
      loaded: true,
    });
  }

  render() {
    const { contents, books, users } = this.state;
    let resultList
    if (this.state.loaded) {
      resultList = (
        <>
          { !books.length && !contents.length && !users.length ? 'La ricerca non ha prodotto risultati' : ''}
          { books.length ? <h3>Books</h3> : '' }
          <ListGroup>
            {
              books.map(book => (
                <ListGroup.Item key={book._id}><Link to={`/resources/${book._id}`}>{book.title}</Link></ListGroup.Item>
              ))
            }
          </ListGroup>
          <br />
          { contents.length ? <h3>Contents</h3> : '' }
          <ListGroup>
            {
              contents.map(content => (
                <ListGroup.Item key={content._id}><Link to={`/resources/${content._id}`}>{content.name}</Link></ListGroup.Item>
              ))
            }
          </ListGroup>
          <br />
          { users.length ? <h3>Users</h3> : '' }
          <ListGroup>
            {
              users.map(user => (
                <ListGroup.Item key={user._id}><Link to={`/users/${user._id}`}>{user.firstName}</Link></ListGroup.Item>
              ))
            }
          </ListGroup>
        </>
      )
    } else {
      resultList = (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    return (
      <>
        <h1>Search results</h1>
        {resultList}
        <br />
      </>
    );
  }
}

export default withRouter(SearchList);