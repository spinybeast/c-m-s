import React, {Component} from 'react';
import axios from 'axios';


export default class ReviewsPost extends Component {
    constructor() {
        super();
        this.state = {
            author: '',
            company: '',
            text: ''
        }
    }

    handleAuthorChange(e) {
        this.setState({
            author: e.target.value
        })
    }

    handleCompanyChange(e) {
        this.setState({
            company: e.target.value
        })
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('api/review', this.state).then(response => {
            console.log(response);
        }).catch(error => {
            console.log('error', error);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <input
                            type="text"
                            name="author"
                            placeholder="author"
                            onChange={this.handleAuthorChange.bind(this)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="company"
                            placeholder="company"
                            onChange={this.handleCompanyChange.bind(this)}
                        />
                    </div>
                    <div>
                        <textarea
                            name="text"
                            placeholder="text"
                            onChange={this.handleTextChange.bind(this)}
                        />
                    </div>
                    <div>
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        )
    }
}