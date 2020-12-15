import React, { Component } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";

import "./About.css"

export default class Navbar extends Component {
  render() {
    return (
      <>
        <h1>Su di noi</h1>
        <p>
          We need to develop an online service for University book suggestions
          and content sharing that will allow University students ton get
          information about books, notes and resources they can use in their
          courses, as well as donwload contents shared by other users. We want
          to deliver a web version of this service and a client application.
        </p>
        <br /> <br />
        <Row>
          <Col className="col-sm-12 col-md-6 col-lg-3">
            <h3>Filippo Daniotti</h3>Student in computer science at Unitn <br />
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
                className="w-50"
              >
                Github
              </Button>
            </a>{" "}
          </Col>
          <br />
          <br />
          <Col className="col-sm-12 col-md-6 col-lg-3">
            <h4>Marco Di Francesco</h4>
            Student in computer science at Unitn <br />
            <a href="https://github.com/MarcoDiFrancesco">
              <Image 
                className=" w-50"
                src="https://avatars.githubusercontent.com/u/7454137"
                alt="Profile image"
              />
              <br />
              <Button
                src="https:// Image.shields.io/badge/GitHub-100000?style=for-the-badge&amp;logo=github&amp;logoColor=white"
                className=" w-50"
              >
                Github
              </Button>
            </a>{" "}
          </Col>
          <br />
          <br />
          <Col className="col-sm-12 col-md-6 col-lg-3">
            <h3>Riccardo Parola</h3>
            Student in computer science at Unitn <br />
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
                className=" w-50"
              >
                Github
              </Button>
            </a>{" "}
          </Col>
          <br />
          <br />
          <Col className="col-sm-12 col-md-6 col-lg-3">
            <h3>Riccardo Peron</h3>
            Student in computer science at Unitn <br />
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
          <br />
          <br />
        </Row>
      </>
    );
  }
}
