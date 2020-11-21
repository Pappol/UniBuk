import React, { Component } from "react";
import Axios from 'axios';

export class Signup extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: this.email,
            password: this.password,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName
        }
        console.table(data);
        Axios.post('http://localhost:8080/user/signup', data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
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
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" onChange={e => this.firstName = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" onChange={e => this.lastName = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="username" onChange={e => this.username = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e => this.email = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e => this.password = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="text" className="form-control" placeholder="Re-enter password" onChange={e => this.checkPw(e.target.value)}/>
                </div>

                {/* <div className="form-group">
                    <label>University</label>
                    <input type="university" className="form-control" placeholder="Enter your university" />
                </div> */}

                {/* <div className="form-group">
                    <label>University</label>
                    <select name = "dropdown">
                        <option value = "trento" selected>Università degli Studi di Trento</option>
                        <option value = "padua">Università degli Studi di Padova</option>
                    </select>
                </div> */}

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                {/* <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p> */}
            </form>
        );
    }
}