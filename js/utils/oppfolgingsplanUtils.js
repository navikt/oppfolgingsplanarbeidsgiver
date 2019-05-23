import {
    erSykmeldingGyldigForOppfolgingMedGrensedato,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
} from 'oppfolgingsdialog-npm';

import { STATUS } from '../konstanter';
import { erGyldigDatoIFortiden } from './datoUtils';

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

export const finnNyesteGodkjenning = (godkjenninger) => {
    return godkjenninger.sort((g1, g2) => {
        return new Date(g2.godkjenningsTidspunkt) - new Date(g1.godkjenningsTidspunkt);
    })[0];
};

export const erOppfolgingsdialogKnyttetTilGyldigSykmelding = (oppfolgingsdialog, sykmeldinger) => {
    const dagensDato = new Date();
    return sykmeldinger.filter((sykmelding) => {
        return oppfolgingsdialog.virksomhet.virksomhetsnummer === sykmelding.orgnummer
            && erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, dagensDato);
    }).length > 0;
};

export const erOppfolgingsdialogAktiv = (oppfolgingsdialog) => {
    return !oppfolgingsdialog.godkjentPlan ||
        (oppfolgingsdialog.status !== STATUS.AVBRUTT && !erGyldigDatoIFortiden(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom));
};

export const finnAktiveOppfolgingsdialoger = (oppfolgingsdialoger, sykmeldinger) => {
    if (!sykmeldinger) {
        return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
            return !oppfolgingsdialog.godkjentPlan || erOppfolgingsdialogAktiv(oppfolgingsdialog);
        });
    }
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return erOppfolgingsdialogKnyttetTilGyldigSykmelding(oppfolgingsdialog, sykmeldinger) &&
            (!oppfolgingsdialog.godkjentPlan || (oppfolgingsdialog.status !== STATUS.AVBRUTT && !erGyldigDatoIFortiden(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom)));
    });
};

export const harAktivOppfolgingsdialog = (oppfolgingsdialoger, sykmeldinger) => {
    return finnAktiveOppfolgingsdialoger(oppfolgingsdialoger, sykmeldinger).length > 0;
};
