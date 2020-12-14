import React, { Component } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { favs, getFavourites, setFavourites, toShow } from "./Favourites";
import ResourceCard from "./ResourceCard";
import ResourceDetails from "./ResourceDetails";

// var resourcePage;

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "books",
      resources: [],
      myFollow: [],
      favourites: [],
      watchingFavs: false,
      universities: [
        "Università di Trento",
        "Università di Roma",
        "Università di Padova",
      ],
    };
  }

  async componentDidMount() {
    this.getResources(localStorage.kind || "books");
    if (this.props.feed) {
      this.mountFeed();
    }
    await getFavourites();
    this.setState({
      favourites: favs,
    });
  }

  mountFeed = async () => {
    if (localStorage.myId) {
      this.getResources("contents");
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${localStorage.myId}`
      );
      const json = await res.json();
      console.log(json);
      this.setState({
        myFollow: json.user.follow,
      });
      console.table(this.state.myFollow);
    }
  };

  getResources = async (kind) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${kind}`);
    const json = await res.json();
    if (kind === "books") {
      this.setState({
        type: "book",
        resources: json.books,
        watchingFavs: false,
      });
      localStorage.setItem("kind", "books");
    } else if (kind === "contents") {
      this.setState({
        type: "content",
        resources: json.contents,
        watchingFavs: false,
      });
      localStorage.setItem("kind", "contents");
    }
  };

  setFavsStatus = async () => {
    await getFavourites();
    this.setState({
      favourites: favs,
    });
  };

  setFavourites = async (kind) => {
    await setFavourites(kind);
    this.setState({
      resources: toShow,
      watchingFavs: true,
    });
  };

  fileterByUniversity = async (university) => {
    const kind = localStorage.kind;
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/search/university/${kind}/${university}`
    );
    const json = await res.json();
    this.setState({
      resources: json.contents,
    });
  };

  render() {
    const { resources, universities } = this.state;
    return (
      <Switch>
        <Route exact path="/resources">
          <Container className="p-0" fluid="md">
            <h1>Resources</h1>
            <Button
              variant="primary"
              className="mr-2 mb-2"
              onClick={() => this.getResources("books")}
            >
              Libri
            </Button>
            <Button
              variant="primary"
              className="mr-2 mb-2"
              onClick={() => this.getResources("contents")}
            >
              Contenuti
            </Button>
            {localStorage.myId == null || localStorage.myId === "" ? null : (
              <Button
                variant="primary"
                className="mr-2 mb-2"
                onClick={() => this.setFavourites(localStorage.kind)}
              >
                Salvati
              </Button>
            )}
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Filtra per università
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {universities.map((university) => (
                  <Dropdown.Item
                    onClick={() => {
                      this.fileterByUniversity(university);
                    }}
                  >
                    {university}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Row>
              {resources.map((resource) => (
                <Col className="col-sm-12 col-md-6 col-lg-4" key={resource._id}>
                  <ResourceCard resource={resource} />
                </Col>
              ))}
            </Row>
          </Container>
        </Route>
        <Route exact path="/feed">
          <Container className="p-0" fluid="md">
            <h1>My subscriptions</h1>
            {localStorage.myId ? (
              <>
                <Row>
                  {resources.map((resource) => (
                    <>
                      {this.state.myFollow.indexOf(resource.creator) !== -1 ? (
                        <Col
                          className="col-sm-12 col-md-6 col-lg-4"
                          key={resource._id}
                        >
                          <ResourceCard resource={resource} />
                        </Col>
                      ) : (
                        false
                      )}
                    </>
                  ))}
                </Row>
              </>
            ) : (
              <p>
                Per seguire le ultime novità dalle tue iscrizioni effettua il{" "}
                <Link to="/user/login" className="text-primary">
                  login
                </Link>
              </p>
            )}
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
