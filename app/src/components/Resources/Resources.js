import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link, Route, Switch } from "react-router-dom";
import ResourceCard from "./ResourceCard";
import ResourceDetails from "./ResourceDetails";
import { withRouter } from "react-router-dom";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import axios from 'axios'

import {isInFavs, editFavourites, getFavourites, favs, setFavourites, toShow} from './Favourites'

// var resourcePage;

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "books",
      resources: [],
      favourites: [],
      watchingFavs: false
    };
  }

  async componentDidMount() {
    this.getResources(localStorage.kind || "books");
    await getFavourites();
    await this.setState({
      favourites: favs
    });
    await console.log(this.state.favourites)
  }

  getResources = async (kind) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${kind}`);
    const json = await res.json();
    if (kind === "books") {
      this.setState({
        type: "book",
        resources: json.books,
        watchingFavs: false
      });
      localStorage.setItem('kind', "books");
    } else if (kind === "contents") {
      this.setState({
        type: "content",
        resources: json.contents,
        watchingFavs: false
      });
      localStorage.setItem('kind', "contents");
    }
  };

  setFavsStatus = async () => {
    await getFavourites();
    await this.setState({
      favourites: favs
    });
  }

  setFavourites = async (kind) => {
    await setFavourites(kind)
    await this.setState({
        resources: toShow,
        watchingFavs: true
      });
  }

  // getResourcePage = () => {
  //   if (this.state.type === 'book') {
  //     resourcePage = <BookDetails />;
  //   } else if (this.state.type === 'content') {
  //     resourcePage = <ContentDetails />;
  //   }
  //   return resourcePage;
  // };

  render() {
    const { resources } = this.state;
    //console.log(this.state)
    return (
      <Switch>
        <Route exact path="/resources">
          <Container className="p-0" fluid="md">
            <h1>All Resources</h1>
            <Button variant="primary" className = 'mr-2 mb-2' onClick={() => this.getResources("books")}>
              Libri
            </Button>
            <Button variant="primary" className = 'mr-2 mb-2' onClick={() => this.getResources("contents")}>
              Contenuti
            </Button>
            {this.state.favourites == null ? null :
            <Button variant = 'primary' className = 'mr-2 mb-2' onClick = {() => this.setFavourites(localStorage.kind)}>
              {this.state.type} Salvati
            </Button>
            }
              <Row>
                {resources.map(resource => (
                  <Col className="col-sm-12 col-md-6 col-lg-4" key={resource._id}>
                    <ResourceCard resource={resource} />
                  </Col>
                ))}
              </Row>
          </Container>
        </Route>
        <Route exact path={`${this.props.match.path}/:resourceId`}>
          <ResourceDetails />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(Resources);
