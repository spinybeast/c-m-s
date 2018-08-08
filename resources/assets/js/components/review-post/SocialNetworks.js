import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {Translate} from 'react-i18nify';
import _ from 'lodash';

export default class SocialNetworks extends Component {
    render() {
        const {networks} = this.props;

        return (
            <div className="socials">
                <Translate className="here text-muted" tag="p" value="pages.reviews.popup.socials"/>
                <div>
                    {networks.map((network, index) => {
                        return (
                            <Popup key={index} trigger={<span className={network + " inactive"}>&nbsp;</span>}>
                                <div>
                                    <Field component="input"
                                           type="text"
                                           name={"socials[" + network + "]"}
                                           className="form-control transparent"
                                           placeholder={_.startCase(network)}
                                    />
                                </div>
                            </Popup>
                        )
                    })}
                </div>
            </div>
        );
    }
}

SocialNetworks.propTypes = {
  networks: PropTypes.arrayOf(PropTypes.string),
};