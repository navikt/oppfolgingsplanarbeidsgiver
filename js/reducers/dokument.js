import * as actions from '../actions/oppfolgingsplan/dokument_actions';

const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    id: null,
};

const dokument = (state = initiellState, action = {}) => {
    switch (action.type) {
        case actions.HENTER_PDFURLER:
            return Object.assign({}, state, {
                henter: true,
                hentet: false,
                hentingFeilet: false,
            });
        case actions.PDFURLER_HENTET:
            return Object.assign({}, state, {
                data: action.data,
                henter: false,
                hentet: true,
                hentingFeilet: false,
                id: action.id,
            });
        case actions.HENT_PDFURLER_FEILET:
            return Object.assign({}, state, {
                henter: false,
                hentet: false,
                hentingFeilet: true,
            });
        default:
            return state;
    }
};

export default dokument;
