import React, { Component } from 'react';
import { get } from 'lodash';

export default class Dashboard extends Component {
    render() {
        const { location } = this.props;
        const { state } = location;
        const user = get(state, 'user', false);

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