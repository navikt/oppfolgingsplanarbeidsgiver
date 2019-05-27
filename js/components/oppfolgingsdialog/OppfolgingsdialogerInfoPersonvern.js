import React from 'react';
import { getHtmlLedetekst } from 'digisyfo-npm';

const OppfolgingsdialogerInfoPersonvern = () => {
    return (<div
        className="oppfolgingsdialogerInfoPersonvern"
        dangerouslySetInnerHTML={getHtmlLedetekst('oppfolgingsdialog.oppfolgingsdialogerInfoPersonvern.ag')}
    />);
};

export default OppfolgingsdialogerInfoPersonvern;
