import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Translate} from 'react-i18nify';

export default class AvatarUpload extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        let {previewUrl, handleChangeImage, cancelImage} = this.props;

        return (
            <div>
                <div className="form-group text-center">
                    <img className="rounded-circle img-fluid avatar-preview" src={previewUrl || '/img/noavatar.png'}/>
                </div>
                <div>
                    <input type="file" name="photo" id="photo" onChange={handleChangeImage} accept="image/*" style={{display: 'none'}}/>
                    <label htmlFor="photo" className="btn btn-link upload-image">
                        <i className="fa fa-cloud-upload">&nbsp;</i>
                        <Translate value={previewUrl.length ? "pages.reviews.popup.changeImage" : "pages.reviews.popup.uploadImage"}/>
                    </label>
                    {
                        previewUrl.length > 0 &&
                        <button type="button" className="btn btn-link" onClick={cancelImage}>
                            <i className="fa fa-ban">&nbsp;</i>
                            <Translate value="pages.reviews.popup.cancelImage"/>
                        </button>
                    }
                </div>
            </div>
        )
    }
}

AvatarUpload.propTypes = {
    previewUrl: PropTypes.string,
    handleChangeImage: PropTypes.func,
    cancelImage: PropTypes.func
};