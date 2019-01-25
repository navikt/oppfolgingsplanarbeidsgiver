import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/arbeidsoppgave_actions';

describe('arbeidsoppgave_actions', () => {
    const fnr = '12345678';
    const arbeidsoppgaveId = 1;
    it('Skal ha en lagreArbeidsoppgave()-funksjon som returnerer riktig action', () => {
        expect(actions.lagreArbeidsoppgave('id', {}, fnr)).to.deep.equal({
            type: actions.LAGRE_ARBEIDSOPPGAVE_FORESPURT,
            id: 'id',
            arbeidsoppgave: {},
            fnr,
        });
    });

    it('Skal ha en lagrerArbeidsoppgave()-funksjon som returnerer riktig action', () => {
        expect(actions.lagrerArbeidsoppgave(fnr, 1)).to.deep.equal({
            type: actions.LAGRER_ARBEIDSOPPGAVE,
            fnr,
            arbeidsoppgaveId,
        });
    });

    it('har en arbeidsoppgaveLagret()-funksjon som returnerer riktig action', () => {
        expect(actions.arbeidsoppgaveLagret(1, {}, { noedata: '123' }, fnr)).to.deep.equal({
            type: actions.ARBEIDSOPPGAVE_LAGRET,
            data: {},
            arbeidsoppgave: { noedata: '123' },
            id: 1,
            fnr,
        });
    });

    it('Skal ha en lagreArbeidsoppgaveFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.lagreArbeidsoppgaveFeilet(fnr, 1)).to.deep.equal({
            type: actions.LAGRE_ARBEIDSOPPGAVE_FEILET,
            fnr,
            arbeidsoppgave: 1,
        });
    });

    it('Skal ha en slettArbeidsoppgave()-funksjon som returnerer riktig action', () => {
        expect(actions.slettArbeidsoppgave('oppfoelginsdialogid', 'arbeidsoppgaveId', fnr)).to.deep.equal({
            type: actions.SLETT_ARBEIDSOPPGAVE_FORESPURT,
            id: 'oppfoelginsdialogid',
            arbeidsoppgaveId: 'arbeidsoppgaveId',
            fnr,
        });
    });

    it('Skal ha en sletterArbeidsoppgave()-funksjon som returnerer riktig action', () => {
        expect(actions.sletterArbeidsoppgave(fnr)).to.deep.equal({
            type: actions.SLETTER_ARBEIDSOPPGAVE,
            fnr,
        });
    });

    it('har en arbeidsoppgaveSlettet()-funksjon som returnerer riktig action', () => {
        expect(actions.arbeidsoppgaveSlettet('123', '321', fnr)).to.deep.equal({
            type: actions.ARBEIDSOPPGAVE_SLETTET,
            id: '123',
            arbeidsoppgaveId: '321',
            fnr,
        });
    });

    it('Skal ha en slettArbeidsoppgaveFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.slettArbeidsoppgaveFeilet(fnr, 1)).to.deep.equal({
            type: actions.SLETT_ARBEIDSOPPGAVE_FEILET,
            fnr,
            arbeidsoppgaveId: 1,
        });
    });
});
