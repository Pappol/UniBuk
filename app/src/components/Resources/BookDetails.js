import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Review from "./Review";

import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import StarRatings from "react-star-ratings";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {
        tags: [],
        comments: [],
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
      `${process.env.REACT_APP_BACKEND_URL}/books/${match.params.resourceId}`
    );
    const json = await res.json();
    this.setState({
      resource: json.book,
      reviewsDisplay: json.book.comments,
    });
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
    console.table(data);
    console.table(headers);
    console.log(this.props);
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/books/${this.props.match.params.resourceId}/reviews`,
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
          console.table(temp_review);
          console.log("===============");
        }
      }
      await console.table(temp_review);
      await this.setState({
        reviewsDisplay: temp_review,
      });
    }
  };

  render() {
    const { resource } = this.state;
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
  }
}

export default withRouter(BookDetail);
