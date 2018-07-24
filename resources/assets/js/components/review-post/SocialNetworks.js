import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import {Translate} from 'react-i18nify';
import _ from 'lodash';

export default class SocialNetworks extends Component {
    render() {
        let {socials, networks, handleChangeSocial} = this.props;

        return (
            <div className="socials">
                <Translate className="here text-muted" tag="p" value="pages.reviews.popup.socials"/>
                <div>
                    {networks.map((network, index) => {
                        return (
                            <Popup key={index} trigger={<span className={network + (socials[network] && socials[network].length > 0 ? "" : " inactive")}>&nbsp;</span>}>
                                <div>
                                    <input type="text"
                                           name={network}
                                           value={socials[network] || ''}
                                           onChange={handleChangeSocial}
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
  socials: PropTypes.object,
  networks: PropTypes.arrayOf(PropTypes.string),
  handleChangeSocial: PropTypes.func
};