import * as actiontyper from '../actions/sykmeldinger/sykmeldinger_actions';

const initiellState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  data: undefined,
};

export default function dineSykmeldteMedSykmeldinger(state = initiellState, action = {}) {
  switch (action.type) {
    case actiontyper.DINE_SYKMELDTE_MED_SYKMELDINGER_HENTET:
      return {
        ...state,
        data: action.sykmeldinger,
        henter: false,
        hentet: true,
        hentingFeilet: false,
      };
    case actiontyper.HENTER_DINE_SYKMELDTE_MED_SYKMELDINGER:
      return {
        ...state,
        data: undefined,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    case actiontyper.HENT_DINE_SYKMELDTE_MED_SYKMELDINGER_FEILET:
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
