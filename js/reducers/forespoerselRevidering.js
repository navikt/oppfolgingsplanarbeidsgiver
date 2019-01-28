import {
    FORESPOER_REVIDERING_SENDER,
    FORESPOER_REVIDERING_SUKSESS,
    FORESPOER_REVIDERING_FEILET,
} from '../actions/oppfolgingsplan/forespoerRevidering_actions';

const initiellState = {
    sender: false,
    sendt: false,
    sendingFeilet: false,
    data: {},
};

const forespoerselRevidering = (state = initiellState, action = {}) => {
    switch (action.type) {
        case FORESPOER_REVIDERING_SENDER: {
            return Object.assign({}, state, {
                sender: true,
                sendt: false,
                sendingFeilet: false,
                data: action.id,
            });
        }
        case FORESPOER_REVIDERING_SUKSESS: {
            return Object.assign({}, state, {
                sender: false,
                sendt: true,
                data: action.id,
            });
        }
        case FORESPOER_REVIDERING_FEILET: {
            return Object.assign({}, state, {
                sender: false,
                sendingFeilet: true,
                data: action.id,
            });
        }
        default:
            return state;
    }
};

export default forespoerselRevidering;
