import React, {Component} from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import ReviewPost from "../components/review-post/index";

export default class Reviews extends Component {
    constructor() {
        super();
        this.state = {
            reviews: []
        };
    }

    async componentWillMount() {
        await axios.get('api/review').then(response => {
            this.setState({
                reviews: response.data
            });
        }).catch(error => {
            console.log('error', error);
        });
    }

    render() {
        const options = {
            items: 3,
            nav: true,
            dots: false,
            rewind: true,
            autoplay: false
        };

        const events = {
            onChanged: function (event) {
                console.log('onChanged', this)
            }
        };

        let carousel = '';
        if (this.state.reviews.length > 0) {
            carousel = <OwlCarousel options={options} events={events}>
                {this.state.reviews.map(review =>
                    <div key={review.id}>
                        <img
                            className="rounded-circle img-fluid"
                            style={{width: 150}}
                            src={review.photo}
                            alt={review.author}
                        />
                        <p className="author">{review.author}</p>
                        <p className="company">{review.company}</p>
                        <div className="review">
                            <div className="text">
                                {review.text}
                                <p className="socials">
                                    <span className="here">Here you can find the reviewer</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </OwlCarousel>;
        }

        return (
            <div>
                <div className="wrapper reviews">
                    <Header/>
                    <main className="container">
                        {carousel}
                        <hr/>
                        <div className="leave-feedback text-center col-md-12">
                            <p>If you have worked or working with our studio, please, don't be too shy and leave us a feedback</p>
                            <p>Thanx for your opinion! We very appreciate it!</p>
                            <br/><br/>
                            <Popup
                                trigger={<button>Leave a feedback</button>}
                                modal
                            >
                                <ReviewPost/>
                            </Popup>
                            <br/><br/>
                        </div>
                    </main>
                </div>

                <Footer/>
            </div>
        )
    }
}