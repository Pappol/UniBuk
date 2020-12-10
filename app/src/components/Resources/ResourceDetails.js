import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Review from "./Review";
import QA from "./QA";

import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import StarRatings from "react-star-ratings";
import Col from "react-bootstrap/Col";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        `${process.env.REACT_APP_BACKEND_URL}/${localStorage.kind}/${this.props.match.params.resourceId}`,
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
        `${process.env.REACT_APP_BACKEND_URL}/${localStorage.kind}/${this.props.match.params.resourceId}`,
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
        <Jumbotron className="mx-5 my-5">
          <ListGroup variant="flush" className="bg-transparent text-dark">
            <h3>Book Info</h3>
            <ListGroup.Item>
              <Image
                src={`${process.env.REACT_APP_BACKEND_URL}/${resource.image}`}
                fluid
                thumbnail
              ></Image>
            </ListGroup.Item>
            <ListGroup.Item>{resource.author}</ListGroup.Item>
            <ListGroup.Item>{resource.title}</ListGroup.Item>
            <ListGroup.Item>{resource.description}</ListGroup.Item>
            <ListGroup.Item>ISBN: {resource.isbn}</ListGroup.Item>

            <h3>Tag</h3>
            {resource.tags.map((tag) => (
              <ListGroup.Item>{tag}</ListGroup.Item>
            ))}
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
      );
    } else if (localStorage.kind === "contents") {
      return (
        <Jumbotron className="mx-5 my-5">
          <ListGroup variant="flush" className="bg-transparent text-dark">
            <h3>Content Info</h3>
            <ListGroup.Item>
              <Image
                src={`${process.env.REACT_APP_BACKEND_URL}/${resource.image}`}
                fluid
                thumbnail
              ></Image>
            </ListGroup.Item>
            <ListGroup.Item>creator: {this.state.creatorName}</ListGroup.Item>
            <ListGroup.Item>date: {resource.date}</ListGroup.Item>
            <ListGroup.Item>name: {resource.name}</ListGroup.Item>
            <ListGroup.Item>description: {resource.description}</ListGroup.Item>
            <h3>Tag</h3>
            {resource.tags.map((tag) => (
              <ListGroup.Item>{tag}</ListGroup.Item>
            ))}
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
      );
    } else {
      console.log("No resource type provided");
    }
  }
}

export default withRouter(BookDetail);
