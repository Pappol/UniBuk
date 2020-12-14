import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import InsertCreds from "./InsertCreds";
import ResourceAddNew from "./ResourceAddNew";
import "./User.css";

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
  };

  unSubscribe = async (e) => {
    e.preventDefault();
    let newFollow = this.state.myFollow;
    newFollow.splice(this.state.myFollow.indexOf(this.state.user._id), 1);
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
    this.setState({
      myFollow: newFollow,
    });
  };

  render() {
    const { user, contents, seen } = this.state;
    const { match } = this.props;
    if (typeof user === typeof undefined) {
      return (
        <Jumbotron className="profileInfo">
          <h2>Sorry but that ID is missing :( </h2>
          <Link to={"/users"}>Go back</Link>
        </Jumbotron>
      );
    }
    return (
      <>
        <div class="profileWindow">
          <div class="profileInfo">
            <div class="picture">
              <img
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src={user.profileImage}
                alt={user.profileImage}
              ></img>
            </div>
            <h3 class="title">
              {" "}
              {user.firstName} {user.lastName}{" "}
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
            {typeof user.studentCreds !== "undefined" ? (
              <>
                <p>Università: {user.studentCreds.university}</p>
                <p>Corso di Laurea: {user.studentCreds.course}</p>
                <p>Anno di corso: {user.studentCreds.year}</p>
              </>
            ) : null}
            <h4 class="subtitle">Contacts</h4>
            <p class="subtitle">contactEmail: {user.links.contactEmail}</p>
            <p>
              {user.links.website !== "" ? (
                <a target="_blank" className="ml-2" href={user.links.website}>
                  <Button variant="light"> Sito web</Button>
                </a>
              ) : null}
              {user.links.linkedin !== "" ? (
                <a target="_blank" href={user.links.linkedin}>
                  <Button variant="light" className="ml-2">
                    {" "}
                    Linkedin{" "}
                  </Button>
                </a>
              ) : null}
              {user.links.gitHub !== "" ? (
                <a target="_blank" href={user.links.gitHub}>
                  <Button variant="light" className="ml-2">
                    {" "}
                    Visit Github for collaboration{" "}
                  </Button>
                </a>
              ) : null}
            </p>
          </div>
        </div>
        {this.state.seen ? (
          <ResourceAddNew
            toggle={this.hideAdd}
            show={this.state.seen}
            match={match}
          />
        ) : null}
        <div class="profileInfo">
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
                {" "}
                Nuovo Contenuto{" "}
              </Button>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default withRouter(UserDetails);
