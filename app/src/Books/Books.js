import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ReactDOM from 'react-dom';
import Book from '../Book/Book';

class Books extends Component {
  createBooks = () => {
    let items = [];
    for (const element in this.state.books) {
      console.log("ELEMENT", element)
      items.push(React.createElement(Col, {
        children: React.createElement(Book, this.state.books[element]),
        className: 'col-sm-12 col-md-6 col-lg-4'
      })
      )
    }
    return <Row>{items}</Row>
  }

  submitHandler = async (event) => {
    // event.preventDefault();
    //alert('Ora ti mostro i libri!');
    const res = await fetch('http://localhost:8080/books');
    const json = await res.json();
    const results = await this.setState({
      count: json.count,
      books: json.books
    });
    ReactDOM.render(<this.createBooks />, document.getElementById('booksList'))
  }

  render() {
    return (
      <Container className='p-0' >
        <h1>All Books</h1>
        {/* <Button variant='primary' onClick={this.clickNextPage}>Next</Button> */}
        <Button variant='primary' onClick={this.submitHandler}>Get books</Button>
        <br />
        <div id='booksList'>
          {/* <props.CreateBooks times={this.state.count}></props.CreateBooks> */}
        </div>
      </Container>
      // <Book props={props}>
      //     <p>A book</p>
      // </Book>
    );
  }
}

export default Books;