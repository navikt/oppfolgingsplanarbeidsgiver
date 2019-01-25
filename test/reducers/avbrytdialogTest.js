import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/avbrytdialog_actions';
import avbrytdialog from '../../js/reducers/avbrytdialog';

describe('avbrytdialog', () => {
    const initialState = deepFreeze({
        data: {},
        sender: false,
        sendt: false,
        sendingFeilet: false,
        nyPlanId: null,
    });

    it('håndterer AVBRYTER_DIALOG', () => {
        const action = actions.avbryterDialog();
        const nextState = avbrytdialog(initialState, action);
        expect(nextState).to.deep.equal({
            data: null,
            sender: true,
            sendt: false,
            sendingFeilet: false,
            nyPlanId: null,
        });
    });

    it('håndterer DIALOG_AVBRUTT', () => {
        const action = actions.dialogAvbrutt(1);
        const nextState = avbrytdialog(initialState, action);

        expect(nextState).to.deep.equal({
            data: 1,
            sender: false,
            sendt: true,
            sendingFeilet: false,
            nyPlanId: null,
        });
    });

    it('håndterer AVBRYT_DIALOG_FEILET', () => {
        const action = actions.avbrytDialogFeilet();
        const nextState = avbrytdialog(initialState, action);
        expect(nextState).to.deep.equal({
            data: {},
            sender: false,
            sendt: false,
            sendingFeilet: true,
            nyPlanId: null,
        });
    });

    it('håndterer DIALOG_AVBRUTT_OG_NY_OPPRETTET', () => {
        const action = actions.dialogAvbruttOgNyOpprettet(1);
        const nextState = avbrytdialog(initialState, action);
        expect(nextState).to.deep.equal({
            data: {},
            sender: false,
            sendt: true,
            sendingFeilet: false,
            nyPlanId: 1,
        });
    });
});
