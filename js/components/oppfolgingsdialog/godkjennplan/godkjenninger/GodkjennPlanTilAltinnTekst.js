import React from 'react';

const texts = {
    text: 'Alle godkjente planer mellom deg og arbeidstakeren vil også bli tilgjengelige for de hos dere som har tilganger i Altinn.',
};

const GodkjennPlanTilAltinnTekst = () => {
    return (<p className="godkjennPlanTilAltinnTekst">
        {texts.text}
    </p>);
};

export default GodkjennPlanTilAltinnTekst;
