import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

class Review extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: String
        }
    }

    componentDidMount() {
        this.getAuthorName();
    }

    getAuthorName = async () => {
        console.log(this.props.review.author);
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${this.props.review.author}`);
        const json = await res.json();
        this.setState({
            author: json.user.username
        });
        console.log(this.state.author);
      }

    render() {
        const { review } = this.props;
        const { author } = this.state;
        return (
            <ListGroup>
              <ListGroup.Item>author: {author}</ListGroup.Item>
              <ListGroup.Item>rank: {review.rank}</ListGroup.Item>
              <ListGroup.Item>{review.text}</ListGroup.Item>
            </ListGroup>
        );
    }
}

export default Review