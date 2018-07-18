import React, {Component} from 'react';

export default class Messages extends Component {

    render() {
        let message, errors;
        if (this.props.message.length) {
            message = <div className="message">{this.props.message}</div>
        }
        if (this.props.errors.length) {
            errors = <div className="errors">
                {this.props.errors.map((error, index) => {
                    return <div key={index}>{error}</div>
                })}
            </div>
        }

        return (
            <div>
                {message}
                {errors}
            </div>
        )
    }
}