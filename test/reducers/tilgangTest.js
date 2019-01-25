import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as actions from '../../js/actions/oppfolgingsplan/sjekkTilgang_actions';
import tilgang from '../../js/reducers/tilgang';

describe('tilgang', () => {
    describe('henter', () => {
        let initialState = deepFreeze({});
        const fnr = '12345678';

        it('håndterer SJEKKER_TILGANG_AG', () => {
            const action = actions.sjekkerTilgang(fnr);
            const nextState = tilgang(initialState, action);
            expect(nextState).to.deep.equal({
                [fnr]: {
                    henter: true,
                    hentet: false,
                    hentingFeilet: false,
                    data: {},
                },
            });
        });

        it('håndterer SJEKKET_TILGANG_AG', () => {
            const action = actions.sjekketTilgang({ tilgang: 'tilgang' }, fnr);
            const nextState = tilgang(initialState, action);

            expect(nextState).to.deep.equal({
                [fnr]: {
                    henter: false,
                    hentet: true,
                    hentingFeilet: false,
                    data: { tilgang: 'tilgang' },
                },
            });
        });

        it('håndterer SJEKK_TILGANG_AG_FEILET', () => {
            initialState = deepFreeze({
                [fnr]: {
                    henter: false,
                    hentet: false,
                    hentingFeilet: true,
                    data: {},
                },
            });

            const action = actions.sjekkTilgangFeilet(fnr);
            const nextState = tilgang(initialState, action);
            expect(nextState).to.deep.equal({
                [fnr]: {
                    henter: false,
                    hentet: false,
                    hentingFeilet: true,
                    data: {},
                },
            });
        });
    });
});
