import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/delmednav_actions';

describe('delmednav_actions', () => {
    let fnr;

    beforeEach(() => {
        fnr = '12345678';
    });

    it('Skal ha en delMedNav()-funksjon som returnerer riktig action', () => {
        expect(actions.delMedNav(1, fnr)).to.deep.equal({
            type: actions.DEL_MED_NAV_FORESPURT,
            id: 1,
            fnr,
        });
    });

    it('Skal ha en delerMedNav()-funksjon som returnerer riktig action', () => {
        expect(actions.delerMedNav(fnr)).to.deep.equal({
            type: actions.DELER_MED_NAV,
            fnr,
        });
    });

    it('har en deltMedNav()-funksjon som returnerer riktig action', () => {
        expect(actions.deltMedNav(1, fnr)).to.deep.equal({
            type: actions.DELT_MED_NAV,
            id: 1,
            fnr,
        });
    });

    it('Skal ha en delMedNavFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.delMedNavFeilet(fnr)).to.deep.equal({
            type: actions.DEL_MED_NAV_FEILET,
            fnr,
        });
    });
});
