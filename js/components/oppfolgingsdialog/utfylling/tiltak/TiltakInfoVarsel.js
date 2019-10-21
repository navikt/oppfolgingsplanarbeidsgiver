import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const TiltakInfoVarsel = ({ tekst }) => {
    return (<Alertstripe
        className="alertstripe--notifikasjonboks"
        type="info">
        {tekst}
    </Alertstripe>);
};
TiltakInfoVarsel.propTypes = {
    tekst: PropTypes.string,
};

export default TiltakInfoVarsel;
