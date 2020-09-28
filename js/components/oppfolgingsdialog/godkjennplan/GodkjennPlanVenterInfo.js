import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';

const texts = {
    title: 'Hva skjer nå?',
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
        <AlertStripe
            className="alertstripe--notifikasjonboks"
            type="info">
            <h3 className="panel__tittel">{texts.title}</h3>
            <p>{texts.infolist.ingress}</p>
            <ul>
                <li>{texts.infolist.noChangesApproval}</li>
                <li>{texts.infolist.changesWithAproval}</li>
                <li>{texts.infolist.changesNoApproval}</li>
            </ul>
            <p>{texts.infolist.afterApproval}</p>
        </AlertStripe>);
};

export default GodkjennPlanVenterInfo;
