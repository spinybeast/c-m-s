import React, {Component} from 'react';
import Review from './Review';

export default class ReviewList extends Component {
    render() {
        const {reviews} = this.props;
        return (
            <div>
                {reviews.map(review => (
                    <Review key={review.id} review={review}/>
                ))}
            </div>
        )
    }
}