import React from 'react';

const texts = {
    infolist: {
        ingress: 'Arbeidstakeren kan enten godkjenne eller gjøre endringer i oppfølgingsplanen:',
        noChangesApproval: 'Godkjenner arbeidstakeren vil du motta et varsel om at har dere opprettet en gjeldende plan.',
        changesWithAproval: 'Gjør arbeidstakeren endringer og sender den tilbake til deg for godkjenning, vil du motta et varsel om å ta stilling dette.',
        changesNoApproval: `
            Mottar du ikke varsel knyttet til planen har ikke arbeidstakeren din tatt stilling til den. 
            For å komme videre kan du ta kontakt med arbeidstakeren eller gå inn på denne oppfølgingsplanen og se om det er gjort endringer. 
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
