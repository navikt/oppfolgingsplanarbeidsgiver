import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/delmednav_actions';
import delmednav from '../../js/reducers/delmednav';

describe('avbrytdialog', () => {
    const initialState = deepFreeze({
        sender: false,
        sendingFeilet: false,
        data: {},
    });

    it('håndterer DELER_MED_NAV', () => {
        const action = actions.delerMedNav();
        const nextState = delmednav(initialState, action);
        expect(nextState).to.deep.equal({
            sender: true,
            sendingFeilet: false,
            data: {},
        });
    });

    it('håndterer DELT_MED_NAV', () => {
        const action = actions.deltMedNav(1);
        const nextState = delmednav(initialState, action);

        expect(nextState).to.deep.equal({
            sender: false,
            sendingFeilet: false,
            data: 1,
        });
    });

    it('håndterer DEL_MED_NAV_FEILET', () => {
        const action = actions.delMedNavFeilet();
        const nextState = delmednav(initialState, action);
        expect(nextState).to.deep.equal({
            sender: false,
            sendingFeilet: true,
            data: {},
        });
    });
});
