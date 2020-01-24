import React from 'react';

const texts = {
    infolist: {
        ingress: 'Arbeidstakeren din kan godkjenne eller gjøre endringer i oppfølgingsplanen.',
        noChangesApproval: 'Godkjenner arbeidstakeren, har dere opprettet en plan.',
        changesWithAproval: 'Gjør arbeidstakeren endringer, får du en melding om at du kan ta stilling til endringene.',
        changesNoApproval: `
            Får du ikke noen melding, er det mulig at arbeidstakeren din ikke har tatt stilling til planen ennå. Du kan gå inn i oppfølgingsplanen for å se om det har skjedd noe.
        `,
        afterApproval: `
            Om arbeidstakeren godkjenner planen, har dere opprettet en gjeldende plan som du kan laste ned.
            Planen er tilgjengelig her i fire måneder etter friskmelding.
        `,
    },
};


const GodkjennPlanVenterInfo = () => {
    return (
        <React.Fragment>
            <p>{texts.infolist.ingress}</p>
            <ul>
                <li>{texts.infolist.noChangesApproval}</li>
                <li>{texts.infolist.changesWithAproval}</li>
                <li>{texts.infolist.changesNoApproval}</li>
            </ul>
            <p>{texts.infolist.afterApproval}</p>
        </React.Fragment>);
};

export default GodkjennPlanVenterInfo;
