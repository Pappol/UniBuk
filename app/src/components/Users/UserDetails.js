import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InsertCreds from './InsertCreds';
import ResourceAddNew from './ResourceAddNew'
import './User.css';

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/esm/Jumbotron';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seen: false,
      user: {
        studentCreds: {},
        links: {},
        profileImage: String
      }
    }
  }

  async componentDidMount() {
    const { match } = this.props;
    console.log(this.props);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/${match.params.userId}`
    );
    const json = await res.json();
    this.setState({
      user: json.user,
    });
  }

  showAdd = () => {
    this.setState({
      seen: true
    });
  };

  hideAdd = () => {
    this.setState({
      seen: false
    });
  };


  render() {
    const { user } = this.state;
    const { match } = this.props;
    if( typeof(user) === typeof(undefined)) { 
          return (
            <Jumbotron className = 'profileInfo'>
              <h2>Sorry but that ID is missing :( </h2>
              <Link to = { '/users' }>
                Go back
              </Link>
            </Jumbotron>
          );
        }
    return (
      <>
        <div class='profileWindow'>
          <div class='profileInfo'>
            <div class='picture'>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                    src={user.profileImage}></img>
            </div>
              <h3 class='title'> {user.firstName} {user.lastName} </h3>
              { typeof(user.studentCreds) !== 'undefined' ? 
                <>
                  <p>Università: {user.studentCreds.university}</p>
                  <p>Corso di Laurea: {user.studentCreds.course}</p>
                  <p>Anno di corso: {user.studentCreds.year}</p>
                </> 
                
              : null }
              <h4 class='subtitle'>Contacts</h4>
              <p class='subtitle'>contactEmail: {user.links.contactEmail}</p>
              <p>
                  <a target = '_blank' href = {`${user.links.website}`}>
                    <Button variant = 'light'> Sito web</Button>
                  </a>
                  <a target = '_blank' href = {`${user.links.linkedin}`}>
                    <Button variant = 'light' className = 'ml-5'> Linkedin </Button>
                  </a>
                  <a target = '_blank' href = {`${user.links.gitHub}`}>
                    <Button variant = 'light' className = 'ml-5'> Visit Github for collaboration </Button>
                  </a>
              </p>
                
                </div>
              </div> 
              {localStorage.myId === match.params.userId ?
              <>
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant = 'link' eventKey = '0'>
                        Change Creds
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey = '0'>
                      <Card.Body>
                        <InsertCreds userId={this.props.match.params.userId} user={this.state.user}/>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card> 
                </Accordion>  

                <br/>          
                <Button variant = 'primary' onClick = {this.showAdd}> Nuovo Contenuto </Button>
              </>
              : null}
          
            {this.state.seen ? <ResourceAddNew  toggle = {this.hideAdd} show = {this.state.seen} match = {match}/> : null}

         
      </> 
    )
  }
}

export default withRouter(UserDetails);
