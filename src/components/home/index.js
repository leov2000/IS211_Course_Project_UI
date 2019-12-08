import React, { Component } from 'react';
import Blog from '../blog';
import axios from 'axios';
import { uniqueId, isEmpty } from 'lodash';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogList: []
        }
    }

    componentDidMount() {
        axios
            .get('/posts')
            .then(res => {
                const { data } = res;

                this.setState({blogList: data});
            });
    }

    render() {
        const { blogList } = this.state;
        return (
            <div className="blogs-view">
                {
                    isEmpty(blogList) ? <h2 className="no-posts"> No Posts </h2> : blogList.flatMap(obj => obj.isHidden  === "true" ? [] : <Blog key={uniqueId()} {...obj}/>)
                }
            </div>
        );
    } 
}