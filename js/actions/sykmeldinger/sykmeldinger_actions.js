export const HENTER_DINE_SYKMELDTE_MED_SYKMELDINGER = 'HENTER_DINE_SYKMELDTE_MED_SYKMELDINGER';
export const DINE_SYKMELDTE_MED_SYKMELDINGER_HENTET = 'DINE_SYKMELDTE_MED_SYKMELDINGER_HENTET';
export const HENT_DINE_SYKMELDTE_MED_SYKMELDINGER_FEILET = 'HENT_DINE_SYKMELDTE_MED_SYKMELDINGER_FEILET';
export const HENT_DINE_SYKMELDTE_MED_SYKMELDINGER_FORESPURT = 'HENT_DINE_SYKMELDTE_MED_SYKMELDINGER_FORESPURT';

export function henterDineSykmeldteMedSykmeldinger() {
  return {
    type: HENTER_DINE_SYKMELDTE_MED_SYKMELDINGER,
  };
}

export function dineSykmeldteMedSykmeldingerHentet(sykmeldinger) {
  return {
    type: DINE_SYKMELDTE_MED_SYKMELDINGER_HENTET,
    sykmeldinger,
  };
}

export function hentDineSykmeldteMedSykmeldingerFeilet() {
  return {
    type: HENT_DINE_SYKMELDTE_MED_SYKMELDINGER_FEILET,
  };
}

export function hentDineSykmeldteMedSykmeldinger() {
  return {
    type: HENT_DINE_SYKMELDTE_MED_SYKMELDINGER_FORESPURT,
  };
}
