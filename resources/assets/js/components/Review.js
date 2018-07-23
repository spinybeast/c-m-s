import React, {Component} from 'react';
import {Translate} from 'react-i18nify';
import _ from 'lodash';

export default class Review extends Component {
    render() {

        let {review} = this.props;
        let socials = _.pickBy(review.socials, function (social) {
            return social !== null;
        });

        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <img
                            className="rounded-circle img-fluid avatar"
                            src={review.photo}
                            alt={review.author}
                        />
                    </div>
                    <div className="col-md-10">
                        <p className="author">
                            {review.author}
                            {review.company &&
                            <span className="company text-muted">&nbsp;({review.company})</span>}
                        </p>
                        <div className="review">
                            <div className="text">
                                {review.text}
                            </div>
                            <div className="socials">
                                {
                                    Object.keys(socials).map((social, index) => (
                                        <a key={index}
                                           href={review.socials[social]}
                                           className={social}
                                           title={social}
                                           target="_blank">
                                        </a>
                                    ))
                                }
                                {_.size(socials) > 0 &&
                                <Translate tag="p" className="here text-muted" value="pages.reviews.hereYouCanFindTheReviewer"/>
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <hr/>

            </div>
        );
    }
}