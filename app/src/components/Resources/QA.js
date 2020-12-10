import React, { Component } from "react";
import axios from "axios";
import Review from "./Review";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export default class QA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        answers: [],
      },
    };
  }

  componentDidMount() {
    const { question } = this.props;
    // console.table(this.props);
  }

  render() {
    const { question } = this.props;
    return (
			
      <div>
        <p>
          <b>Domanda</b>: {question.quest}
        </p>
        {question.answers.length > 0 ? (
          <p>
            <b>Risposta</b>: {question.answers[0]}
          </p>
        ) : (
          true
        )}
        {console.table(question.answers)}
        <Accordion>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Visualizza altre risposte
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <ul>
              {question.answers.map(
                (answer) => (
                  <div>
                    {question.answers.indexOf(answer) > 0 ? (
                      <li>
                        <p>{answer}</p>
                      </li>
                    ) : (
                      false
                    )}
                  </div>
                )
                // question.answers.indexOf(answer) > 0 ? <p>{answer}</p> : true;
              )}
            </ul>
          </Accordion.Collapse>
          {/* <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Visualizza altre risposte
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            {/* {question.answers.map((answer) => (
              <p>{answer}</p>
            ))} 
          </Accordion.Collapse> */}
        </Accordion>
      </div>
    );
  }
}
