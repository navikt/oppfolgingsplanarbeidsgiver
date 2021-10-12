import * as actiontyper from '../actions/actiontyper';

const initiellState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  data: undefined,
};

export default function sykmeldt(state = initiellState, action = {}) {
  switch (action.type) {
    case actiontyper.SYKMELDT_HENTET:
      return {
        ...state,
        data: action.sykmeldt,
        henter: false,
        hentet: true,
        hentingFeilet: false,
      };
    case actiontyper.HENTER_SYKMELDT:
      return {
        ...state,
        data: undefined,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    case actiontyper.HENT_SYKMELDT_FEILET:
      return {
        ...state,
        data: undefined,
        henter: false,
        hentingFeilet: true,
        hentet: true,
      };
    default:
      return state;
  }
}
