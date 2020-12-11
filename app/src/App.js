import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from './components/About/About';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Resources from './components/Resources/Resources';
import Users from './components/Users/Users';
import { Login, Signup } from './components/Auth/index';

export default class App extends Component {
  render() {
    console.log("process.env.REACT_APP_BACKEND_URL", process.env.REACT_APP_BACKEND_URL);
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/about" component={About}/>
          <Route path="/resources" component={Resources}/>
          <Route path="/users" component={Users}/>
          <Route path="/user/login" component={Login}/>
          <Route path="/user/signup" component={Signup}/>
          <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
