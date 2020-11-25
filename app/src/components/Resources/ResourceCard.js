import React, { Component } from 'react';
import './ResourceCard.css'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link, withRouter } from 'react-router-dom';

class ResourceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatorName: String
    };
  }

  componentDidMount() {
    this.getCreatorName();
  }

  getCreatorName = async () => {
    if(this.props.resource.creator) {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${this.props.resource.creator}`);
      const json = await res.json();
      this.setState({
        creatorName: json.user.username
      });
    } else {
      this.setState({
        creatorName: null
      });
    }
  }

  render() {
    const { resource, match } = this.props;
    return (
      <Card className='mb-4 box-shadow'>
        <Card.Header>{resource.author}{this.state.creatorName}</Card.Header>
        <Card.Img variant='top' src={`${process.env.REACT_APP_BACKEND_URL}/${resource.image}`}></Card.Img>
        <Card.Body>
          <Card.Title>{resource.title}{resource.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{resource.date}{resource.year}</Card.Subtitle>
          <Card.Text>{resource.description}</Card.Text>
          <Link to={`${match.path}/${resource._id}`}>
            <Button variant="primary">Visualizza</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(ResourceCard);
