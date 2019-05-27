export const SLETT_SYKMELDT_FORESPURT = 'SLETT_SYKMELDT_FORESPURT';
export const SLETTER_SYKMELDT = 'SLETTER_SYKMELDT';
export const SYKMELDT_SLETTET = 'SYKMELDT_SLETTET';
export const SLETT_SYKMELDT_FEILET = 'SLETT_SYKMELDT_FEILET';

export function slettSykmeldt(fnr, orgnr) {
    return {
        type: SLETT_SYKMELDT_FORESPURT,
        fnr,
        orgnr,
    };
}

export function sletterSykmeldt() {
    return {
        type: SLETTER_SYKMELDT,
    };
}

export function slettSykmeldtFeilet() {
    return {
        type: SLETT_SYKMELDT_FEILET,
    };
}

export function sykmeldtSlettet(fnr, orgnr) {
    return {
        type: SYKMELDT_SLETTET,
        fnr,
        orgnr,
    };
}
