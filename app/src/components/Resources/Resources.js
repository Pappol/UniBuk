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

// var resourcePage;

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "books",
      resources: [],
      favourites: []
    };
  }

  componentDidMount() {
    this.getResources(localStorage.kind || "books");
    this.getFavourites();
  }

  getResources = async (kind) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${kind}`);
    const json = await res.json();
    if (kind === "books") {
      this.setState({
        type: "book",
        resources: json.books,
      });
      localStorage.setItem('kind', "books");
    } else if (kind === "contents") {
      this.setState({
        type: "content",
        resources: json.contents,
      });
      localStorage.setItem('kind', "contents");
    }
  };

  getFavourites = async () => {
    if(localStorage.myId === null || localStorage.myId === '') {
      this.setState({
        favourites: null,
      });
    } else {
      const usrRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${localStorage.myId}`);
      const json = await usrRes.json();
      const favs = await json.user.favourites;
      this.setState({
        favourites: favs
      });
    }
  };

  setFavourites = async (kind) => {
    const favs = this.state.favourites;
    let favResources = [];

    for( const fav of favs) {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${kind}/${fav}`);
      const jres = await res.json();

      if(typeof(jres.message) === 'undefined' && kind === 'books') {
        favResources.push(jres.book);
      }

      if(typeof(jres.message) === 'undefined' && kind === 'contents') {
        favResources.push(jres.content);
      }
    }
    this.setState({
      resources: favResources
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
