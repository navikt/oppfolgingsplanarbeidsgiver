import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/kontaktinfo_actions';
import kontaktinfo from '../../js/reducers/kontaktinfo';

describe('kontaktinfo', () => {
    describe('henter', () => {
        const initialState = deepFreeze({
            henter: [],
            hentet: [],
            hentingFeilet: [],
            data: [],
        });

        it('håndterer HENTER_KONTAKTINFO', () => {
            const action = actions.henterKontaktinfo('fnr');
            const nextState = kontaktinfo(initialState, action);
            expect(nextState).to.deep.equal({
                henter: ['fnr'],
                hentet: [],
                hentingFeilet: [],
                data: [],
            });
        });

        it('håndterer KONTAKTINFO_HENTET', () => {
            const state = deepFreeze({
                henter: ['fnr'],
                hentet: [],
                hentingFeilet: [],
                data: [],
            });
            const action = actions.kontaktinfoHentet({
                fnr: 'fnr',
                tlf: '123',
                epost: 'test@nav.no',
            }, 'fnr',
            );
            const nextState = kontaktinfo(state, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: ['fnr'],
                hentingFeilet: [],
                data: [{
                    kontaktinfo: {
                        fnr: 'fnr',
                        tlf: '123',
                        epost: 'test@nav.no',
                    },
                    fnr: 'fnr',
                }],
            });
        });

        it('håndterer HENT_KONTAKTINFO_FEILET', () => {
            const action = actions.hentKontaktinfoFeilet('fnr');
            const nextState = kontaktinfo(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: [],
                hentingFeilet: ['fnr'],
                data: [],
            });
        });
    });
});
