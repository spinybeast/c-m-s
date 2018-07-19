import React from 'react';
import Messages from '../Messages';

export const Form = (props) => (
    <div>
        <Messages message={props.message} errors={props.errors}/>
        <div className="form-group">
            <input type="text"
                   name="author"
                   onChange={props.handleChange}
                   value={props.data.author}
                   className="form-control transparent"
                   placeholder="Your name"
                   required/>
        </div>
        <div className="form-group">
            <input type="text"
                   name="company"
                   onChange={props.handleChange}
                   value={props.data.company}
                   className="form-control transparent"
                   placeholder="Your company"
            />
        </div>
        <div className="form-group">
                            <textarea rows="4"
                                      name="text"
                                      onChange={props.handleChange}
                                      value={props.data.text}
                                      className="form-control transparent"
                                      placeholder="Your comment"
                                      required>
                            </textarea>
        </div>
        <div className="form-group">
            <button type="submit" className="form-control btn btn-black">Send</button>
        </div>
    </div>
);