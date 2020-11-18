import React, {Component} from 'react';
import './App.css';
import Book from './Book/Book';

var a = 0;
var b = 1;

class App extends Component {
  state = {
    books: [
      {isbn: '1234', title: 'Dragon Book', author: 'qu4gl14', year: '1964', editor: 'boh', description: 'lfc'},
      {isbn: '2345', title: 'Harry Potter', author: 'JKR', year: '2000', editor: 'boh', description: 'leviosa non leviosà'},
      {isbn: '3456', title: 'il signore degli anelli', author: 'gandalf', year: '1347', editor: 'boh', description: 'epic sax guy'},
      {isbn: '42', title: 'guida galattica per autostoppisti', author: '42', year: '42', editor: '42', description: '42'}
    ]
  }

  submitHandler = event => {
    event.preventDefault();
    alert('Ora ti mostro i libri!');
    fetch('http://localhost:8080/boooks')
      .then( res => res.json() )
      .then(
        (results) => {
          this.setState({
            books: results.books
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  nextPageHandler = () => {
    console.log('click' + a + '' + b);
    a += 2;
    b += 2;
  }

  render(){
    return (
      <div className = 'App'>
        <h1>All Books</h1>
        <button onClick = {this.nextPageHandler}>Next</button>
        <button onClick = {this.submitHandler}>Get books</button>
        <Book className = 'Book' isbn = {this.state.books[0].isbn} title = {this.state.books[0].title} author = {this.state.books[0].author} year = {this.state.books[0].year} editor = {this.state.books[0].editor} description = {this.state.books[0].description} />
        <Book className = 'Book' isbn = {this.state.books[1].isbn} title = {this.state.books[1].title} author = {this.state.books[1].author} year = {this.state.books[1].year} editor = {this.state.books[1].editor} description = {this.state.books[1].description} />
        <Book className = 'Book' isbn = {this.state.books[2].isbn} title = {this.state.books[2].title} author = {this.state.books[2].author} year = {this.state.books[2].year} editor = {this.state.books[2].editor} description = {this.state.books[2].description} />
        <Book className = 'Book' isbn = {this.state.books[3].isbn} title = {this.state.books[3].title} author = {this.state.books[3].author} year = {this.state.books[3].year} editor = {this.state.books[3].editor} description = {this.state.books[3].description} />
      </div>
    );
  }
}

export default App;
