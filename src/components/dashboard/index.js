import React, { Component } from 'react';
import { get, uniqueId } from 'lodash';
import axios from 'axios';
import Popup from "reactjs-popup";
import categoryConfig from '../../config/nav-config';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogPosts: [],
            open: false,
            formValues: {
                title: '',
                category: '',
                isHidden: '',
                pub_date: '',
                content: ''
            }
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

                    this.setState({ blogPosts: data });
                });
        }
    }

    handleChange(event) {
        const { target } = event;
        const { name, value } = target;
        const { formValues } = this.state;

        this.setState({ formValues: {...formValues, [name]: value} });
    }

    clearFormState() {
        const { formValues } = this.state;
        const formKeys = Object.keys(formValues);
        const resetValues = formKeys.reduce((prev, curr) => ({...prev, [curr]: ''}), {});

        return resetValues;
    }

    blogTemplate() {
        return (
            <div className="modal-container">
                <div className="modal-header">
                    <h1 className="modal-title">New Blog</h1>
                    <span className="modal-close-icon" onClick={() => this.closeModal()}>X</span>
                </div>
                <div className="modal-form">
                    <div>
                        <span>Title</span>
                        <input className="modal-input" type="text" name="title" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="modal-drop-down-container">
                        <div className="modal-drop-down-item">
                            <span>Category</span>
                            <select className="modal-drop-down" name="category" onChange={(e) => this.handleChange(e)}>
                                {
                                    categoryConfig.map(category => <option key={uniqueId()}  value={category.toLowerCase()}>{category}</option>)
                                }
                            </select>
                        </div>
                        <div className="modal-drop-down-item">
                            <span>Hidden</span>
                            <select className="modal-drop-down" name="isHidden" onChange={(e) => this.handleChange(e)}>
                                <option  value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <span>Publish Date</span>
                        <input className="modal-input" name="pub_date" type="date" onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div>
                        <span>Content</span>
                        <input className="modal-input" name="content" type="text" onChange={(e) => this.handleChange(e)}/>
                    </div>
                </div>
                <div className="modal-button">
                    <span className="admin-submit-button">SUBMIT</span>
                </div>
            </div>
        );
    }

    deleteBlogPost() {
        console.log('delete');
    }

    showModal() {
        this.setState({
            open: true
        });
    }

    closeModal() {
        const formValues = this.clearFormState();

        this.setState({
            open: false,
            formValues
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
                        minHeight: "500px",
                        background: "#36D1DC"
                    }}
                >
                    {
                        this.blogTemplate()
                    }
                </Popup>
                {
                    !user ?
                        (<h2>SOMETHING WEIRD HAPPEN. PLEASE LOGIN FROM <a href="/login">login</a></h2>) :
                        (
                            <div className="dashboard-pane">
                                <div className="admin-add-blog-container">
                                    <span className="admin-add-blog" onClick={() => this.showModal()}>
                                        <h3>
                                            Add Blog
                                    </h3>
                                    </span>
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
                                            {blogPosts.map(blog => (
                                                <tr key={uniqueId()}>
                                                    <td className="content-td" width="200" key={uniqueId()}> {blog.title} </td>
                                                    <td className="content-td" width="200" key={uniqueId()}> {blog.content} </td>
                                                    <td width="150" key={uniqueId()}> {blog.isHidden} </td>
                                                    <td width="150" key={uniqueId()}> {blog.pub_date} </td>
                                                    <td width="150" key={uniqueId()}> {blog.category} </td>
                                                    <td width="150" onClick={() => this.editBlogPost()} ><span>Edit</span></td>
                                                    <td width="150" onClick={() => this.deleteBlogPost()} ><span>Delete</span></td>
                                                </tr>
                                            ))}
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