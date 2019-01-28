import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/samtykke_actions';

describe('samtykke_actions', () => {
    const fnr = '12345678';

    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            OPPFOELGINGSDIALOGREST_ROOT: 'http://tjenester.nav.no/oppfoelgingsdialogrest/api',
        };
    });

    it('Skal ha en giSamtykke()-funksjon som returnerer riktig action', () => {
        expect(actions.giSamtykke('123', true, fnr)).to.deep.equal({
            type: actions.GI_SAMTYKKE_FORESPURT,
            id: '123',
            samtykke: true,
            fnr,
        });
    });

    it('Skal ha en girSamtykke()-funksjon som returnerer riktig action', () => {
        expect(actions.girSamtykke(fnr)).to.deep.equal({
            type: actions.GIR_SAMTYKKE,
            fnr,
        });
    });

    it('har en samtykkeGitt()-funksjon som returnerer riktig action', () => {
        expect(actions.samtykkeGitt(12345, true, fnr)).to.deep.equal({
            type: actions.SAMTYKKE_GITT,
            id: 12345,
            samtykke: true,
            fnr,
        });
    });

    it('Skal ha en giSamtykkeFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.giSamtykkeFeilet(fnr)).to.deep.equal({
            type: actions.GITT_SAMTYKKE_FEILET,
            fnr,
        });
    });
});
