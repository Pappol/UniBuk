import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import axios from "axios";
import {
  Jumbotron,
  ListGroup,
  Image,
  Form,
  Button,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";
import StarRatings from "react-star-ratings";

import Review from "./Review";
import QA from "./QA";
import ResourceTag from "./ResourceTag";
import ResourceShow from "./ResourceShow";
import ResourceEdit from "./ResourceEdit";
import Axios from "axios";

import { isInFavs, editFavourites } from "./Favourites";
class ResourceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTag: "",
      edit: false,
      resource: {
        tags: [],
        comments: [],
        questions: [],
      },
      reviewsDisplay: [],
      rate: 0,
      myUniOnly: false,
      isFav: Boolean,
      creatorName: String,
    };
  }

  async componentDidMount() {
    this.setState({
      isFav: isInFavs(this.state.resource._id),
    });
    const { match } = this.props;
    let res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/books/${match.params.resourceId}`
    );
    let json = await res.json();
    if (json.book) {
      this.setState({
        resource: json.book,
        reviewsDisplay: json.book.comments,
      });
      return;
    }
    // If no book is found
    res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/contents/${match.params.resourceId}`
    );
    json = await res.json();
    if (json.content) {
      this.setState({
        resource: json.content,
        reviewsDisplay: json.content.comments,
      });
      Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/contents/${match.params.resourceId}/addView`
      );
      await this.getCreatorName(this.state.resource.creator);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { match } = this.props;
    let taggg = this.state.newTag.split(",");

    const token = "Bearer " + localStorage.token;
    const headers = {
      "Content-type": "application/json",
      Authorization: token,
    };
    const data = [
      {
        propName: "tags",
        value: taggg,
      },
    ];

    await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/${localStorage.kind}/${match.params.resourceId}`,
      data,
      {
        headers: headers,
      }
    );

    this.setState((prevState) => ({
      resource: {
        ...prevState.resource,
        tags: taggg,
      },
    }));
  };

  showEdit = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };

  changeState = (newState) => {
    this.setState((prevState) => ({
      resource: {
        ...prevState.resource,
        image: newState.image,
        link: newState.link,
        creator: newState.creator,
        date: newState.date,
        name: newState.name,
        description: newState.description,
      },
    }));
  };

  changeRating = (newRating, name) => {
    this.setState({
      rate: newRating,
    });
  };

  addReview = async (e) => {
    e.preventDefault();
    const token = "Bearer " + localStorage.token;
    const headers = {
      "Content-type": "application/json",
      Authorization: token,
    };
    const data = [
      {
        propName: "comments",
        value: {
          author: localStorage.myId,
          rank: this.state.rate,
          text: this.reviewText,
        },
      },
    ];
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/${localStorage.kind}/add/${this.props.match.params.resourceId}`,
        data,
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  showMyUni = async (e) => {
    if (this.state.myUniOnly) {
      this.state.myUniOnly = false;
      this.setState({
        reviewsDisplay: this.state.resource.comments,
      });
    } else {
      this.state.myUniOnly = true;
      let temp_review = [];
      for (const review of this.state.reviewsDisplay) {
        let res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/${review.author}`
        );
        let json = await res.json();
        if (localStorage.myUni === json.user.studentCreds.university) {
          temp_review = await [...temp_review, review];
        }
      }
      this.setState({
        reviewsDisplay: temp_review,
      });
    }
  };

  addQuestion = async (e) => {
    e.preventDefault();
    const token = "Bearer " + localStorage.token;
    const headers = {
      "Content-type": "application/json",
      Authorization: token,
    };
    const data = [
      {
        propName: "questions",
        value: {
          quest: this.myQuestion,
        },
      },
    ];
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/${localStorage.kind}/add/${this.props.match.params.resourceId}`,
        data,
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setFav = () => {
    editFavourites(this.state.resource._id);
    this.setState({
      isFav: isInFavs(this.state.resource._id),
    });
  };

  getCreatorName = async (creator) => {
    if (creator) {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${creator}`
      );
      const json = await res.json();
      this.setState({
        creatorName: json.user.username,
      });
    } else {
      this.setState({
        creatorName: null,
      });
    }
  };

  render() {
    const { resource } = this.state;
    if (resource.kind === "book") {
      return (
        <div>
          <Jumbotron className="mx-md-5 my-4 pt-3">
            <ListGroup variant="flush" className="bg-transparent text-dark">
              <h2>{resource.title}</h2>
              <ListGroup.Item>
                <Row>
                  <Col className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <Image
                      style={{ height: "25vw", width: "auto" }}
                      src={
                        `${resource.image}`.startsWith("http://") ||
                        `${resource.image}`.startsWith("https://")
                          ? resource.image
                          : `${process.env.REACT_APP_BACKEND_URL}/${resource.image}`
                      }
                      thumbnail
                    ></Image>
                  </Col>
                  <Col className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                    <ListGroup.Item>Autore: {resource.author}</ListGroup.Item>
                    <ListGroup.Item>ISBN: {resource.isbn}</ListGroup.Item>
                    <br />
                    {localStorage.myId == null ||
                    localStorage.myId == "" ? null : (
                      <Button
                        variant={
                          !this.state.isFav ? "outline-primary" : "primary"
                        }
                        onClick={this.setFav}
                        block
                      >
                        {" "}
                        {!this.state.isFav ? "Salva" : "Rimuovi"}{" "}
                      </Button>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {localStorage.myId == null || localStorage.myId == "" ? null : (
                  <Button
                    variant={!this.state.isFav ? "outline-primary" : "primary"}
                    onClick={this.setFav}
                    block
                  >
                    {!this.state.isFav ? "Salva" : "Rimuovi"}
                  </Button>
                )}
              </ListGroup.Item>
              <ListGroup.Item>{resource.author}</ListGroup.Item>
              <ListGroup.Item>{resource.title}</ListGroup.Item>
              <ListGroup.Item>{resource.description}</ListGroup.Item>
              <br />

              <h3>Tag</h3>
              <ListGroup horizontal>
                {this.state.resource.tags.map((tag) => (
                  <ResourceTag text={tag}> </ResourceTag>
                ))}
              </ListGroup>
              <p></p>
              <h3>Domande e risposte dagli utenti</h3>
              <ListGroup variant="flush">
                {resource.questions.map((question) => (
                  <ListGroup.Item>
                    <QA
                      question={question}
                      rId={this.props.match.params.resourceId}
                    />
                  </ListGroup.Item>
                ))}
                {localStorage.token ? (
                  <>
                    <ListGroup.Item>
                      <Form onSubmit={this.addQuestion}>
                        <Form.Row>
                          <Col>
                            <Form.Group controlId="question">
                              <Form.Control
                                type="text"
                                placeholder="Submit a question"
                                onChange={(e) =>
                                  (this.myQuestion = e.target.value)
                                }
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Button
                              className="btn btn-primary btn-large centerButton"
                              type="submit"
                            >
                              Publish
                            </Button>
                          </Col>
                        </Form.Row>
                      </Form>
                    </ListGroup.Item>
                  </>
                ) : (
                  <ListGroup.Item>
                    <p>
                      Effettua il{" "}
                      <Link to="/user/login" className="text-primary">
                        login
                      </Link>{" "}
                      per fare una domanda
                    </p>
                  </ListGroup.Item>
                )}
              </ListGroup>
              <h3>Commenti</h3>
              {localStorage.token ? (
                <>
                  <Form onSubmit={this.addReview}>
                    <Form.Group controlId="addReviewArea">
                      <Form.Label>Write a comment</Form.Label>
                      <br />
                      <StarRatings
                        rating={this.state.rate}
                        starRatedColor="blue"
                        starHoverColor="blue"
                        starDimension="30px"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name="rating"
                      />
                      <Form.Control
                        as="textarea"
                        rows={2}
                        onChange={(e) => (this.reviewText = e.target.value)}
                        required
                      />
                      <Button variant="primary" type="submit" size="sm">
                        Publish
                      </Button>
                    </Form.Group>
                  </Form>
                </>
              ) : (
                <>
                  <p>
                    Effettua il{" "}
                    <Link to="/user/login" className="text-primary">
                      login
                    </Link>{" "}
                    per scrivere una recensione
                  </p>
                </>
              )}
              <br />
              {resource.comments.length > 0 ? (
                <Form>
                  <div key="myUni" className="mb-3">
                    <Form.Check
                      custom
                      id="myUni"
                      label="Show comments only from my University"
                      onChange={this.showMyUni}
                    />
                  </div>
                </Form>
              ) : (
                false
              )}
              <ListGroup variant="flush">
                {this.state.reviewsDisplay.map((review) => (
                  <ListGroup.Item>
                    <Review review={review} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup>
          </Jumbotron>
        </div>
      );
    } else if (resource.name) {
      return (
        <div>
          <Jumbotron className="mx-md-5 my-4 pt-3">
            <ListGroup>
              <h3>{resource.name}</h3>
              {localStorage.myId == null || localStorage.myId == "" ? null : (
                <Button
                  variant={!this.state.isFav ? "outline-primary" : "primary"}
                  onClick={this.setFav}
                >
                  Salva
                </Button>
              )}
              {this.state.edit ? (
                <ResourceEdit
                  toggle={this.showEdit}
                  change={this.changeState}
                  genProps={this.props}
                  image={resource.image}
                  link={resource.url}
                  creator={resource.creator}
                  date={resource.date}
                  name={resource.name}
                  description={resource.description}
                />
              ) : (
                <ResourceShow
                  creatorName={this.state.creatorName}
                  toggle={this.showEdit}
                  image={resource.image}
                  link={resource.url}
                  creator={resource.creator}
                  date={resource.date}
                  name={resource.name}
                  description={resource.description}
                />
              )}
              <p />
              <br />
              <h3>Tag</h3>
              <ListGroup horizontal>
                {resource.tags.map((tag) => (
                  <ResourceTag text={tag} />
                ))}
                {/* <ResourceTag text = 'add' option = '+' variant = 'info' onClick = { () => this.showForm()} /> */}
              </ListGroup>
              {localStorage.myId === resource.creator ? (
                <Form onSubmit={this.handleSubmit}>
                  <Form.Row>
                    <Col>
                      <Form.Control
                        placeholder="Your tag bar is empty :("
                        defaultValue={this.state.resource.tags}
                        onChange={(e) => (this.state.newTag = e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Button variant="primary" type="submit">
                        {" "}
                        Aggiungi{" "}
                      </Button>
                    </Col>
                  </Form.Row>
                </Form>
              ) : null}
              <p />
              <h3>Domande e risposte dagli utenti</h3>
              <ListGroup variant="flush">
                {resource.questions.map((question) => (
                  <ListGroup.Item>
                    <QA
                      question={question}
                      rId={this.props.match.params.resourceId}
                    />
                  </ListGroup.Item>
                ))}
                {localStorage.token ? (
                  <>
                    <ListGroup.Item>
                      <Form onSubmit={this.addQuestion}>
                        <Form.Row>
                          <Col>
                            <Form.Group controlId="question">
                              <Form.Control
                                type="text"
                                placeholder="Submit a question"
                                onChange={(e) =>
                                  (this.myQuestion = e.target.value)
                                }
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Button
                              className="btn btn-primary btn-large centerButton"
                              type="submit"
                            >
                              Publish
                            </Button>
                          </Col>
                        </Form.Row>
                      </Form>
                    </ListGroup.Item>
                  </>
                ) : (
                  <ListGroup.Item>
                    <p>
                      Effettua il{" "}
                      <Link to="/user/login" className="text-primary">
                        login
                      </Link>{" "}
                      per fare una domanda
                    </p>
                  </ListGroup.Item>
                )}
              </ListGroup>
              <h3>Commenti</h3>
              {localStorage.token ? (
                <>
                  <Form onSubmit={this.addReview}>
                    <Form.Group controlId="addReviewArea">
                      <Form.Label>Write a comment</Form.Label>
                      <br />
                      <StarRatings
                        rating={this.state.rate}
                        starRatedColor="blue"
                        starHoverColor="blue"
                        starDimension="30px"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name="rating"
                      />
                      <Form.Control
                        as="textarea"
                        rows={2}
                        onChange={(e) => (this.reviewText = e.target.value)}
                        required
                      />
                      <Button variant="primary" type="submit" size="sm">
                        Publish
                      </Button>
                    </Form.Group>
                  </Form>
                </>
              ) : (
                <>
                  <p>
                    Effettua il{" "}
                    <Link to="/user/login" className="text-primary">
                      login
                    </Link>{" "}
                    per scrivere una recensione
                  </p>
                </>
              )}
              <br />
              {resource.comments.length > 0 ? (
                <Form>
                  <div key="myUni" className="mb-3">
                    <Form.Check
                      custom
                      id="myUni"
                      label="Show comments only from my University"
                      onChange={this.showMyUni}
                    />
                  </div>
                </Form>
              ) : (
                false
              )}
              <ListGroup variant="flush">
                {resource.comments.map((comment) => (
                  <ListGroup.Item>
                    <Review review={comment} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup>
          </Jumbotron>
        </div>
      );
    } else {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
  }
}

export default withRouter(ResourceDetails);
