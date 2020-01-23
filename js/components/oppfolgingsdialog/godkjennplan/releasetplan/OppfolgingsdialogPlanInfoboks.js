import React from 'react';

const texts = {
    title: 'Hva skjer nå?',
    info: {
        paragraph1: `
           Innen fire uker skal fastlegen få se planen. Dere kan dele den med både legen og NAV når dere er blitt enige.
        `,
        paragraph2: 'OBS: NAV kan ikke se planen før dere har delt den.',
    },
};

const OppfolgingsdialogPlanInfoboks = () => {
    return (
        <div className="panel">
            <h3 className="panel__tittel">{texts.title}</h3>
            <p>
                {texts.info.paragraph1}
                <br />
                <br />
                {texts.info.paragraph2}
            </p>
        </div>);
};

export default OppfolgingsdialogPlanInfoboks;
