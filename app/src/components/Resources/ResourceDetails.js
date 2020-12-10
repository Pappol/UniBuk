import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import StarRatings from "react-star-ratings";

import Review from "./Review";
import QA from "./QA";
import ResourceTag from "./ResourceTag";
import ResourceShow from "./ResourceShow";
import ResourceEdit from "./ResourceEdit";

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
    };
  }

  async componentDidMount() {
    console.log(this.props);
    const { match } = this.props;
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${localStorage.kind}/${match.params.resourceId}`
    );
    const json = await res.json();
    if (localStorage.kind === "books") {
      this.setState({
        resource: json.book,
        reviewsDisplay: json.book.comments,
      });
    } else if (localStorage.kind === "contents") {
      this.setState({
        resource: json.content,
        reviewsDisplay: json.content.comments,
      });
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

    console.log(this.state);
  };

  showEdit = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };

  changeState = (newState) => {
    console.log(newState);
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
    console.log("should add the review");
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
      await this.setState({
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
      await this.setState({
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

  render() {
    const { resource } = this.state;
    if (localStorage.kind === "books") {
      return (
        <div>
          <Jumbotron className="mx-5 my-5">
            <ListGroup variant="flush" className="bg-transparent text-dark">
              <h3>Book Info</h3>
              <ListGroup.Item>
                <Image
                  src={
                    `${resource.image}`.startsWith("http://") ||
                    `${resource.image}`.startsWith("https://")
                      ? resource.image
                      : `${process.env.REACT_APP_BACKEND_URL}/${resource.image}`
                  }
                  thumbnail
                ></Image>
              </ListGroup.Item>
              <ListGroup.Item>{resource.author}</ListGroup.Item>
              <ListGroup.Item>{resource.title}</ListGroup.Item>
              <ListGroup.Item>{resource.description}</ListGroup.Item>
              <ListGroup.Item>ISBN: {resource.isbn}</ListGroup.Item>

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
                <ListGroup.Item>
                  <Form onSubmit={this.addQuestion}>
                    <Form.Row>
                      <Col>
                        <Form.Group controlId="question">
                          <Form.Control
                            type="text"
                            placeholder="Submit a question"
                            onChange={(e) => (this.myQuestion = e.target.value)}
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
              </ListGroup>
              <h3>Commenti</h3>
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
    } else if (localStorage.kind === "contents") {
      return (
        <div>
          <Jumbotron>
            <ListGroup>
              <h3>Content Info</h3>
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
                <ListGroup.Item>
                  <Form onSubmit={this.addQuestion}>
                    <Form.Row>
                      <Col>
                        <Form.Group controlId="question">
                          <Form.Control
                            type="text"
                            placeholder="Submit a question"
                            onChange={(e) => (this.myQuestion = e.target.value)}
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
              </ListGroup>
              <h3>Commenti</h3>
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
      return <div>aaaaa</div>;
    }
  }
}

export default withRouter(ResourceDetails);
