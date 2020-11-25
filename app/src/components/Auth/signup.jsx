import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

export class Signup extends Component {

    handleSubmit = e => {
        let errflag = false;
        e.preventDefault();
        const data = {
            email: this.email,
            password: this.password,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName
        }
        console.table(data);
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, data)
            .then(res => {
                console.log(res);
            })
            .then((errflag) => {
                if(!errflag){
                  alert('Successfully signed up');
                }
              })
            .catch(err => {
                console.log(err);
                alert(err);
                errflag = true
            });
    }

    checkPw = (pw) => {
        if (pw !== this.password) {
            console.log('password does not match');
        } else {
            console.log('sagra');
        }
    }

    render() {
        return (
            <Jumbotron className = 'mx-auto mt-5'>
                <h3>Sign Up</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" onChange={e => this.firstName = e.target.value}/>
                    </Form.Group>

                    <Form.Group controlId="formGroupLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" onChange={e => this.lastName = e.target.value}/>
                    </Form.Group>

                    <Form.Group controlId="formGroupUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={e => this.username = e.target.value}/>
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => this.email = e.target.value}/>
                    </Form.Group>

                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => this.password = e.target.value}/>
                    </Form.Group>

                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" onChange={e => this.checkPw(e.target.value)}/>
                    </Form.Group>
                    {/*
                    <Form.Group controlId="formGroupUni">
                        <Form.Label>University</Form.Label>
                        <Form.Control type="university" placeholder="Enter your university"/>
                    </Form.Group>
                    */}

                    <Form.Group controlId="formGroupUni">
                        <Form.Label>University</Form.Label>
                        <Form.Control as="select" defaultValue="Università di Trento" onChange={e => this.uni = e.target.value}>
                        <option>Università di Trento</option>
                        <option>Università di Padova</option>
                        <option>Università di Roma</option>
                        <option>Università di Pisa</option>
                        <option>Università di Milano</option>
                        <option>Università di Torino</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" block>
                        Sign up
                    </Button>
                </Form>
                <br />
            <Link to = '/user/login' className = 'text-primary'>Already have an account? LogIn</Link>

            </Jumbotron>
            
            
        );
    }
}