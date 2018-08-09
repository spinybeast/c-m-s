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
            <div className="review d-flex flex-column align-items-center justify-content-between">
                <div className="text">
                    <i className="fa fa-quote-left">&nbsp;</i>
                    {review.text}
                </div>
                <div className="d-flex flex-row justify-content-center pt-3">
                    <img
                        className="rounded-circle img-fluid avatar"
                        src={review.photo}
                        alt={review.author}
                    />
                    <div className="author d-flex flex-column justify-content-center">
                        <ul>
                            <li>
                                {review.author}
                                {review.company &&
                                <span className="company text-muted">&nbsp;({review.company})</span>}
                            </li>

                            <li className="socials">
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
                                <Translate tag="p" className="here text-muted d-none d-sm-inline-block"
                                           value="pages.reviews.hereYouCanFindTheReviewer"/>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}