import React from 'react';

const texts = {
    title: 'Hva skjer nå?',
    info: {
        paragraph1: `
            Innen fire uker skal den som har sykmeldt medarbeideren din få se planen.
            Når dere har blitt enige om planen, kan dere dele den digitalt med både legen og NAV.
        `,
        paragraph2: 'NAV kan ikke se planen før dere har delt den. Dere kan dele den når dere selv ønsker. I tillegg kan NAV be om å få se den.',
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
