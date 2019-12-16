import React, { Component } from 'react';
import { get, uniqueId, every, isEmpty } from 'lodash';
import axios from 'axios';
import Popup from "reactjs-popup";
import categoryConfig from '../../config/nav-config';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogPosts: [],
            open: false,
            triggerType: '',
            formValues: {
                title: '',
                category: '',
                isHidden: '',
                pub_date: '',
                content: ''
            },
            editValue: []
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

        this.setState({ formValues: { ...formValues, [name]: value } });
    }

    clearFormState() {
        const { formValues } = this.state;
        const formKeys = Object.keys(formValues);
        const resetValues = formKeys.reduce((prev, curr) => ({ ...prev, [curr]: '' }), {});

        return resetValues;
    }

    extractFormValues() {
        const { location } = this.props;
        const { state } = location;
        const { formValues } = this.state;
        const requestObject = { ...formValues, ...state };

        return requestObject;
    }

    handleFormSubmission() {
        const requestObject = this.extractFormValues();

        axios
            .post('/posts', { requestObject })
            .then(res => {
                const { data } = res;
                const formValues = this.clearFormState();
                this.setState({
                    open: false,
                    formValues,
                    blogPosts: data
                });
            })
    }

    extractEditValues() {
        const { editValue } = this.state;
        const { post_id } = editValue;

        return {
            post_id
        };
    }

    handleEditFormSubmission() {
        const formValues = this.extractFormValues();
        const blogPostId = this.extractEditValues();
        const requestObject = { ...formValues, ...blogPostId };

        axios
            .put('/posts', { requestObject })
            .then(res => {
                console.log(res, 'RES');
                this.closeModal();
            });
    }

    deleteBlogPost(index, array) {
        const { location } = this.props;
        const { state } = location;
        const blogPost = array[index];
        const { post_id } = blogPost;
        const requestObject = { ...state, ...post_id }

        axios
            .delete('/posts', { requestObject })
            .then(res => {
                console.log(res, 'RES');
            });
    }

    pluckValuesFromEdit(editObj) {
        const { content, title, pub_date, category, isHidden } = editObj;

        return {
            content,
            title,
            pub_date,
            category,
            isHidden
        }
    }

    showEditBlogModal(triggerType, index, array) {
        const formValues = this.pluckValuesFromEdit(array[index]);

        this.setState({
            open: true,
            triggerType,
            editValue: array[index],
            formValues
        });
    }

    showBlogModal(triggerType) {
        this.setState({
            open: true,
            triggerType
        });
    }

    closeModal() {
        const formValues = this.clearFormState();

        this.setState({
            open: false,
            formValues
        });
    }

    editBlogTemplate() {
        const { formValues } = this.state;
        const { content, title, pub_date, category, isHidden } = formValues;
        const formResult = Object.keys(formValues);
        console.log(this.state, 'THE STATE FROM EDIT');

        return (
            <div className="modal-container">
                <div className="modal-header">
                    <h1 className="modal-title">Edit Blog</h1>
                    <span className="modal-close-icon" onClick={() => this.closeModal()}>X</span>
                </div>
                <div className="modal-form">
                    <div>
                        <span>Title</span>
                        <input className="modal-input" type="text" name="title" onChange={(e) => this.handleChange(e)} value={title} />
                    </div>
                    <div className="modal-drop-down-container">
                        <div className="modal-drop-down-item">
                            <span>Category</span>
                            <select className="modal-drop-down" value={category} name="category" onChange={(e) => this.handleChange(e)} required>
                                <option value="">None</option>
                                <option value="all">All</option>
                                <option value="sports">Sports</option>
                                <option value="lifestyle">Lifestyle</option>
                                <option value="politics">Politics</option>
                                <option value="fashion">Fashion</option>
                                <option value="architecture">Architecture</option>
                                <option value="local">Local</option>
                                <option value="eats">Eats</option>
                                <option value="home">Home</option>
                                <option value="finance">Finance</option>
                            </select>
                        </div>
                        <div className="modal-drop-down-item">
                            <span>Hidden</span>
                            <select className="modal-drop-down" value={isHidden} name="isHidden" onChange={(e) => this.handleChange(e)} required>
                                <option value="">None</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <span>Publish Date</span>
                        <input className="modal-input" name="pub_date" type="date" onChange={(e) => this.handleChange(e)} value={pub_date} />
                    </div>
                    <div>
                        <span>Content</span>
                        <input className="modal-input" name="content" type="text" onChange={(e) => this.handleChange(e)} value={content} />
                    </div>
                </div>
                {
                    every(formResult, Boolean) ?
                        (<div className="modal-button">
                            <span className="admin-submit-button" onClick={() => this.handleEditFormSubmission()}>SUBMIT</span>
                        </div>) :
                        (<div className="modal-button">
                            <span className="admin-submit-button">FILL OUT ALL FIELDS</span>
                        </div>
                        )
                }
            </div>
        );
    }

    blogTemplate() {
        const { formValues } = this.state;
        const { category, isHidden } = formValues;
        const formResult = Object.values(formValues);

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
                            <select className="modal-drop-down" value={category} name="category" onChange={(e) => this.handleChange(e)} required>
                                <option value="">None</option>
                                <option value="sports">Sports</option>
                                <option value="lifestyle">Lifestyle</option>
                                <option value="politics">Politics</option>
                                <option value="fashion">Fashion</option>
                                <option value="architecture">Architecture</option>
                                <option value="local">Local</option>
                                <option value="eats">Eats</option>
                                <option value="home">Home</option>
                                <option value="finance">Finance</option>
                            </select>
                        </div>
                        <div className="modal-drop-down-item">
                            <span>Hidden</span>
                            <select className="modal-drop-down" value={isHidden} name="isHidden" onChange={(e) => this.handleChange(e)} required>
                                <option value="">None</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <span>Publish Date</span>
                        <input className="modal-input" name="pub_date" type="date" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div>
                        <span>Content</span>
                        <input className="modal-input" name="content" type="text" onChange={(e) => this.handleChange(e)} />
                    </div>
                </div>
                {
                    every(formResult, Boolean) ?
                        (<div className="modal-button">
                            <span className="admin-submit-button" onClick={() => this.handleFormSubmission()}>SUBMIT</span>
                        </div>) :
                        (<div className="modal-button">
                            <span className="admin-submit-button">FILL OUT ALL FIELDS</span>
                        </div>
                        )
                }
            </div>
        );
    }
    
    render() {
        const { location } = this.props;
        const { state } = location;
        const user = get(state, 'user', false);
        const { blogPosts, triggerType } = this.state;

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
                        triggerType === 'blog' ? this.blogTemplate() : triggerType === 'edit' ? this.editBlogTemplate() : <div></div>
                    }
                </Popup>
                {
                    !user ?
                        (<h2>SOMETHING WEIRD HAPPEN. PLEASE LOGIN FROM <a href="/login">login</a></h2>) :
                        (
                            <div className="dashboard-pane">
                                <div className="admin-add-blog-container">
                                    <span className="admin-add-blog" onClick={() => this.showBlogModal('blog')}>
                                        <h3>
                                            Add Blog
                                    </h3>
                                    </span>
                                </div>
                                {
                                    !isEmpty(blogPosts) ?
                                        (<div className="admin-blog-container">
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
                                                    {blogPosts.map((blog, idx, arr) => (
                                                        <tr key={uniqueId()}>
                                                            <td className="content-td" width="200" key={uniqueId()}> {blog.title} </td>
                                                            <td className="content-td" width="200" key={uniqueId()}> {blog.content} </td>
                                                            <td width="150" key={uniqueId()}> {blog.isHidden} </td>
                                                            <td width="150" key={uniqueId()}> {blog.pub_date} </td>
                                                            <td width="150" key={uniqueId()}> {blog.category} </td>
                                                            <td width="150" className="cursor-td-cell" onClick={() => this.showEditBlogModal('edit', idx, arr)} ><span>Edit</span></td>
                                                            <td width="150" className="cursor-td-cell" onClick={() => this.deleteBlogPost(idx, arr)} ><span>Delete</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>) :
                                        (<div className="no-blog-message"><h2>You Currently Have No Blog Posts</h2></div>)
                                }
                            </div>
                        )
                }
            </div>
        );
    }
}