import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/samtykke_actions';
import samtykke from '../../js/reducers/samtykke';

describe('samtykke', () => {
  describe('henter', () => {
    const initialState = deepFreeze({
      sender: false,
      sendingFeilet: false,
    });

    it('håndterer GIR_SAMTYKKE', () => {
      const action = actions.girSamtykke();
      const nextState = samtykke(initialState, action);

      expect(nextState).to.deep.equal({
        sender: true,
        sendingFeilet: false,
      });
    });

    it('håndterer SAMTYKKE_GITT', () => {
      const action = actions.samtykkeGitt({ id: '1', samtykke: true });
      const nextState = samtykke(initialState, action);
      expect(nextState).to.deep.equal({
        sender: false,
        sendingFeilet: false,
      });
    });

    it('håndterer GITT_SAMTYKKE_FEILET', () => {
      const action = actions.giSamtykkeFeilet();
      const nextState = samtykke(initialState, action);
      expect(nextState).to.deep.equal({
        sender: false,
        sendingFeilet: true,
      });
    });
  });
});
