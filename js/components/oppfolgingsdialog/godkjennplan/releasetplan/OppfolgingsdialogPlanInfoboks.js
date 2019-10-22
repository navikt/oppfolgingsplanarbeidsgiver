import React from 'react';
import { getLedetekst } from 'digisyfo-npm';

const OppfolgingsdialogPlanInfoboks = () => {
    const infoboksTittel = 'oppfolgingsdialog.arbeidsgiver.hvaskjernaa.tittel';

    const infoboksTekst = 'oppfolgingsdialog.arbeidsgiver.hvaskjernaa.tekst';

    return (
        <div className="panel">
            <h3 className="panel__tittel">{getLedetekst(infoboksTittel)}</h3>
            <p dangerouslySetInnerHTML={{ __html: getLedetekst(infoboksTekst) }} />
        </div>);
};

export default OppfolgingsdialogPlanInfoboks;
