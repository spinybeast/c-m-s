import React, {Component} from 'react';
import {connect} from 'react-redux'
import {reduxForm, formValueSelector, Field} from 'redux-form';

import AvatarUpload from "./AvatarUpload";
import SocialNetworks from "./SocialNetworks";
import Messages from "../Messages";
import {I18n, Translate} from "react-i18nify";
import axios from "axios";
import { Loader } from '../Loader';

class ReviewForm extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            message: '',
            errors: [],
        };
        this.submit = this.submit.bind(this);
    }

    async submit(values) {
        this.setState({loading: true});
        await axios.post('api/review', values).then(result => {
            if (result.data.success) {
                this.props.reset();
                this.setState({
                    message: result.data.message,
                    errors: [],
                    loading: false
                });
            } else {
                this.setState({
                    message: '',
                    errors: result.data.errors,
                    loading: false
                });
            }
        }).catch(error => {
            this.setState({
                errors: [error.response.status === 413 ? 'Your avatar is too large' : 'Something went wrong'],
                loading: false
            });
            console.log('error', error.response);
        })
    }

    render() {
        const {handleSubmit, previewUrl, socials, clearFields} = this.props;
        const {message, errors, loading} = this.state;

        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <div className="d-flex row flex-wrap">
                    <div className="col-12 col-md-7">
                        <Messages message={message} errors={errors}/>
                        <div className="form-group">
                            <Field component="input"
                                   type="text"
                                   name="author"
                                   className="form-control transparent"
                                   placeholder={I18n.t('pages.reviews.popup.name')}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <Field component="input"
                                   type="text"
                                   name="company"
                                   className="form-control transparent"
                                   placeholder={I18n.t('pages.reviews.popup.company')}
                            />
                        </div>
                        <div>
                            <Field component="textarea"
                                   rows="4"
                                   name="text"
                                   className="form-control transparent"
                                   placeholder={I18n.t('pages.reviews.popup.comment')}
                                   required
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-5 mt-3 mt-md-0">
                        <AvatarUpload
                            previewUrl={previewUrl}
                            clearFields={clearFields}
                        />
                    </div>
                </div>
                <div className="d-flex row flex-column-reverse flex-sm-row flex-wrap text-center">
                    <div className="col-12 col-md-7 d-flex align-items-center justify-content-center">
                        {
                            loading ? <Loader/> :
                            <button type="submit" className="form-control btn btn-black mt-4 mt-sm-3">
                                <Translate value="pages.reviews.popup.send"/>
                            </button>
                        }
                    </div>
                    <div className="col-12 col-md-5">
                        <SocialNetworks
                            values={socials}
                            networks={['facebook', 'google', 'vkontakte', 'instagram', 'twitter']}
                        />
                    </div>
                </div>
            </form>
        );
    }
}

ReviewForm = reduxForm({
    form: 'review',
})(ReviewForm);

const selector = formValueSelector('review');
ReviewForm = connect(state => {
    const previewUrl = selector(state, 'photo') || '';
    return {
        previewUrl,
        socials: selector(state, 'socials') || {}
    }
})(ReviewForm);

export default ReviewForm;
