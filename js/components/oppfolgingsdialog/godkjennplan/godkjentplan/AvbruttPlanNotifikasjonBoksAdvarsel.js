import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { getLedetekst } from '@navikt/digisyfo-npm';

const AvbruttPlanNotifikasjonBoksAdvarsel = ({ motpartnavn }) => {
    return (<Alertstripe
        className="alertstripe--notifikasjonboks"
        type="info"
        solid>
        {getLedetekst('oppfolgingsdialog.avbruttPlanNotifikasjonBoksAdvarsel.tekst', {
            '%MOTPARTNAVN%': motpartnavn,
        })}
    </Alertstripe>);
};
AvbruttPlanNotifikasjonBoksAdvarsel.propTypes = {
    motpartnavn: PropTypes.string,
};

export default AvbruttPlanNotifikasjonBoksAdvarsel;
