import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { LinkExternalIcon } from "@primer/octicons-react";
import { ListGroup, Button, Image, Row, Col } from "react-bootstrap";
import "./ResourceCard.css";


class ResourceShow extends Component {
  edit = () => {
    this.props.toggle();
  };

  render() {
    return (
      <>
        <ListGroup.Item>
          <Row>
            <Col className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <Image class='ResoureCard'
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
                <a
                  href={this.props.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkExternalIcon size={16} /> Visualizza repository
                </a>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to={`/users/${this.props.creator}`}>
                  Autore: {this.props.creatorName}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>Data: {this.props.date}</ListGroup.Item>
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
