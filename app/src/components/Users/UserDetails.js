import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import InsertCreds from './InsertCreds';

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/esm/Jumbotron';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'



class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {}
    }
  }

  async componentDidMount() {
    const { match } = this.props;
    console.log(this.props)
    const res = await fetch(`http://localhost:8080/user/${match.params.userId}`);
    const json = await res.json();
    this.setState({
      resource: json.user,
    });
  }

  render() {
    const { resource } = this.state;
    return (
      <>
        <Jumbotron className = 'mx-5 my-5'>

          <h3> Profilo Utente </h3>
          <h4>UserDetails</h4>
            <p>e-mail: {resource.email}</p>
            <p>name: {resource.firstName}</p>
            <p>surname: {resource.lastName}</p>
          <h4>Student Creeds</h4>
            {/*<p>{resource.studentCreds}</p>*/}
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