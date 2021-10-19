import * as actiontyper from './actiontyper';

export function henterSykmeldt() {
  return {
    type: actiontyper.HENTER_SYKMELDT,
  };
}

export function sykmeldtHentet(sykmeldt) {
  return {
    type: actiontyper.SYKMELDT_HENTET,
    sykmeldt,
  };
}

export function hentSykmeldtFeilet() {
  return {
    type: actiontyper.HENT_SYKMELDT_FEILET,
  };
}

export function hentSykmeldt(narmestelederId) {
  return {
    type: actiontyper.HENT_SYKMELDT_FORESPURT,
    narmestelederId,
  };
}
