import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Popup from 'reactjs-popup';
import {Translate} from 'react-i18nify';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import {Loader} from '../components/Loader';
import ReviewForm from '../components/review-post/ReviewForm';
import Review from '../components/Review';
import * as actions from '../actions';

class Reviews extends Component {
    componentWillMount() {
        const {fetchReviews} = this.props;
        fetchReviews();
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
        const {reviews, loading} = this.props;

        return (
            <Fragment>
                <div className="wrapper reviews">
                    <Header/>
                    <main className="container">

                        {
                            !loading && reviews.length > 0 ?
                            <div className="review-carousel">
                                <OwlCarousel options={options}>
                                    {reviews.map(review => (
                                        <Review key={review.id} review={review}/>
                                    ))}
                                </OwlCarousel>
                            </div> :
                            (loading ? <Loader/> : null)
                        }


                        <hr/>
                        <div className="leave-feedback text-center col-md-12">
                            <Translate value="pages.reviews.ifYouWorked" tag="div" dangerousHTML={true}/>
                            <br/><br/>
                            <Popup trigger={<button><Translate value="pages.reviews.leaveFeedback"/></button>} modal>
                                <div className="review-popup">
                                    <h4 className="title text-uppercase text-center">
                                        <Translate value="pages.reviews.leaveFeedback"/>
                                    </h4>
                                    <ReviewForm/>
                                </div>
                            </Popup>
                        </div>
                    </main>
                </div>

                <Footer/>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const {reviews, loading} = state.reviews;
    return {
        reviews,
        loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchReviews: () => {
            dispatch(actions.fetchReviews());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
