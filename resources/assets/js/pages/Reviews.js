import React, {Component} from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import ReviewPost from '../components/review-post';
import {ReviewsList} from '../components/ReviewsList';

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
                        <ReviewsList reviews={this.state.reviews}/>
                        <div className="leave-feedback text-center col-md-12">
                            <p>If you have worked or working with our studio, please, don't be too shy and leave us a
                                feedback</p>
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