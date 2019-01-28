import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/forespoerRevidering_actions';

describe('forespoerRevidering_actions', () => {
    let id;

    beforeEach(() => {
        id = 1;
    });

    it('Skal ha en forespoerRevidering()-funksjon som returnerer riktig action', () => {
        expect(actions.forespoerRevidering(id)).to.deep.equal({
            type: actions.FORESPOER_REVIDERING_FORESPURT,
            id,
        });
    });

    it('Skal ha en forespoerRevideringSender()-funksjon som returnerer riktig action', () => {
        expect(actions.forespoerRevideringSender(id)).to.deep.equal({
            type: actions.FORESPOER_REVIDERING_SENDER,
            id,
        });
    });

    it('har en forespoerRevideringSuksess()-funksjon som returnerer riktig action', () => {
        expect(actions.forespoerRevideringSuksess(id)).to.deep.equal({
            type: actions.FORESPOER_REVIDERING_SUKSESS,
            id,
        });
    });

    it('Skal ha en forespoerRevideringFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.forespoerRevideringFeilet(id)).to.deep.equal({
            type: actions.FORESPOER_REVIDERING_FEILET,
            id,
        });
    });
});
