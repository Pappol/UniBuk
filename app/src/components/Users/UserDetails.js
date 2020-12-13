import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import InsertCreds from "./InsertCreds";
import ResourceAddNew from "./ResourceAddNew";

import Jumbotron from "react-bootstrap/esm/Jumbotron";
import { Form, Table, Card, Accordion, Button } from "react-bootstrap";
import Axios from "axios";
import { Login } from "../Auth/login";
import { ListGroup, Spinner } from "react-bootstrap";

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      seen: false,
      user: {
        studentCreds: {},
        links: {},
        profileImage: String,
      },
      myFollow: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/${match.params.userId}`
    );
    const json = await res.json();
    this.setState({
      user: json.user,
    });
    if (localStorage.myId) {
      this.getFollow();
    }
    const resContents = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/${match.params.userId}/contents`
    );
    const jsonContents = await resContents.json();
    this.setState({
      contents: jsonContents.resources,
    });
  }

  getFollow = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/${localStorage.myId}`
    );
    const json = await res.json();
    this.setState({
      myFollow: json.user.follow,
    });
  };

  showAdd = () => {
    this.setState({
      seen: true,
    });
  };

  hideAdd = () => {
    this.setState({
      seen: false,
    });
  };

  subscribe = async (e) => {
    e.preventDefault();
    const token = "Bearer " + localStorage.token;
    const headers = {
      "Content-type": "application/json",
      Authorization: token,
    };
    const data = [
      {
        propName: "follow",
        value: this.state.user._id,
      },
    ];
    await Axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/user/add/${localStorage.myId}`,
      data,
      {
        headers: headers,
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    const newFollow = [...this.state.myFollow, this.state.user._id];
    // localStorage.setItem("myFollow", JSON.stringify(newFollow));
    this.setState({
      myFollow: newFollow,
    });
    console.log(newFollow);
  };

  unSubscribe = async (e) => {
    e.preventDefault();
    let newFollow = this.state.myFollow;
    newFollow.splice(this.state.myFollow.indexOf(this.state.user._id), 1);
    console.log(newFollow);
    const token = "Bearer " + localStorage.token;
    const headers = {
      "Content-type": "application/json",
      Authorization: token,
    };
    const data = [
      {
        propName: "follow",
        value: newFollow,
      },
    ];
    await Axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/user/${localStorage.myId}`,
      data,
      {
        headers: headers,
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // localStorage.setItem("myFollow", JSON.stringify(newFollow));
    // console.log(localStorage.myfollow);
    this.setState({
      myFollow: newFollow,
    });
  };

  render() {
    const { user, contents, seen } = this.state;
    const { match } = this.props;
    if (typeof user === typeof undefined) {
      return (
        <Jumbotron className="mx-5 my-5">
          <h2>Sorry but that ID is missing :( </h2>
          <Link to={"/users"}>Go back</Link>
        </Jumbotron>
      );
    }
    return (
      <>
        <Jumbotron className="mx-5 my-5">
          <div
            style={{
              float: "right",
              display: "flex",
              justifyContent: "space",
              margin: "0.5% 10%",
            }}
          >
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={user.profileImage}
              alt={user.profileImage}
            ></img>
          </div>
          <h3>
            {user.firstName} {user.lastName}
          </h3>

          {localStorage.myId !== match.params.userId && localStorage.myId ? (
            <>
              {this.state.myFollow.indexOf(this.state.user._id) === -1 ? (
                <Form onSubmit={this.subscribe}>
                  <Button type="submit">Segui</Button>
                </Form>
              ) : (
                <Form onSubmit={this.unSubscribe}>
                  <Button type="submit" variant="outline-dark">
                    Segui già
                  </Button>
                </Form>
              )}
            </>
          ) : (
            false
          )}
          <h4>Dettagli utente</h4>
          <p>e-mail: {user.email}</p>
          <p>name: {user.firstName}</p>
          <p>surname: {user.lastName}</p>
          {typeof user.studentCreds !== "undefined" ? (
            <>
              <h4>Dati universitari</h4>
              <p>Università: {user.studentCreds.university}</p>
              <p>Corso di Laurea: {user.studentCreds.course}</p>
              <p>Anno di corso: {user.studentCreds.year}</p>
            </>
          ) : null}
          <h4>Contacts</h4>
          <p>Website: {user.links.website}</p>
          <p>contactEmail: {user.links.contactEmail}</p>
          <p>linkedin: {user.links.linkedin}</p>
          <p>gitHub: {user.links.gitHub}</p>
          {localStorage.myId === match.params.userId ? (
            <>
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Change Creds
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <InsertCreds
                        userId={this.props.match.params.userId}
                        user={this.state.user}
                      />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <br />
              <Button variant="primary" onClick={this.showAdd}>
                Nuovo Contenuto
              </Button>
            </>
          ) : null}

          {seen ? (
            <ResourceAddNew toggle={this.hideAdd} show={seen} match={match} />
          ) : null}

          <h3>Analytics</h3>
          <Link to={`/users/${match.params.userId}/analytics`}>
            <Button variant="primary">Analytics</Button>
          </Link>

          {contents.length ? <h3>Resources</h3> : null}
          <ListGroup>
            {contents.map((content) => (
              <ListGroup.Item key={user._id}>
                <Link to={`/resources/${content._id}`}>{content.name}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Jumbotron>
      </>
    );
  }
}

export default withRouter(UserDetails);
