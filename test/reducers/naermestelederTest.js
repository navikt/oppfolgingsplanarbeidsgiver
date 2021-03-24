import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/naermesteLeder_actions';
import naermesteleder from '../../js/reducers/naermesteleder';

describe('naermesteleder', () => {
  describe('henter', () => {
    const initialState = deepFreeze({
      henter: [],
      hentet: [],
      hentingFeilet: [],
      data: [],
    });

    it('håndterer HENTER_NAERMESTELEDER', () => {
      const action = actions.henterNaermesteLeder('fnr', '123');
      const nextState = naermesteleder(initialState, action);
      expect(nextState).to.deep.equal({
        henter: [{ fnr: 'fnr', virksomhetsnummer: '123' }],
        hentet: [],
        hentingFeilet: [],
        data: [],
      });
    });

    it('håndterer NAERMESTELEDER_HENTET', () => {
      const action = actions.naermesteLederHentet(
        {
          fnr: 'nlfnr',
          virksomhetsnummer: '123',
        },
        'fnr',
        '123'
      );
      const nextState = naermesteleder(initialState, action);
      expect(nextState).to.deep.equal({
        henter: [],
        hentet: [{ fnr: 'fnr', virksomhetsnummer: '123' }],
        hentingFeilet: [],
        data: [
          {
            fnr: 'fnr',
            virksomhetsnummer: '123',
            naermesteLeder: {
              fnr: 'nlfnr',
              virksomhetsnummer: '123',
            },
          },
        ],
      });
    });

    it('håndterer HENT_NAERMESTELEDER_FEILET', () => {
      const action = actions.hentNaermesteLederFeilet('fnr', '123');
      const nextState = naermesteleder(initialState, action);
      expect(nextState).to.deep.equal({
        henter: [],
        hentet: [],
        hentingFeilet: [{ fnr: 'fnr', virksomhetsnummer: '123' }],
        data: [],
      });
    });
  });
});
