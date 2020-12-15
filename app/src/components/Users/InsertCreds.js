import React, { Component } from "react";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class InsertCreds extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.user);
    const token = "Bearer " + localStorage.token;

    const toReload = {
      links: {
        website: this.website || this.props.user.links.website,
        contactEmail: this.contactEmail || this.props.user.links.contactEmail,
        linkedin: this.linkedin || this.props.user.links.linkedin,
        gitHub: this.gitHub || this.props.user.links.gitHub,
      },
      studentCreds: {
        university: this.uni || "",
        course: this.course || "",
        year: this.year || "",
      },
      profileImage: this.image || this.props.user.profileImage,
    };

    const headers = {
      "Content-type": "application/json",
      Authorization: token,
    };
    const data = [
      {
        propName: "studentCreds",
        value: {
          university: this.uni || "",
          course: this.course || "",
          year: this.year || "",
        },
      },
      {
        propName: "links",
        value: {
          website: this.website || this.props.user.links.website,
          contactEmail: this.contactEmail || this.props.user.links.contactEmail,
          linkedin: this.linkedin || this.props.user.links.linkedin,
          gitHub: this.gitHub || this.props.user.links.gitHub,
        },
      },
      {
        propName: "profileImage",
        value: this.image || this.props.user.profileImage,
      },
    ];
    console.table(data);
    console.table(headers);
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/v1/user/${this.props.userId}`,
        data,
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.reload(toReload);
    //window.location.reload(false)
  };

  render() {
    return (
      <div>
        <>
          <Form onSubmit={this.handleSubmit}>
            <h4>Inserisci la tua immagine profilo tramite link</h4>
            <Form.Group>
              <Form.Label>Immagine profilo</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={this.props.user.profileImage}
                onChange={(e) => (this.image = e.target.value)}
              />
            </Form.Group>
            <h4>Inserisci la tua università</h4>
            <Form.Group>
              <Form.Label>University</Form.Label>
              <Form.Control
                required
                as="select"
                defaultValue={this.props.user.university || ""}
                onChange={(e) => (this.uni = e.target.value)}
              >
                <option>Scegli</option>
                <option>Università di Trento</option>
                <option>Università di Padova</option>
                <option>Università di Roma</option>
                <option>Università di Pisa</option>
                <option>Università di Milano</option>
                <option>Università di Torino</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Corso</Form.Label>
              <Form.Control
                required
                as="select"
                defaultValue={this.props.user.course || ""}
                onChange={(e) =>
                  (this.course = e.target.value || e.defaultValue)
                }
              >
                <option>Scegli</option>
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
              <Form.Label>Anno</Form.Label>
              <Form.Control
                required
                as="select"
                defaultValue={this.props.user.year || ""}
                onChange={(e) => (this.year = e.target.value || e.defaultValue)}
              >
                <option>Scegli</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>Fuori corso</option>
              </Form.Control>
            </Form.Group>
            <h4>Aggiungi i tuo contatti</h4>
            <Form.Group>
              <Form.Label>Sito web</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={this.props.user.links.website}
                placeholder="Website"
                onChange={(e) =>
                  (this.website = e.target.value || e.defaultValue)
                }
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                defaultValue={this.props.user.links.contactEmail}
                placeholder="Contact email"
                onChange={(e) => (this.contactEmail = e.target.value)}
              />
              <Form.Label>Linkedin</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={this.props.user.links.linkedin}
                placeholder="linkedin"
                onChange={(e) => (this.linkedin = e.target.value)}
              />
              <Form.Label>GitHub</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={this.props.user.links.gitHub}
                placeholder="github"
                onChange={(e) => (this.gitHub = e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Aggiorna Credenziali
            </Button>
          </Form>
        </>
      </div>
    );
  }
}
