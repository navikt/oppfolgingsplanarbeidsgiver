import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';

const tekster = {
    varsel: 'Du har åpnet oppfølgingsplanen for endringer. Når du har gjort endringene, må du sende den til ny godkjenning hos den andre.',
};

export default () => {
    return (<Alertstripe
        className="alertstripe--notifikasjonboks"
        type="info">
        { tekster.varsel }
    </Alertstripe>);
};
