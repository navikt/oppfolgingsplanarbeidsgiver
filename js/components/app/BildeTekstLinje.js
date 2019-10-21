import React from 'react';
import PropTypes from 'prop-types';

const BildeTekstLinje = ({ imgAlt, imgUrl, tekst }) => {
    return (<div className="bildeTekstLinje">
        <img alt={imgAlt} src={imgUrl} />
        <p>{tekst}</p>
    </div>);
};
BildeTekstLinje.propTypes = {
    imgAlt: PropTypes.string,
    imgUrl: PropTypes.string,
    tekst: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
};
export default BildeTekstLinje;
