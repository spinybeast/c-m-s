import React from 'react';

export const ReviewsList = (props) => (
    <div>
        {props.reviews.map(review =>
            <div key={review.id} >
                <div className="row">
                    <div className="col-md-2">
                        <img
                            className="rounded-circle img-fluid"
                            style={{width: 150}}
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
                                <p className="socials">
                                    <span className="here">Here you can find the reviewer</span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
                <hr/>
            </div>
        )}
    </div>
);