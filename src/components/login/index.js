import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            error: false
        };
    }

    submitFormRequest() {
        const { user, password } = this.state;
    }

    handleUserInput(event) {
        this.setState(
            { user: event.target.value }
        );
    }

    handlePasswordInput(event) {
        this.setState(
            { password: event.target.value }
        );
    }

    render() {
        const { user, password } = this.state;

        return (
            <div className="login-container">
                <div className="login-form-container">
                    {
                        !this.state.error ? 
                        (<h2>Login or Sign up!
                            <span className="mini-header-under"></span>
                        </h2>) : 
                        (<h2 className="form-login-error">Error! Try again!
                            <span className="mini-header-under-error"></span>
                        </h2>)
                    }
                    <form name="loginForm" onSubmit={() => this.submitFormRequest()}>
                        <div>
                            <div className="input-container">
                                <div>
                                    <span>Username</span>
                                </div>
                                <input type="text" name="user" value={user} onChange={(event) => this.handleUserInput(event)}/>
                            </div>
                            <div className="input-container">
                                <div>
                                    <span>Password</span>
                                </div>
                                <input type="password" name="password" value={password} onChange={(event) => this.handlePasswordInput(event)}/>
                            </div>
                        </div>
                        <div className="form-submit-button">
                            <span onClick={() => this.submitFormRequest()}>SUBMIT</span>
                        </div>
                    </form>
                </div>
            </div>
        );
    } 
}