import React, {Component} from 'react';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';

export default class Reviews extends Component {
    constructor() {
        super();
        this.state = {
            reviews: []
        }
    }

    componentWillMount() {
        axios.get('api/review').then(response => {
            this.setState({
                reviews: response.data
            });
        }).catch(error => {
            console.log('error', error);
        });
    }

    render() {
        const options = {
            items: 1,
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

        return (
            <div>
                <div className="wrapper reviews">
                    <Header/>
                    <main className="container">
                        <OwlCarousel ref="car" options={options} events={events}>
                            {this.state.reviews.map(review => (
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
                            ))}
                        </OwlCarousel>
                    </main>
                </div>
                <Footer/>
            </div>
        )
    }
}