import React, { Component } from 'react';

import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import Book from './Book/Book';
import Books from './Books/Books';

class App extends Component {
  state = {
    count: 0,
    books: []
  }

  // nextPageHandler = () => {
  //   console.log('TODO: implement');
  // }

  render() {
    return (
      <BrowserRouter>

        <h1>UniBuk</h1>
        <p>Questa scritta rimarrà in tutto il sito, potrebbe essere sosituita da una TopBar</p>

        <Route path="/" exact={true}>
          <p>Questa è la Root (/), clicca il link sotto per cambiare pagina</p>
          <Link to={`/books/`}>
            <p>VAI A /books/</p>
          </Link>
        </Route>

        <Route path="/books/" exact={true}>
          <Books />
        </Route>

        <Route path="/books/:bookId">
          <Book>{this.props._id}</Book>
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
