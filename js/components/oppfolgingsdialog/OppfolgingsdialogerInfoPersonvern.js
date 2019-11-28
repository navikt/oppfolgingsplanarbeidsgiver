import React from 'react';

const texts = {
    paragraphInfo: `
        Oppfølgingsplanen skal gjøre det lettere for arbeidstakeren å bli i jobben.
        Du og arbeidstakeren lager planen sammen og skriver inn opplysninger fra hver deres kant.
        Formålet er finne ut hvilke oppgaver som kan gjøre hvis det legges til rette. Dere kan endre planen når som helst etter hvert som dere ser hvordan det går.
    `,
    readMore: {
        title: 'Les mer om:',
        linkLover: 'Hvilke lover som gjelder for oppfølgingsplanen',
        linkPersonvern: 'Hvordan NAV behandler personopplysninger',
    },
};

const OppfolgingsdialogerInfoPersonvern = () => {
    return (<div className="oppfolgingsdialogerInfoPersonvern">
        <p>{texts.paragraphInfo}</p>
        <p>{texts.readMore.title}</p>
        <ul>
            <li><a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Relatert+informasjon/hva-er-en-oppf%C3%B8lgingsplan">
                {texts.readMore.linkLover}
            </a></li>
            <li><a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.nav.no/personvern"
            >
                {texts.readMore.linkPersonvern}
            </a></li>
        </ul>
    </div>);
};

export default OppfolgingsdialogerInfoPersonvern;
