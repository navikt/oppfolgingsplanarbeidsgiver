import * as actiontyper from '../actions/actiontyper';

export function slettSykmeldt(fnr, orgnr) {
    return {
        type: actiontyper.SLETT_SYKMELDT_FORESPURT,
        fnr,
        orgnr,
    };
}

export function sletterSykmeldt() {
    return {
        type: actiontyper.SLETTER_SYKMELDT,
    };
}

export function slettSykmeldtFeilet() {
    return {
        type: actiontyper.SLETT_SYKMELDT_FEILET,
    };
}

export function sykmeldtSlettet(fnr, orgnr) {
    return {
        type: actiontyper.SYKMELDT_SLETTET,
        fnr,
        orgnr,
    };
}
