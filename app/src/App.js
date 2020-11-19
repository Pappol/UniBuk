import React, {Component} from 'react';
import ReactDOM from 'react-dom'

import './App.css';
import Book from './Book/Book';

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import CardColumns from 'react-bootstrap/CardColumns'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

var a = 0;
var b = 1;

class App extends Component {
  state = {
    count: 0,
    books: []
  }

  CreateBooks = (props) => {
    let items = [];
    for(let i=0; i<props.times; i++)
      items.push( React.createElement(Col, {
        children: React.createElement(Book, this.state.books[i]),
        className: 'md-4'
        } )
      )
    return <Row>{items}</Row>
  }

  submitHandler = event => {
    event.preventDefault();
    //alert('Ora ti mostro i libri!');
    fetch('http://localhost:8080/books')
      .then( res => res.json() )
      .then(
        (results) => {
          this.setState({
            count: results.count,
            books: results.books
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
      .then(ReactDOM.render(<this.CreateBooks times = {this.state.count}></this.CreateBooks>, document.getElementById('booksList')))
  }

  nextPageHandler = () => {
    console.log('click' + a + '' + b);
    a += 2;
    b += 2;
  }

  render(){
    return (
      <Container className='p-0'>
        <h1>All Books</h1>
        <Button variant = 'primary' onClick = {this.nextPageHandler}>Next</Button>
        <Button variant = 'primary' onClick = {this.submitHandler}>Get books</Button>
        <br />
        <div id = 'booksList'>
          <this.CreateBooks times = {this.state.count}></this.CreateBooks>
        </div>
      </Container>
    );
  }
}

export default App;
