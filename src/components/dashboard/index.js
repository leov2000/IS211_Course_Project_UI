import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogPosts: []
        };
    }

    componentDidMount() {
        const { location } = this.props;
        const { state } = location;
        const user = get(state, 'user', false);

        if (user) {
            axios
                .get('/admin', { params: { user } })
                .then(res => {
                    const { data } = res;
                    
                    this.setState({blogPosts: data});
                });
        }
    }

    render() {
        const { location } = this.props;
        const { state } = location;
        const user = get(state, 'user', false);
        const { blogPosts } = this.state;
        console.log(blogPosts, 'BLOGPOSTS HERE')
        return (
            <div>
                {
                    !user ? 
                    (<h2>SOMETHING WEIRD HAPPEN. PLEASE LOGIN FROM <a href="/login">login</a></h2>) :
                    (
                        <div className="dashboard-pane">
                            <div>
                                <div>
                                    <span>
                                        Add Blog
                                    </span>
                                </div>
                            </div>
                            <div>
                                <table>
                                    <caption>{user} Blog Posts</caption>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Content</th>
                                            <th>Hide Post</th>
                                            <th>Publish Date</th>
                                            <th>Category</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>    
                    )
                }
            </div>
        );
    }
}