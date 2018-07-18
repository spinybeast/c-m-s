import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';

export default class SocialNetworks extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {socials, networks, handleChangeSocial} = this.props;

        return (
            <div className="socials">
                <p className="here">Ваш профиль в соц сети</p>
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
                                           placeholder={`Enter your ${network} link`}
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