import * as actiontyper from './actiontyper';

export function henterSykmeldinger(koblingId) {
  return {
    type: actiontyper.HENTER_SYKMELDINGER,
    koblingId,
  };
}

export function sykmeldingerHentet(sykmeldinger = [], koblingId) {
  return {
    type: actiontyper.SYKMELDINGER_HENTET,
    sykmeldinger,
    koblingId,
  };
}

export function hentSykmeldingerFeilet(koblingId) {
  return {
    koblingId,
    type: actiontyper.HENT_SYKMELDINGER_FEILET,
  };
}

export function hentSykmeldinger(koblingId) {
  return {
    type: actiontyper.HENT_SYKMELDINGER_FORESPURT,
    koblingId,
  };
}
