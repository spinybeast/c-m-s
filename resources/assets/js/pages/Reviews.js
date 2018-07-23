import React, {Component} from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import {Translate} from 'react-i18nify';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import ReviewPost from '../components/review-post';
import Review from '../components/Review';

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
                reviews: response.data.slice(0, 2)
            });
        }).catch(error => {
            console.log('error', error);
        });
    }

    render() {
        return (
            <div>
                <div className="wrapper reviews">
                    <Header/>
                    <main className="container">
                        {
                            this.state.reviews.map(review => (
                                <Review key={review.id} review={review}/>
                            ))
                        }
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