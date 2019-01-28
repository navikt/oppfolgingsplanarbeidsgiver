import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/sjekkTilgang_actions';

describe('tilgangAg_actions', () => {
    const fnr = '12345678';

    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    it('Skal ha en sjekkTilgang()-funksjon som returnerer riktig action', () => {
        expect(actions.sjekkTilgang(fnr)).to.deep.equal({
            type: actions.SJEKK_TILGANG_FORESPURT,
            fnr,
        });
    });

    it('Skal ha en sjekkerTilgang()-funksjon som returnerer riktig action', () => {
        expect(actions.sjekkerTilgang(fnr)).to.deep.equal({
            type: actions.SJEKKER_TILGANG,
            fnr,
        });
    });

    it('har en sjekketTilgang()-funksjon som returnerer riktig action', () => {
        expect(actions.sjekketTilgang([{ tilgang: 'tilgang' }], fnr)).to.deep.equal({
            type: actions.SJEKKET_TILGANG,
            data: [{ tilgang: 'tilgang' }],
            fnr,
        });
    });

    it('Skal ha en sjekkTilgangFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.sjekkTilgangFeilet(fnr)).to.deep.equal({
            type: actions.SJEKK_TILGANG_FEILET,
            fnr,
        });
    });
});
