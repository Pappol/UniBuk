import React, { Component } from "react";
import axios from "axios";
import Review from "./Review";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default class QA extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { question } = this.props;
    // console.table(this.props);
  }

  addAnswer = async (e) => {
    const { question } = this.props;
    e.preventDefault();
    const token = "Bearer " + localStorage.token;
    const headers = {
      "Content-type": "application/json",
      Authorization: token,
    };
    const data = {
      text: this.myAnswer,
    };
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/v1/${localStorage.kind}/${this.props.rId}/questions/${question._id}`,
        data,
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { question } = this.props;
    return (
      <div>
        <Container className="p-0" fluid="md">
          <Row>
            <p>
              <Col md="auto">
                <b>Domanda</b>:
              </Col>
              <Col md="auto">{question.quest}</Col>
            </p>
          </Row>
          <Row>
            {question.answers.length > 0 ? (
              <p>
                <Col>
                  {" "}
                  <b>Risposta</b>:
                </Col>{" "}
                <Col>
                  {question.answers[0]}
                  <Accordion>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Visualizza altre risposte
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <ul>
                        {question.answers.map((answer) => (
                          <div>
                            {question.answers.indexOf(answer) > 0 ? (
                              <li>
                                <p>{answer}</p>
                              </li>
                            ) : (
                              false
                            )}
                          </div>
                        ))}
                      </ul>
                    </Accordion.Collapse>
                  </Accordion>
                </Col>
              </p>
            ) : (
              true
            )}
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.addAnswer}>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="answer">
                      <Form.Control
                        type="text"
                        placeholder="Rispondi a questa domanda"
                        onChange={(e) => (this.myAnswer = e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button
                      className="btn btn-primary btn-large centerButton"
                      type="submit"
                    >
                      Rispondi
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
