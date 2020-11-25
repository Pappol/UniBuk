import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InsertCreds from './InsertCreds';

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/esm/Jumbotron';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'



class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        studentCreds: {}
      }
    }
  }

  async componentDidMount() {
    const { match } = this.props;
    console.log(this.props)
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${match.params.userId}`);
    const json = await res.json();
    this.setState({
      user: json.user,
    });
  }

  render() {
    const { user } = this.state;
    if( typeof(user) === typeof(undefined)) { 
          return (
            <Jumbotron className = 'mx-5 my-5'>
              <h2>Sorry but that ID is missing :( </h2>
              <Link to = { '/users' }>
                Go back
              </Link>
            </Jumbotron>
          );
        }
    return (
      <>
        <Jumbotron className = 'mx-5 my-5'>

          <h3> Profilo Utente </h3>
          <h4>Dettagli utente</h4>
            <p>e-mail: {user.email}</p>
            <p>name: {user.firstName}</p>
            <p>surname: {user.lastName}</p>
          <h4>Dati universitari</h4>
            <p>Università: {user.studentCreds.university}</p>
            <p>Corso di Laurea: {user.studentCreds.course}</p>
            <p>Anno di corso: {user.studentCreds.year}</p>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant = 'link' eventKey = '0'>
                    Change Creds
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey = '0'>
                  <Card.Body>
                    <InsertCreds userId={this.props.match.params.userId}/>
                  </Card.Body>
                </Accordion.Collapse>
              </Card> 
            </Accordion>  
        </Jumbotron> 
         
      </> 
    )
  }
}

export default withRouter(UserDetails);