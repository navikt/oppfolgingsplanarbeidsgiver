import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/arbeidsoppgave_actions';
import arbeidsoppgaver from '../../js/reducers/arbeidsoppgaver';
import getArbeidsoppgave from '../mock/mockArbeidsoppgave';

describe('arbeidsoppgaver', () => {
  const fnr = '12345678';
  const arbeidsoppgaveId = 1;
  const tmpArbeidsoppgave = {
    arbeidsoppgaveId: 1,
  };

  describe('lagrer', () => {
    const arbeidsoppaver = getArbeidsoppgave();
    const initialState = deepFreeze({
      lagrer: false,
      lagret: false,
      lagringFeilet: false,
    });

    it('håndterer LAGRER_ARBEIDSOPPGAVE', () => {
      const action = actions.lagrerArbeidsoppgave(fnr, arbeidsoppgaveId);
      const nextState = arbeidsoppgaver(initialState, action);

      expect(nextState).to.deep.equal({
        lagrer: true,
        lagret: false,
        lagringFeilet: false,
        slettingFeilet: false,
        arbeidsoppgave: null,
      });
    });

    it('håndterer ARBEIDSOPPGAVE_LAGRET', () => {
      const action = actions.arbeidsoppgaveLagret(1, [], arbeidsoppaver, fnr);
      const nextState = arbeidsoppgaver(initialState, action);
      expect(nextState).to.deep.equal({
        lagrer: false,
        lagret: true,
        lagringFeilet: false,
        feiletOppgaveId: 0,
        arbeidsoppgave: null,
      });
    });

    it('håndterer LAGRE_ARBEIDSOPPGAVE_FEILET', () => {
      const action = actions.lagreArbeidsoppgaveFeilet(fnr, tmpArbeidsoppgave);
      const nextState = arbeidsoppgaver(initialState, action);
      expect(nextState).to.deep.equal({
        arbeidsoppgave: tmpArbeidsoppgave,
        feiletOppgaveId: 1,
        slettingFeilet: false,
        lagrer: false,
        lagret: false,
        lagringFeilet: true,
      });
    });
  });

  describe('sletter', () => {
    const initialState = deepFreeze({
      slettet: false,
      sletter: false,
      slettingFeilet: false,
    });

    it('håndterer SLETTER_ARBEIDSOPPGAVE', () => {
      const action = actions.sletterArbeidsoppgave();
      const nextState = arbeidsoppgaver(initialState, action);

      expect(nextState).to.deep.equal({
        lagringFeilet: false,
        slettet: false,
        sletter: true,
        slettingFeilet: false,
        arbeidsoppgave: null,
      });
    });

    it('håndterer ARBEIDSOPPGAVE_SLETTET', () => {
      const action = actions.arbeidsoppgaveSlettet();
      const nextState = arbeidsoppgaver(initialState, action);
      expect(nextState).to.deep.equal({
        lagret: false,
        lagringFeilet: false,
        slettet: true,
        sletter: false,
        slettingFeilet: false,
        arbeidsoppgave: null,
      });
    });

    it('håndterer SLETT_ARBEIDSOPPGAVE_FEILET', () => {
      const action = actions.slettArbeidsoppgaveFeilet(fnr, 1);
      const nextState = arbeidsoppgaver(initialState, action);
      expect(nextState).to.deep.equal({
        feiletOppgaveId: 1,
        lagringFeilet: false,
        slettet: false,
        sletter: false,
        slettingFeilet: true,
        arbeidsoppgave: null,
      });
    });
  });
});
