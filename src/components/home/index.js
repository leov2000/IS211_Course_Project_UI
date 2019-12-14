import React, { Component } from 'react';
import Blog from '../blog';
import axios from 'axios';
import { uniqueId, isEmpty, capitalize } from 'lodash';
import navConfig from '../../config/nav-config';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogList: [],
            active: ''
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

    filterByTopic(navItem) {
        const topic = navItem.toLowerCase();
        axios
            .get('/posts', { params: {topic} })
            .then(res => {
                const { data } = res;
                console.log(res, 'RESPONSE');

                this.setState({
                    active: navItem,
                    blogList: data
                });
            });
    }

    render() {
        const { blogList, active } = this.state;
        console.log(this.state, 'THE STATE')
        console.log(navConfig, 'NAV-CONFIG')
        return (
            <div className="blogs-view">
                <div className="blog-nav-bar">
                {
                    navConfig.map(nav => <h3  className={active === nav ? "blog-nav-item-active" : "blog-nav-item"} key={uniqueId()} onClick={() => this.filterByTopic(nav)} >{nav}</h3>)
                }
                </div>
                {
                    isEmpty(blogList) ? <h2 className="no-posts"> No Posts </h2> : blogList.flatMap(obj => obj.isHidden  === "true" ? [] : <Blog key={uniqueId()} {...obj}/>)
                }
            </div>
        );
    } 
}