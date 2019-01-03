import {
    erSykmeldingGyldigForOppfolgingMedGrensedato,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
} from 'oppfolgingsdialog-npm';

export const isEmpty = (array) => {
    return !array || array.length === 0;
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
