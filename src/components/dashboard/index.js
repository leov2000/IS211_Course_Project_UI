import React, { Component } from 'react';
import { get, uniqueId } from 'lodash';
import axios from 'axios';
import Popup from "reactjs-popup";
console.log(Popup, 'POPUP HERE')

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogPosts: [],
            open: true 
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

    closeModal() {
        this.setState({
            open: false
        });
    }

    render() {
        const { location } = this.props;
        const { state } = location;
        const user = get(state, 'user', false);
        const { blogPosts } = this.state;
        console.log(blogPosts, 'BLOGPOSTS HERE');
        console.log(this.state, 'THE STATE HERE');
        return (
            <div>
                <Popup
                    open={this.state.open}
                    onClose={() => this.closeModal()}
                    contentStyle={{ 
                        padding: "0px",
                        border: "1px white solid",
                        minHeight: "600px",
                        background: "#36D1DC"  
                     }}
                >
                    <div>
                        <h1>hi hi hi</h1>
                    </div>
                </Popup>   
                {
                    !user ? 
                    (<h2>SOMETHING WEIRD HAPPEN. PLEASE LOGIN FROM <a href="/login">login</a></h2>) :
                    (
                        <div className="dashboard-pane">
                            <div>
                                <div>
                                    <h3 className="admin-add-blog">
                                        Add Blog
                                    </h3>
                                </div>
                            </div>
                            <div className="admin-blog-container">
                                <table className="admin-blog-table">
                                    <caption><h2>{user} Blog Posts</h2></caption>
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