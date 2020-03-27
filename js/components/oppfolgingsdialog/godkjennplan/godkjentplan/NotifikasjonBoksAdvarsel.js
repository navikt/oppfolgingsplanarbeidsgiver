import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const textDisplay = (texts) => {
    if (texts.length === 1) {
        return (<p>{texts[0]}</p>);
    }

    return (<ul>
        {
            texts.map((text, index) => {
                return (<li key={index}>
                    <p>{text}</p>
                </li>);
            })
        }
    </ul>);
};

const NotifikasjonBoksAdvarsel = ({ texts }) => {
    return (<Alertstripe
        className="alertstripe--notifikasjonboks"
        type="info"
        solid>
        {textDisplay(texts)}
    </Alertstripe>);
};
NotifikasjonBoksAdvarsel.propTypes = {
    texts: PropTypes.arrayOf(PropTypes.string),
};

export default NotifikasjonBoksAdvarsel;
