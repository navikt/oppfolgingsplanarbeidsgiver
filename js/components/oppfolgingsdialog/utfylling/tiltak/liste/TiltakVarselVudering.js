import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const TiltakVarselVudering = ({ tekst }) => {
    return (<Alertstripe
        className="tiltakVuderingVarsel alertstripe--notifikasjonboks"
        type="info">
        {tekst}
    </Alertstripe>);
};
TiltakVarselVudering.propTypes = {
    tekst: PropTypes.string,
};

export default TiltakVarselVudering;
