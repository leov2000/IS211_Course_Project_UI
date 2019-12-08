import React, { Component } from 'react';
import Blog from '../blog';

export default class Home extends Component {

    render() {
        return (
            <div className="blogs-view">
                <Blog/>
                <Blog/>
                <Blog/>
                <Blog/>
                <Blog/>
                <Blog/>
            </div>
        );
    } 
}