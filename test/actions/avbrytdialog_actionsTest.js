import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/avbrytdialog_actions';

describe('avbrytdialog_actions', () => {
    let fnr;

    beforeEach(() => {
        fnr = '12345678';
    });

    it('Skal ha en avbrytDialog()-funksjon som returnerer riktig action', () => {
        expect(actions.avbrytDialog(1, fnr)).to.deep.equal({
            type: actions.AVBRYT_DIALOG_FORESPURT,
            id: 1,
            fnr,
        });
    });

    it('Skal ha en avbryterDialog()-funksjon som returnerer riktig action', () => {
        expect(actions.avbryterDialog(fnr)).to.deep.equal({
            type: actions.AVBRYTER_DIALOG,
            fnr,
        });
    });

    it('har en dialogAvbrutt()-funksjon som returnerer riktig action', () => {
        expect(actions.dialogAvbrutt(1, fnr)).to.deep.equal({
            type: actions.DIALOG_AVBRUTT,
            id: 1,
            fnr,
        });
    });

    it('Skal ha en avbrytDialogFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.avbrytDialogFeilet(fnr)).to.deep.equal({
            type: actions.AVBRYT_DIALOG_FEILET,
            fnr,
        });
    });

    it('Skal ha en dialogAvbruttOgNyOpprettet()-funksjon som returnerer riktig action', () => {
        expect(actions.dialogAvbruttOgNyOpprettet(1)).to.deep.equal({
            type: actions.DIALOG_AVBRUTT_OG_NY_OPPRETTET,
            nyPlanId: 1,
        });
    });
});
