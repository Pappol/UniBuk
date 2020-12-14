import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from './components/About/About';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Resources from './components/Resources/Resources';
import Users from './components/Users/Users';
import { Login, Signup } from './components/Auth/index';
import Search from './components/Search/Search'
import { Container } from 'react-bootstrap';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Container className="mt-5 p-3">
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/resources" component={Resources} />
            <Route path="/feed"><Resources feed={true} /></Route>
            <Route path="/users" component={Users} />
            <Route path="/user/login" component={Login} />
            <Route path="/user/signup" component={Signup} />
            <Route path="/search" component={Search}></Route>
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}
