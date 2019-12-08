import React, { Component } from 'react';
import { startCase, toLower, get } from 'lodash';
import { format } from 'date-fns';
import config from '../../config/photo-config';

export default class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            category,
            content,
            pub_date,
            title,
            user
        } = this.props;

        const photo_url = get(config, category, config.fallback);

        return (
            <div className="blog-container">
                <div className="blog-date">
                    <div className="blog-date-container">{format(new Date(pub_date), 'MM/dd/yyyy')}</div>
                </div>
                <div>
                    <h2 className="blog-title">{title.toUpperCase()}</h2>
                </div>
                <div>
                    <img src={photo_url} alt={config.fallback} className="blog-image"/>
                </div>
                <div className='blog-content'>
                    <h3>{content}</h3>
                </div>
                <div className="blog-post-footer">
                    <div className='blog-post-user'> { user } </div>
                    <div className='blog-post-category'> { category } </div>
                </div> 
            </div>
        );
    }
}