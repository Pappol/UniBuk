import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { ListGroup, Button, Image, Row, Col } from "react-bootstrap";

class ResourceShow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.getCreatorName(this.props);
  }

  edit = () => {
    this.props.toggle();
  };

  render() {
    return (
      <>
        <ListGroup.Item>
          <Row>
            <Col className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <Image
                style={{ height: "25vw", width: "auto" }}
                src={
                  `${this.props.image}`.startsWith("http://") ||
                  `${this.props.image}`.startsWith("https://")
                    ? this.props.image
                    : `${process.env.REACT_APP_BACKEND_URL}/${this.props.image}`
                }
                thumbnail
              ></Image>
            </Col>
            <Col className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
              <ListGroup.Item>
                {" "}
                <a href={this.props.url}> Visualizza il contenuto completo</a>
              </ListGroup.Item>
              <ListGroup.Item>Autore: {this.props.creatorName}</ListGroup.Item>
              <ListGroup.Item>Data: {this.props.date}</ListGroup.Item>
              <ListGroup.Item>Titolo: {this.props.name}</ListGroup.Item>
              <br />
              {localStorage.myId === this.props.creator ? (
                <Button onClick={this.props.toggle} block>
                  Modifica
                </Button>
              ) : null}
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>{this.props.description}</ListGroup.Item>
      </>
    );
  }
}

export default withRouter(ResourceShow);
