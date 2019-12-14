import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                user: ''
            }
        };
    }

    submitFormRequest(values) {
        console.log(values, 'values here')
        values.preventDefault();
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-form-container">
                    <h2>Login or Sign up!
                        <span className="mini-header-under"></span>
                    </h2>
                    <form name="loginForm" onSubmit={this.submitFormRequest}>
                        <div>
                            <div className='input-container'>
                                <div>
                                    <span>Username</span>
                                </div>
                                <input type="text"/>
                            </div>
                            <div className='input-container'>
                                <div>
                                    <span>Password</span>
                                </div>
                                <input type="password"/>
                            </div>
                        </div>
                        <div className="form-submit-button">
                            <span>SUBMIT</span>
                        </div>
                        {/* <button type="button" className="form-submit-button">SUBMIT</button> */}
                    </form>
                </div>
            </div>
        );
    } 
}