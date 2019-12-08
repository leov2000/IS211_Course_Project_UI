import React, { PureComponent } from 'react';

export default class Header extends PureComponent {
    render() {
        return (
            <div>
                <h1 className="header-container">
                    The Marvelous Blog
                </h1>
                <span className="header-under"></span>
            </div>

        )
    }
}