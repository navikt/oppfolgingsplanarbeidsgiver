import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/nullstillGodkjenning_actions';

describe('nullstillGodkjenning_actions', () => {
    const fnr = '12345678';

    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    it('Skal ha en nullstillGodkjenning()-funksjon som returnerer riktig action', () => {
        expect(actions.nullstillGodkjenning(1, fnr)).to.deep.equal({
            type: actions.NULLSTILL_GODKJENNING_FORESPURT,
            id: 1,
            fnr,
        });
    });

    it('Skal ha en nullstillerGodkjenning()-funksjon som returnerer riktig action', () => {
        expect(actions.nullstillerGodkjenning(fnr)).to.deep.equal({
            type: actions.NULLSTILLER_GODKJENNING,
            fnr,
        });
    });

    it('har en nullstiltGodkjenning()-funksjon som returnerer riktig action', () => {
        expect(actions.nullstiltGodkjenning(1, fnr)).to.deep.equal({
            type: actions.NULLSTILT_GODKJENNING,
            id: 1,
            fnr,
        });
    });

    it('Skal ha en nullstillGodkjenningFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.nullstillGodkjenningFeilet(fnr)).to.deep.equal({
            type: actions.NULLSTILL_GODKJENNING_FEILET,
            fnr,
        });
    });
});
