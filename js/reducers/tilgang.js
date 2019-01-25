import {
    SJEKKER_TILGANG,
    SJEKKET_TILGANG,
    SJEKK_TILGANG_FEILET,
    SJEKK_TILGANG_403,
} from '../actions/oppfolgingsplan/sjekkTilgang_actions';

const initiellState = {};

const tilgang = (state = initiellState, action = {}) => {
    const sykmeldt = {};
    switch (action.type) {
        case SJEKKER_TILGANG: {
            sykmeldt[action.fnr] = {
                henter: true,
                hentet: false,
                hentingFeilet: false,
                data: {},
            };
            return Object.assign({}, state, sykmeldt);
        }
        case SJEKKET_TILGANG: {
            sykmeldt[action.fnr] = {
                henter: false,
                hentet: true,
                hentingFeilet: false,
                data: action.data,
            };
            return Object.assign({}, state, sykmeldt);
        }
        case SJEKK_TILGANG_FEILET: {
            sykmeldt[action.fnr] = {
                henter: false,
                hentet: false,
                hentingFeilet: true,
                data: {},
            };
            return Object.assign({}, state, sykmeldt);
        }
        case SJEKK_TILGANG_403: {
            sykmeldt[action.fnr] = {
                henter: false,
                hentet: false,
                hentingFeilet: false,
                data: {
                    harTilgang: false,
                },
            };
            return Object.assign({}, state, sykmeldt);
        }
        default:
            return state;
    }
};

export default tilgang;
