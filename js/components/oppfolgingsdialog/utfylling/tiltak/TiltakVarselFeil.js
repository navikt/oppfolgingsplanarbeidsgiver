import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Alertstripe from 'nav-frontend-alertstriper';
import { erHerokuApp } from '../../../../utils/urlUtils';

const AlertStripeStyled = styled(Alertstripe)`
    margin-top: 1.5em;
`;

const TiltakVarselFeil = ({ tekst }) => {
    return (<AlertStripeStyled
        className="tiltakVarselFeil alertstripe--notifikasjonboks"
        type="advarsel">
        {erHerokuApp()
            ? 'Denne funksjonen virker ikke på testsiden'
            : tekst}
    </AlertStripeStyled>);
};
TiltakVarselFeil.propTypes = {
    tekst: PropTypes.string,
};

export default TiltakVarselFeil;

