import * as actiontyper from './actiontyper';

export function henterDineSykmeldteMedSykmeldinger() {
  return {
    type: actiontyper.HENTER_DINE_SYKMELDTE_MED_SYKMELDINGER,
  };
}

export function dineSykmeldteMedSykmeldingerHentet(sykmeldinger) {
  return {
    type: actiontyper.DINE_SYKMELDTE_MED_SYKMELDINGER_HENTET,
    sykmeldinger,
  };
}

export function hentDineSykmeldteMedSykmeldingerFeilet() {
  return {
    type: actiontyper.HENT_DINE_SYKMELDTE_MED_SYKMELDINGER_FEILET,
  };
}

export function hentDineSykmeldteMedSykmeldinger() {
  return {
    type: actiontyper.HENT_DINE_SYKMELDTE_MED_SYKMELDINGER_FORESPURT,
  };
}
