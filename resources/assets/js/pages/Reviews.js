import React, {Component} from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import {Translate} from 'react-i18nify';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import {Loader} from '../components/Loader';
import ReviewPost from '../components/review-post';
import Review from '../components/Review';
import ReviewList from '../components/ReviewList';

export default class Reviews extends Component {
    constructor() {
        super();
        this.state = {
            reviews: [],
            loading: true
        };
    }

    async componentWillMount() {
        await axios.get('api/review').then(response => {
            this.setState({
                reviews: response.data,
                loading: false
            });
        }).catch(error => {
            this.setState({
                loading: false
            });
            console.log('error', error);
        });
    }

    render() {
        const options = {
            items: 1,
            nav: true,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            dots: false,
            autoplay: false,
            autoHeight: true
        };
        const {reviews, loading} = this.state;
        return (
            <div>
                <div className="wrapper reviews">
                    <Header/>
                    <main className="container">

                        {!loading && reviews.length > 0 ?
                            <div className="review-carousel">
                                <OwlCarousel options={options}>
                                    {reviews.map(review => (
                                        <Review key={review.id} review={review}/>
                                    ))}
                                </OwlCarousel>
                            </div> :
                            (loading ? <Loader/> : '')
                        }


                        <hr/>
                        <div className="leave-feedback text-center col-md-12">
                            <Translate value="pages.reviews.ifYouWorked" tag="div" dangerousHTML={true}/>
                            <br/><br/>
                            <Popup trigger={<button><Translate value="pages.reviews.leaveFeedback"/></button>} modal>
                                <ReviewPost/>
                            </Popup>
                        </div>
                    </main>
                </div>

                <Footer/>
            </div>
        )
    }
}