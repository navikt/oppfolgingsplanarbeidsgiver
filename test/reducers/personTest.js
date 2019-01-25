import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/person_actions';
import person from '../../js/reducers/person';

describe('person', () => {
    describe('henter', () => {
        const initialState = deepFreeze({
            henter: [],
            hentet: [],
            hentingFeilet: [],
            data: [],
        });

        it('håndterer HENTER_PERSON', () => {
            const action = actions.henterPerson('fnr');
            const nextState = person(initialState, action);
            expect(nextState).to.deep.equal({
                henter: ['fnr'],
                hentet: [],
                hentingFeilet: [],
                data: [],
            });
        });

        it('håndterer PERSON_HENTET', () => {
            const action = actions.personHentet({
                navn: 'navn',
                fnr: 'fnr',
            }, 'fnr',
            );
            const nextState = person(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: ['fnr'],
                hentingFeilet: [],
                data: [{ fnr: 'fnr', navn: 'navn' }],
            });
        });

        it('håndterer HENT_PERSON_FEILET', () => {
            const action = actions.hentPersonFeilet('fnr');
            const nextState = person(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: [],
                hentingFeilet: ['fnr'],
                data: [],
            });
        });
    });
});
