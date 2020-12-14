import React, { Component } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <h1>Su di noi</h1>
        We need to develop an online service for e-commerce that will allow
        University students to sell, buy and search for used books, notes and
        resources. We want to deliver a web version of this service and a client
        application.
        <br /> <br />
        <Row>
          <Col className="col-sm-12 col-md-6 col-lg-3">
            <h3>Filippo Daniotti</h3>A good person <br />
            <Image
              className="w-50"
              src="https://avatars.githubusercontent.com/u/47757310"
              alt="Profile image"
            />
            <br />
            <a href="https://github.com/filippodaniotti">
              <Button
                src="https:// Image.shields.io/badge/GitHub-100000?style=for-the-badge&amp;logo=github&amp;logoColor=white"
                alt="Github"
                className="w-50">
                Github
              </Button>
            </a>{" "}
          </Col>
          <br /><br />
          <Col className="col-sm-12 col-md-6 col-lg-3">
            <h3>Marco Di Francesco</h3>
            Attending CS studies <br />
            <a href="https://github.com/MarcoDiFrancesco">
              <Image
                className=" w-50"
                src="https://avatars.githubusercontent.com/u/7454137"
                alt="Profile image"
              />
              <br />
              <Button src="https:// Image.shields.io/badge/GitHub-100000?style=for-the-badge&amp;logo=github&amp;logoColor=white" className=" w-50">
                Github
              </Button>
            </a>{" "}
          </Col>
          <br /><br />
          <Col className="col-sm-12 col-md-6 col-lg-3">
            <h3>Riccardo Parola</h3>
            Majoring a BD in CS <br />
            <a href="https://github.com/Pappol">
              <Image
                className=" w-50"
                src="https://avatars.githubusercontent.com/u/47860088"
                alt="Profile image"
              />
              <br />
              <Button
                src="https:// Image.shields.io/badge/GitHub-100000?style=for-the-badge&amp;logo=github&amp;logoColor=white"
                alt="Github"
                className=" w-50">
                Github
              </Button>
            </a>{" "}
          </Col>
          <br /><br />
          <Col className="col-sm-12 col-md-6 col-lg-3">
            <h3>Riccardo Peron</h3>
            Another good person <br />
            <a href="https://github.com/RiccardoPeron">
              <Image
                className=" w-50"
                src="https://avatars.githubusercontent.com/u/49777741"
                alt="Profile image"
              />
              <br />
              <Button
                src="https:// Image.shields.io/badge/GitHub-100000?style=for-the-badge&amp;logo=github&amp;logoColor=white"
                alt="Github"
                className=" w-50"
              >
                Github
              </Button>
            </a>{" "}
          </Col>
          <br /><br />
        </Row>
      </>
    );
  }
}
