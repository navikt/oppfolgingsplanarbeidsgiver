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

    describe('henter, med kall som feiler og så går gjennom', () => {
        it('HENTER_KONTAKTINFO skal fjerne fnr fra hentingFeilet-listen', () => {
            const state = deepFreeze({
                henter: [],
                hentet: [],
                hentingFeilet: ['fnr'],
                data: [],
            });

            const action = actions.henterKontaktinfo('fnr');
            const nextState = kontaktinfo(state, action);

            expect(nextState).to.deep.equal({
                henter: ['fnr'],
                hentet: [],
                hentingFeilet: [],
                data: [],
            });
        });

        it('HENT_KONTAKTINFO_FEILET Skal fjerne fnr fra henter-lister', () => {
            const state = deepFreeze({
                henter: ['fnr'],
                hentet: [],
                hentingFeilet: [],
                data: [],
            });

            const action = actions.hentKontaktinfoFeilet('fnr');
            const nextState = kontaktinfo(state, action);

            expect(nextState).to.deep.equal({
                henter: [],
                hentet: [],
                hentingFeilet: ['fnr'],
                data: [],
            });
        });

        it('KONTAKTINFO_HENTET skal fjerne fnr fra henter-listen', () => {
            const state = deepFreeze({
                henter: ['fnr1'],
                hentet: [],
                hentingFeilet: ['fnr2'],
                data: [],
            });

            const action = actions.kontaktinfoHentet({
                fnr: 'fnr1',
                tlf: '123',
                epost: 'test@nav.no',
            }, 'fnr1',
            );
            const nextState = kontaktinfo(state, action);

            expect(nextState).to.deep.equal({
                henter: [],
                hentet: ['fnr1'],
                hentingFeilet: ['fnr2'],
                data: [{
                    kontaktinfo: {
                        fnr: 'fnr1',
                        tlf: '123',
                        epost: 'test@nav.no',
                    },
                    fnr: 'fnr1',
                }],
            });
        });

        it('KONTAKTINFO_HENTET skal fjerne fnr fra hentingFeilet-listen', () => {
            const state = deepFreeze({
                henter: [],
                hentet: ['fnr1'],
                hentingFeilet: ['fnr2'],
                data: [{
                    kontaktinfo: {
                        fnr: 'fnr1',
                        tlf: '123',
                        epost: 'test@nav.no',
                    },
                    fnr: 'fnr1',
                }],
            });

            const action = actions.kontaktinfoHentet({
                fnr: 'fnr2',
                tlf: '123',
                epost: 'test@nav.no',
            }, 'fnr2',
            );
            const nextState = kontaktinfo(state, action);

            expect(nextState).to.deep.equal({
                henter: [],
                hentet: ['fnr1', 'fnr2'],
                hentingFeilet: [],
                data: [{
                    kontaktinfo: {
                        fnr: 'fnr1',
                        tlf: '123',
                        epost: 'test@nav.no',
                    },
                    fnr: 'fnr1',
                },
                {
                    kontaktinfo: {
                        fnr: 'fnr2',
                        tlf: '123',
                        epost: 'test@nav.no',
                    },
                    fnr: 'fnr2',
                }],
            });
        });
    });
});
