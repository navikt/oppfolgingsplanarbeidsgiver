export const GI_SAMTYKKE_FORESPURT = 'GI_ARBEIDSOPPGAVE_FORESPURT';
export const GIR_SAMTYKKE = 'GIR_SAMTYKKE';
export const SAMTYKKE_GITT = 'SAMTYKKE_GITT';
export const GITT_SAMTYKKE_FEILET = 'GITT_SAMTYKKE_FEILET';

export const giSamtykke = (id, samtykke, fnr, erEgenLeder) => {
  return {
    type: GI_SAMTYKKE_FORESPURT,
    id,
    samtykke,
    fnr,
    erEgenLeder,
  };
};

export const girSamtykke = (fnr) => {
  return {
    type: GIR_SAMTYKKE,
    fnr,
  };
};

export const samtykkeGitt = (id, samtykke, fnr, erEgenLeder) => {
  return {
    type: SAMTYKKE_GITT,
    id,
    samtykke,
    fnr,
    erEgenLeder,
  };
};

export const giSamtykkeFeilet = (fnr) => {
  return {
    type: GITT_SAMTYKKE_FEILET,
    fnr,
  };
};
