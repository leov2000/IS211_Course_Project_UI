import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from '../login';
import Home from '../home';

export default class Landing extends Component {
    
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
