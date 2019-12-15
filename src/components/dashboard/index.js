import React, { Component } from 'react';
import { get, uniqueId } from 'lodash';
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
    editBlogPost() {
        console.log('edit');
    }

    deleteBlogPost() {
        console.log('delete');
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
                            <div className="admin-blog-container">
                                <table className="admin-blog-table">
                                    <caption>{user} Blog Posts</caption>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Content</th>
                                            <th>Post Hidden</th>
                                            <th>Publish Date</th>
                                            <th>Category</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                     { blogPosts.map(blog => (
                                         <tr key={uniqueId()}>
                                             <td className="content-td" width="200" key={uniqueId()}> {blog.title} </td>
                                             <td className="content-td" width="200" key={uniqueId()}> {blog.content} </td>
                                             <td width="150" key={uniqueId()}> {blog.isHidden} </td>
                                             <td width="150" key={uniqueId()}> {blog.pub_date} </td>
                                             <td width="150"key={uniqueId()}> {blog.category} </td>
                                             <td width="150" onClick={() => this.editBlogPost()} ><span>Edit</span></td>
                                             <td width="150" onClick={() => this.deleteBlogPost()} ><span>Delete</span></td>
                                         </tr>    
                                        )) }
                                    </tbody>
                                </table>
                            </div>
                        </div>    
                    )
                }
            </div>
        );
    }
}