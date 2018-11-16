import {
    finnNyesteGodkjenning,
    erOppfolgingsdialogKnyttetTilGyldigSykmelding,
    erSykmeldingGyldigForOppfolgingMedGrensedato,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
} from 'oppfolgingsdialog-npm';

export const isEmpty = (array) => {
    return !array || array.length === 0;
};

export const parsedato = (dato) => {
    const datoSplit = dato.split('.');
    let ar = datoSplit[2];
    if (ar.length === 2) {
        ar = `20${ar}`;
    }
    return `${ar}-${datoSplit[1]}-${datoSplit[0]}`;
};

export const fraInputdatoTilJSDato = (inputDato) => {
    if (inputDato) {
        const d = parsedato(inputDato);
        return new Date(d);
    }
    return null;
};

export const idAlleredeFunnet = (planer, id) => {
    return planer.filter((plan) => {
        return plan.id === id;
    }).length > 0;
};

export const oppgaverOppfoelgingsdialoger = (sykmeldtsOppfolgingsdialoger, sykmeldinger) => {
    if (!(sykmeldtsOppfolgingsdialoger && sykmeldtsOppfolgingsdialoger.data)) {
        return [];
    }
    const sykmeldtsOppfolgingdialogerKnyttetTilGyldigSykmelding = sykmeldtsOppfolgingsdialoger.data
        .filter((plan) => {
            return erOppfolgingsdialogKnyttetTilGyldigSykmelding(plan, sykmeldinger);
        });
    const avventendeGodkjenninger = sykmeldtsOppfolgingdialogerKnyttetTilGyldigSykmelding
        .filter((plan) => {
            return plan.godkjenninger.length > 0
                && plan.arbeidstaker.fnr === finnNyesteGodkjenning(plan.godkjenninger).godkjentAv.fnr
                && finnNyesteGodkjenning(plan.godkjenninger).godkjent;
        });
    const nyePlaner = sykmeldtsOppfolgingdialogerKnyttetTilGyldigSykmelding
        .filter((plan) => {
            return plan.arbeidsgiver.naermesteLeder.sistInnlogget === null
                && plan.status === 'UNDER_ARBEID'
                && plan.sistEndretAv.fnr === plan.arbeidstaker.fnr
                && !idAlleredeFunnet(avventendeGodkjenninger, plan.id);
        });

    return [...nyePlaner, ...avventendeGodkjenninger];
};

export const sykmeldtHarGyldigSykmelding = (sykmeldinger) => {
    const dagensDato = new Date();
    return sykmeldinger.filter((sykmelding) => {
        return erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, dagensDato);
    }).length > 0;
};

export const erOppfolgingsdialogOpprettbarDirekte = (oppfolgingsdialoger) => {
    return !harTidligereOppfolgingsdialoger(oppfolgingsdialoger);
};

export const finnNyesteTidligereOppfolgingsdialogMedVirksomhet = (oppfolgingsdialoger) => {
    return finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)[0];
};

export const harForrigeNaermesteLeder = (oppfolgingsdialog) => {
    return oppfolgingsdialog.arbeidsgiver.forrigeNaermesteLeder;
};

export const harNaermesteLeder = (oppfolgingsdialog) => {
    return oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr;
};

export const harOppfolgingsdialog = (state, sykmeldt) => {
    return sykmeldt && state.oppfolgingsdialoger.data
        .filter((oppfolgingsplan) => {
            return oppfolgingsplan.arbeidstaker.fnr === sykmeldt.fnr;
        }).length > 0;
};
