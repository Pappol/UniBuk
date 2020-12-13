import React, { Component } from 'react';
import './ResourceCard.css'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link, withRouter } from 'react-router-dom';

import {isInFavs, editFavourites, getFavourites, favs} from './Favourites'

class ResourceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatorName: String,
      isFav: Boolean
    };
  }

  async componentDidMount() {
    this.getCreatorName();
    await getFavourites();
    await this.setState({
      isFav: isInFavs(this.props.resource._id)
    });
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

  editFavs = async () => {
    await editFavourites(this.props.resource._id);
    await this.setState({
      isFav: isInFavs(this.props.resource._id)
    });
  }

  render() {
    const { resource, match, isFav } = this.props;
    return (
      <Card className='mb-4 box-shadow'>
        <Card.Header>{resource.author}{this.state.creatorName}</Card.Header>
        <Card.Img className = 'cimg' variant='top' src={ `${resource.image}`.startsWith('http://') || `${resource.image}`.startsWith('https://') ? resource.image : `${process.env.REACT_APP_BACKEND_URL}/${resource.image}`}></Card.Img>
        <Card.Body>
          <Card.Title>{resource.title}{resource.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted one">{resource.date}{resource.year}</Card.Subtitle>
          <Card.Text>{resource.description}</Card.Text>
          <Link to={{pathname: `${match.path}/${resource._id}`}}> <Button variant="primary" className = 'mr-2'>Visualizza</Button> </Link>
          { localStorage.myId == null || localStorage.myId == '' ? null :
              <Button variant = { !this.state.isFav ? 'outline-primary' : 'primary' } onClick = {this.editFavs}> { !this.state.isFav ? 'Salva' : 'Rimuovi' } </Button> 
          }
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(ResourceCard);
