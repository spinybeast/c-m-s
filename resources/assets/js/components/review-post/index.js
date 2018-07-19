import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

import AvatarUpload from "./AvatarUpload";
import SocialNetworks from "./SocialNetworks";
import {Form} from "./Form";

const initialData = {
    author: '',
    company: '',
    text: '',
    photo: '',
    socials: {}
};
export default class ReviewPost extends Component {
    constructor() {
        super();
        this.state = {
            data: _.cloneDeep(initialData),
            message: '',
            errors: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSocial = this.handleChangeSocial.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.cancelImage = this.cancelImage.bind(this);
    }

    handleChange(e) {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });
    }

    handleChangeSocial(e) {
        this.setState({
            data: {
                ...this.state.data,
                socials: {
                    ...this.state.data.socials,
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    handleChangeImage(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                data: {
                    ...this.state.data,
                    photo: reader.result
                },
            });
        };
        reader.readAsDataURL(file);
    }

    cancelImage(e) {
        e.preventDefault();
        this.setState({
            data: {
                ...this.state.data,
                photo: ''
            },
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        await axios.post('api/review', this.state.data).then(result => {
            if (result.data.success) {
                this.setState({
                    message: result.data.message,
                    errors: [],
                    data: _.cloneDeep(initialData)
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
        return (
            <div className="review-popup">
                <h4 className="title text-uppercase text-center">Leave a feedback</h4>
                <form onSubmit={this.handleSubmit} className="row">
                    <div className="col-md-7">
                        <Form
                            data={this.state.data}
                            handleChange={this.handleChange}
                            message={this.state.message}
                            errors={this.state.errors}
                        />

                    </div>
                    <div className="col-md-5 text-center">
                        <AvatarUpload
                            previewUrl={this.state.data.photo}
                            handleChangeImage={this.handleChangeImage}
                            cancelImage={this.cancelImage}
                        />
                        <SocialNetworks
                            socials={this.state.data.socials}
                            networks={['facebook', 'google', 'vkontakte', 'instagram', 'twitter']}
                            handleChangeSocial={this.handleChangeSocial}
                        />
                    </div>
                </form>
            </div>
        )
    }
}