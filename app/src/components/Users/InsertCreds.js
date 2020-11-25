import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/esm/Jumbotron';
import axios from 'axios';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class InsertCreds extends Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    const token = "Bearer " + localStorage.token;
    const headers = {
      'Content-type': 'application/json',
      'Authorization': token
    }
    const data = [
      {
        "propName": "studentCreds",
        "value": {
          "university": this.uni,
          "course": this.course,
          "year": this.year
        }
      }
    ];
    console.table(data);
    console.table(headers);
    // console.log(token);
    axios.patch(`${process.env.REACT_APP_BACKEND_URL}/user/${this.props.userId}`, data, {
      headers: headers
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <Form onSubmit={this.handleSubmit}>
            
          <h4>Insert your university</h4>
          <Form.Group>
            <Form.Label>University</Form.Label>
            <Form.Control as="select" defaultValue="Università di Trento" onChange={e => this.uni = e.target.value}>
              <option>Università di Trento</option>
              <option>Università di Padova</option>
              <option>Università di Roma</option>
              <option>Università di Pisa</option>
              <option>Università di Milano</option>
              <option>Università di Torino</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Course</Form.Label>
            <Form.Control as="select" defaultValue="Informatica" onChange={e => this.course = e.target.value || e.defaultValue}>
              <option>Informatica</option>
              <option>Economia</option>
              <option>Giurisprudenza</option>
              <option>Matematica</option>
              <option>Fisica</option>
              <option>Lettere</option>
              <option>Biotecnologie</option>
              <option>Medicina</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Year</Form.Label>
            <Form.Control as="select" defaultValue="1" onChange={e => this.year = e.target.value || e.defaultValue}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>Troppo bro</option>
            </Form.Control>
          </Form.Group>

          <Button variant = 'primary' type = 'submit' block>Change</Button>

          </Form>
        </Jumbotron>
      </div>
    )
  }
}