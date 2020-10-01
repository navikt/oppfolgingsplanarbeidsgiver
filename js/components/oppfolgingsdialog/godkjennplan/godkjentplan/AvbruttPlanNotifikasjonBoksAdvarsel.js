import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const textAlertstripe = (counterPart) => {
    return `${counterPart} har startet en ny oppfølgingsplan. Den gamle er arkivert.`;
};

const AvbruttPlanNotifikasjonBoksAdvarsel = ({ motpartnavn }) => {
    return (<Alertstripe
        className="alertstripe--notifikasjonboks"
        type="info">
        {textAlertstripe(motpartnavn)}
    </Alertstripe>);
};
AvbruttPlanNotifikasjonBoksAdvarsel.propTypes = {
    motpartnavn: PropTypes.string,
};

export default AvbruttPlanNotifikasjonBoksAdvarsel;
