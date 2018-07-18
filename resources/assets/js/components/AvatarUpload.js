import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
                        <i className="fa fa-cloud-upload"></i> {previewUrl.length ? "Change" : "Upload"} Image
                    </label>
                    {
                        previewUrl.length ?
                            <button type="button" className="btn btn-link" onClick={cancelImage}>
                                <i className="fa fa-ban"></i> Cancel image
                            </button> :
                            ""
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