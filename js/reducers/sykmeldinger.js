import { parseSykmelding } from 'digisyfo-npm';
import * as actiontyper from '../actions/actiontyper';

const initiellState = {};

export default function sykmeldinger(state = initiellState, action = {}) {
    const sykmeldt = {};
    switch (action.type) {
        case actiontyper.SYKMELDTE_HENTET: {
            const nextState = {};
            action.sykmeldte.forEach((s) => {
                const stateForKobling = state[s.koblingId] || {
                    henter: false,
                    hentingFeilet: false,
                    hentet: false,
                    data: [],
                };
                nextState[s.koblingId] = stateForKobling;
            });
            return nextState;
        }
        case actiontyper.SYKMELDINGER_HENTET: {
            sykmeldt[action.koblingId] = {
                henter: false,
                hentingFeilet: false,
                hentet: true,
                data: action.sykmeldinger.map(parseSykmelding),
            };
            return { ...state, ...sykmeldt };
        }
        case actiontyper.HENTER_SYKMELDINGER: {
            sykmeldt[action.koblingId] = {
                henter: true,
                hentingFeilet: false,
                hentet: false,
                data: state[action.koblingId] ? state[action.koblingId].data : [],
            };
            return { ...state, ...sykmeldt };
        }
        case actiontyper.HENT_SYKMELDINGER_FEILET: {
            sykmeldt[action.koblingId] = {
                henter: false,
                hentingFeilet: true,
                hentet: true,
                data: state[action.koblingId] ? state[action.koblingId].data : [],
            };
            return { ...state, ...sykmeldt };
        }
        default: {
            return state;
        }
    }
}
