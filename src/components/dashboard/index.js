import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';

export default class Dashboard extends Component {

    componentDidMount() {
        const { location } = this.props;
        const { state } = location;
        const user = get(state, 'user', false);

        if (user) {
            axios
                .get('/admin', { params: { user } })
                .then(res => {
                    const { data } = res;
                });
        }
    }

    render() {
        const { location } = this.props;
        const { state } = location;
        const user = get(state, 'user', false);
        console.log(this.state, 'THE STATE');
        console.log(this.props, 'THEPROPS');

        return (
            <div>
                {
                    !user ? 
                    (<h2>SOMETHING WEIRD HAPPEN. PLEASE LOGIN FROM <a href="/login">login</a></h2>) :
                    (<h2>DASHBOARD HERE</h2>)
                }
            </div>
        );
    }
}