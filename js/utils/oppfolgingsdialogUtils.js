import {
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
} from 'oppfolgingsdialog-npm';

export const isEmpty = (array) => {
    return !array || array.length === 0;
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
