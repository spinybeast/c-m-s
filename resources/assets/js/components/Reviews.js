import React, {Component} from 'react';
import axios from 'axios';

import ReviewPost from './ReviewPost';

export default class Reviews extends Component {
    constructor() {
        super();
        this.state = {
            reviews: []
        }
    }

    componentWillMount() {
        console.log(this);
        axios.get('api/review').then(response => {
            this.setState({
                reviews: response.data
            });
        }).catch(error => {
            console.log('error', error);
        });
    }

    render() {
        return (
            <div>
                {this.state.reviews.map(review => <p key={review.id}>{review.text}</p>)}
                <ReviewPost />
            </div>
        )
    }
}