import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Route, Switch } from "react-router-dom";
import ResourceCard from "./ResourceCard";
import ResourceDetails from "./ResourceDetails";
import { withRouter } from "react-router-dom";

// var resourcePage;

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "books",
      resources: [],
    };
  }

  componentDidMount() {
    this.getResources(localStorage.kind || "books");
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
            <Button variant="primary" onClick={() => this.getResources("books")}>
              Libri
            </Button>
            <Button variant="primary" onClick={() => this.getResources("contents")}>
              Contenuti
            </Button>
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
