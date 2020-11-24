import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/esm/Jumbotron';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class InsertCreds extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Form>
            
          <h4>Inseert your university</h4>
          <Form.Group>
            <Form.Label>University</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
              <option>Università di Trento</option>
              <option>Università di Padova</option>
              <option>Università di Roma</option>
              <option>Università di Pisa</option>
              <option>Università di Milano</option>
              <option>Università di Torino</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>University</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
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
            <Form.Control as="select" defaultValue="Choose...">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>Troppo bro</option>
            </Form.Control>
          </Form.Group>

          <Button variant = 'primary' type = 'submit'>Change</Button>

          </Form>
        </Jumbotron>
      </div>
    )
  }
}