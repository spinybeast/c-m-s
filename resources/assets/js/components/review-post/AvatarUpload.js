import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {Translate} from 'react-i18nify';

export default class AvatarUpload extends Component {
    constructor () {
        super();
        this.clear = this.clear.bind(this);
    }

    clear() {
        const {clearFields} = this.props;
        clearFields(false, false, 'photo');
    }

    render() {
        const adaptFileEventToValue = delegate => e => {
            let reader = new FileReader();
            reader.onloadend = () => {
                delegate(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        };

        const FileInput = ({
                               input: {
                                   value: omitValue,
                                   onChange,
                                   onBlur,
                                   ...inputProps
                               },
                               meta: omitMeta,
                               ...props
                           }) =>
            <input
                onChange={adaptFileEventToValue(onChange)}
                type="file"
                {...inputProps}
                {...props}
            />;
        const {previewUrl} = this.props;
        return (
            <Fragment>
                <div className="text-center">
                    <img className="rounded-circle img-fluid avatar-preview" src={previewUrl || '/img/noavatar.png'}/>
                </div>
                <div>
                    <Field component={FileInput} type="file" name="photo" id="photo" accept="image/*" style={{display: 'none'}}/>
                    <label htmlFor="photo" className="btn btn-link upload-image">
                        <i className="fa fa-cloud-upload">&nbsp;</i>
                        <Translate value={previewUrl.length ? "pages.reviews.popup.changeImage" : "pages.reviews.popup.uploadImage"}/>
                    </label>
                    {
                        previewUrl.length > 0 &&
                        <button type="button" className="btn btn-link" onClick={this.clear}>
                            <i className="fa fa-ban">&nbsp;</i>
                            <Translate value="pages.reviews.popup.cancelImage"/>
                        </button>
                    }
                </div>
            </Fragment>
        )
    }
}


AvatarUpload.propTypes = {
    previewUrl: PropTypes.string,
    clearFields: PropTypes.func
};
