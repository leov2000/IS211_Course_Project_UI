import React, { Component } from 'react';

export default class Login extends Component {

    render() {
        return (
            <div className="login-container">
                <div className="form-container">
                    <h2>Login or Sign up!
                        <span className="mini-header-under"></span>
                    </h2>
                    <form name="loginForm">
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
                        <button className="form-submit-button">SUBMIT</button>
                    </form>
                </div>
            </div>
        );
    } 
}