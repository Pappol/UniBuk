import React, { Component } from 'react';
import { FormControl, InputGroup, Button, Container, Row } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchId: String
    }
  }

  goToSearch(event) {
    // If pressed key is Enter
    if (event.charCode === 13) {
      this.props.history.push(`search/${this.state.searchId}`);
    }
  }

  render() {
    return (
      <Container className="vh-100 mb-5 pb-5" >
        <Row className="h-100">
          <div className="col-sm-12 align-self-center mb-5 pb-5">
            <h1 className="row justify-content-center">UniBuk</h1>
            <p className="row justify-content-center">Cosa vuoi studiare oggi?</p>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <Button variant="outline-secondary">➤</Button>
              </InputGroup.Prepend>
              <FormControl
                id='serachBox'
                onKeyPress={(event) => {
                  if (event.charCode === 13) {
                    this.props.history.push(`search/${this.state.searchId}`);
                  }
                }}
                onChange={() => { this.setState({ searchId: document.getElementById('serachBox').value }) }}
              />
              <InputGroup.Append>
                <Link to={`search/${this.state.searchId}`}>
                  <Button variant="primary">Cerca</Button>
                </Link>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Home);
