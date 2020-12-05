import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: String,
    };
  }

  componentDidMount() {
    this.getAuthorName();
  }

  getAuthorName = async () => {
    // console.log(this.props.review.author);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/${this.props.review.author}`
    );
    const json = await res.json();
    this.setState({
      author: json.user.username,
    });
    // console.log(this.state.author);
  };

  render() {
    const { review } = this.props;
    const { author } = this.state;
    return (
      <>
        <h5>{author}</h5>
        <StarRatings
          rating={review.rank}
          starDimension="15px"
          starSpacing="2px"
          starRatedColor="blue"
        />
        <p>{review.text}</p>
      </>
    );
  }
}

export default Review;
