import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/kommentar_actions';
import kommentar from '../../js/reducers/kommentar';

describe('kommentar', () => {
  const fnr = '12345678';
  const tiltakId = 1;

  describe('lagrer', () => {
    const initialState = deepFreeze({
      lagrer: false,
      lagret: false,
      lagringFeilet: false,
    });

    it('håndterer LAGRER_KOMMENTAR', () => {
      const action = actions.lagrerKommentar(fnr, tiltakId);
      const nextState = kommentar(initialState, action);
      expect(nextState).to.deep.equal({
        lagrer: true,
        lagret: false,
        lagringFeilet: false,
        tiltakId,
      });
    });

    it('håndterer KOMMENTAR_LAGRET', () => {
      const action = actions.kommentarLagret(fnr, tiltakId);
      const nextState = kommentar(initialState, action);
      expect(nextState).to.deep.equal({
        lagrer: false,
        lagret: true,
        lagringFeilet: false,
        tiltakId: 1,
      });
    });

    it('håndterer LAGRE_KOMMENTAR_FEILET', () => {
      const action = actions.lagreKommentarFeilet(fnr, 4);
      const nextState = kommentar(initialState, action);
      expect(nextState).to.deep.equal({
        feiletTiltakId: 4,
        sletter: false,
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

    it('håndterer SLETTER_KOMMENTAR', () => {
      const action = actions.sletterKommentar();
      const nextState = kommentar(initialState, action);
      expect(nextState).to.deep.equal({
        slettet: false,
        sletter: true,
        slettingFeilet: false,
      });
    });

    it('håndterer KOMMENTAR_SLETTET', () => {
      const action = actions.kommentarSlettet();
      const nextState = kommentar(initialState, action);
      expect(nextState).to.deep.equal({
        slettet: true,
        sletter: false,
        slettingFeilet: false,
      });
    });

    it('håndterer SLETT_KOMMENTAR_FEILET', () => {
      const action = actions.slettKommentarFeilet(fnr, 1, 2);
      const nextState = kommentar(initialState, action);
      expect(nextState).to.deep.equal({
        feiletKommentarId: 2,
        feiletTiltakId: 1,
        lagrer: false,
        lagringFeilet: false,
        slettet: false,
        sletter: false,
        slettingFeilet: true,
      });
    });
  });
});
