import React, {Component} from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import _ from 'lodash'

const initialData = {
    author: '',
    company: '',
    text: '',
    socials: {}
};
export default class ReviewPost extends Component {
    constructor() {
        super();
        this.state = {
            data: _.cloneDeep(initialData),
            message: '',
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSocial = this.handleChangeSocial.bind(this);
        this.connectNetwork = this.connectNetwork.bind(this);
    }

    handleChange(e) {
        let data = this.state.data;
        data[e.target.name] = e.target.value;

        this.setState({
            data: data
        });
    }

    handleChangeSocial(e) {
        let data = this.state.data;
        data.socials[e.target.name] = e.target.value;
        this.setState({
            data: data
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
                console.log('data', this.state.data, initialData)
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

    connectNetwork(network) {
        return (
            <div>
                <input type="text"
                       name={network}
                       value={this.state.data.socials[network] || ''}
                       onChange={this.handleChangeSocial}
                       className="form-control transparent"
                       placeholder={`Enter your ${network} link`}
                />
            </div>
        )
    }

    render() {
        let message, errors;
        if (this.state.message.length) {
            message = <div className="message">{this.state.message}</div>
        }
        if (this.state.errors.length) {
            errors = <div className="errors">
                {this.state.errors.map((error, index) => {
                    return <div key={index}>{error}</div>
                })}
            </div>
        }
        return (
            <div className="review-popup">
                <h4 className="title text-uppercase text-center">Leave a feedback</h4>
                <form onSubmit={this.handleSubmit} className="row">
                    <div className="col-md-7">
                        {message}
                        {errors}
                        <div className="form-group">
                            <input type="text"
                                   name="author"
                                   onChange={this.handleChange}
                                   value={this.state.data.author}
                                   className="form-control transparent"
                                   placeholder="Your name"
                                   required/>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   name="company"
                                   onChange={this.handleChange}
                                   value={this.state.data.company}
                                   className="form-control transparent"
                                   placeholder="Your company"
                                   required/>
                        </div>
                        <div className="form-group">
                            <textarea rows="4"
                                      name="text"
                                      onChange={this.handleChange}
                                      value={this.state.data.text}
                                      className="form-control transparent"
                                      placeholder="Your comment"
                                      required>
                            </textarea>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="form-control btn btn-black">Send</button>
                        </div>

                    </div>
                    <div className="col-md-5 text-center">
                        <div>
                            <div className="form-group text-center" style={{height: 150}}>
                                <img className="rounded-circle img-fluid avatar-preview" src="/img/noavatar.png"/>
                                <img className="rounded-circle img-fluid avatar-preview"/>
                            </div>
                            <div>
                                <button type="button" className="btn btn-link">Upload image</button>
                                {/*<button type="button" className="btn btn-link">Change image</button>*/}
                                {/*<button type="button" className="btn btn-link">Cancel image</button>*/}
                            </div>
                        </div>
                        <div className="socials">
                            <p className="here">Ваш профиль в соц сети</p>
                            <div>
                                <Popup trigger={<span className="facebook inactive">&nbsp;</span>}>
                                    {this.connectNetwork('facebook')}
                                </Popup>
                                <Popup trigger={<span className="google inactive">&nbsp;</span>}>
                                    {this.connectNetwork('google')}
                                </Popup>
                                <Popup trigger={<span className="vkontakte inactive">&nbsp;</span>}>
                                    {this.connectNetwork('vkontakte')}
                                </Popup>
                                <Popup trigger={<span className="instagram inactive">&nbsp;</span>}>
                                    {this.connectNetwork('instagram')}
                                </Popup>
                                <Popup trigger={<span className="twitter inactive">&nbsp;</span>}>
                                    {this.connectNetwork('twitter')}
                                </Popup>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}