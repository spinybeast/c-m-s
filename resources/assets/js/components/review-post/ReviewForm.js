import React, {Component} from 'react';
import {connect} from 'react-redux'
import {reduxForm, formValueSelector, Field} from 'redux-form';

import AvatarUpload from "./AvatarUpload";
import SocialNetworks from "./SocialNetworks";
import Messages from "../Messages";
import {I18n, Translate} from "react-i18nify";
import axios from "axios";

class ReviewForm extends Component {

    constructor() {
        super();
        this.state = {
            message: '',
            errors: [],
        };
        this.submit = this.submit.bind(this);
    }

    async submit(values) {
        await axios.post('api/review', values).then(result => {
            if (result.data.success) {
                this.props.reset();
                this.setState({
                    message: result.data.message,
                    errors: [],
                });
            } else {
                this.setState({
                    message: '',
                    errors: result.data.errors
                });
            }
        }).catch(error => {
            console.log('error', error);
        })
    }

    render() {
        const {handleSubmit, previewUrl, clearFields} = this.props;
        const {message, errors} = this.state;

        return (
            <form onSubmit={handleSubmit(this.submit)} className="row">
                <div className="col-md-7">
                    <div>
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
                        <div className="form-group">
                            <Field component="textarea"
                                   rows="4"
                                   name="text"
                                   className="form-control transparent"
                                   placeholder={I18n.t('pages.reviews.popup.comment')}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="form-control btn btn-black">
                                <Translate value="pages.reviews.popup.send"/>
                            </button>
                        </div>
                    </div>

                </div>
                <div className="col-md-5 text-center">
                    <AvatarUpload
                        previewUrl={previewUrl}
                        clearFields={clearFields}
                    />
                    <SocialNetworks
                        networks={['facebook', 'google', 'vkontakte', 'instagram', 'twitter']}
                    />
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
        previewUrl
    }
})(ReviewForm);

export default ReviewForm;