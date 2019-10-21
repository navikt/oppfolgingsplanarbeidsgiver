import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';

const NotifikasjonBoksVurdering = (
    {
        navn,
        antallIkkeVurderte,
        tekst,
    }) => {
    let status = '';
    switch (true) {
        case (antallIkkeVurderte > 1) : {
            status = 'foreslåtte';
            break;
        }
        default: {
            status = 'foreslått';
            break;
        }
    }
    return (<Alertstripe
        className="alertstripe--notifikasjonboks"
        type="info"
        solid>
        {getLedetekst(tekst, {
            '%MOTPARTNAVN%': navn,
            '%ANTALLTILTAK%': antallIkkeVurderte,
            '%STATUS%': status,
        })}
    </Alertstripe>);
};
NotifikasjonBoksVurdering.propTypes = {
    navn: PropTypes.string,
    antallIkkeVurderte: PropTypes.number,
    tekst: PropTypes.string,
};

export default NotifikasjonBoksVurdering;

