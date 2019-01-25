import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/forespoerRevidering_actions';
import forespoerselRevidering from '../../js/reducers/forespoerselRevidering';

describe('forespoerselRevidering', () => {
    const initialState = deepFreeze({
        sender: false,
        sendt: false,
        sendingFeilet: false,
        data: {},
    });

    it('håndterer FORESPOER_REVIDERING_SENDER', () => {
        const action = actions.forespoerRevideringSender(1);
        const nextState = forespoerselRevidering(initialState, action);
        expect(nextState).to.deep.equal({
            sender: true,
            sendt: false,
            sendingFeilet: false,
            data: 1,
        });
    });

    it('håndterer FORESPOER_REVIDERING_SUKESS', () => {
        const action = actions.forespoerRevideringSuksess(1);
        const nextState = forespoerselRevidering(initialState, action);

        expect(nextState).to.deep.equal({
            sender: false,
            sendt: true,
            sendingFeilet: false,
            data: 1,
        });
    });

    it('håndterer FORESPOER_REVIDERING_FEILET', () => {
        const action = actions.forespoerRevideringFeilet(1);
        const nextState = forespoerselRevidering(initialState, action);
        expect(nextState).to.deep.equal({
            sender: false,
            sendt: false,
            sendingFeilet: true,
            data: 1,
        });
    });
});
