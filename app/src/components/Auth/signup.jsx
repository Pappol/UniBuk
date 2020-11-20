import React, { Component } from "react";

export class Signup extends Component {
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="cpassword" className="form-control" placeholder="Re-enter password" />
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
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}