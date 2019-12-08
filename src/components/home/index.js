import React, { Component } from 'react';
import Blog from '../blog';
import axios from 'axios';

export default class Home extends Component {

    componentDidMount() {
        axios.get('/posts').then(res => console.log(res))
    }

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