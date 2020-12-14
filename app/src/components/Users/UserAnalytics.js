import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Jumbotron from "react-bootstrap/esm/Jumbotron";
import { Table } from "react-bootstrap";

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [{ content: ["test"] }],
      user: {},
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/${match.params.userId}`
    );
    const json = await res.json();
    this.setState({
      user: json.user,
    });

    const resContents = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/${match.params.userId}/contents`
    );
    const jsonContents = await resContents.json();
    this.setState({
      contents: jsonContents.resources,
    });
  }

  showAdd = () => {
    this.setState({
      seen: true,
    });
  };

  hideAdd = () => {
    this.setState({
      seen: false,
    });
  };

  render() {
    const { user, contents } = this.state;

    if (typeof user === typeof undefined) {
      return (
        <Jumbotron className="mx-5 my-5">
          <h2>Sorry but that ID is missing :( </h2>
          <Link to={"/users"}>Go back</Link>
        </Jumbotron>
      );
    }

    return (
      <>
        <Jumbotron className="mx-5 my-5">
          <div
            style={{
              float: "right",
              display: "flex",
              justifyContent: "space",
              margin: "0.5% 10%",
            }}
          >
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={user.profileImage}
              alt={user.profileImage}
            ></img>
          </div>

          <h3>{`${user.firstName} ${user.lastName}`}</h3>

          {contents.length ? (
            <>
              <p>
                Queste sono le analytics realative alle risorse create da questo
                utente
              </p>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Views</th>
                  </tr>
                </thead>
                <tbody>
                  {contents.map((content) => (
                    <tr>
                      <td>
                        <Link to={`/resources/${content._id}`}>
                          {content.name}
                        </Link>
                      </td>
                      <td>{content.views}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p>Questo utente non ha creato alcun contenuto</p>
          )}
        </Jumbotron>
      </>
    );
  }
}

export default withRouter(UserDetails);
