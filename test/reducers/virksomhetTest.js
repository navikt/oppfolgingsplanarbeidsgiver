import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/virksomhet_actions';
import virksomhet from '../../js/reducers/virksomhet';

describe('virsomhet', () => {
  describe('henter', () => {
    const initialState = deepFreeze({
      henter: [],
      hentet: [],
      hentingFeilet: [],
      data: [],
    });

    it('håndterer HENTER_VIRKSOMHET', () => {
      const action = actions.henterVirksomhet('virksomhetsnummer');
      const nextState = virksomhet(initialState, action);
      expect(nextState).to.deep.equal({
        henter: ['virksomhetsnummer'],
        hentet: [],
        hentingFeilet: [],
        data: [],
      });
    });

    it('håndterer VIRKSOMHET_HENTET', () => {
      const action = actions.virksomhetHentet(
        {
          navn: 'virksomhetsnavn',
          virksomhetsnummer: 'virksomhetsnummer',
        },
        'virksomhetsnummer'
      );
      const nextState = virksomhet(initialState, action);
      expect(nextState).to.deep.equal({
        henter: [],
        hentet: ['virksomhetsnummer'],
        hentingFeilet: [],
        data: [{ virksomhetsnummer: 'virksomhetsnummer', navn: 'virksomhetsnavn' }],
      });
    });

    it('håndterer HENT_VIRKSOMHET_FEILET', () => {
      const action = actions.hentVirksomhetFeilet('virksomhetsnummer');
      const nextState = virksomhet(initialState, action);
      expect(nextState).to.deep.equal({
        henter: [],
        hentet: [],
        hentingFeilet: ['virksomhetsnummer'],
        data: [],
      });
    });
  });
});
