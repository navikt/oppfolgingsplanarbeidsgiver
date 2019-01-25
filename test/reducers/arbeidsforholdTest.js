import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/arbeidsforhold_actions';
import arbeidsforhold from '../../js/reducers/arbeidsforhold';

describe('arbeidsforhold', () => {
    describe('henter', () => {
        const initialState = deepFreeze({
            henter: [],
            hentet: [],
            hentingFeilet: [],
            data: [],
        });

        it('håndterer HENTER_ARBEIDSFORHOLD', () => {
            const action = actions.henterArbeidsforhold('fnr', '123');
            const nextState = arbeidsforhold(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [{ fnr: 'fnr', virksomhetsnummer: '123' }],
                hentet: [],
                hentingFeilet: [],
                data: [],
            });
        });

        it('håndterer HENTET_ARBEIDSFORHOLD', () => {
            const action = actions.hentetArbeidsforhold(
                [{ yrke: 'konsulent' }],
                'fnr',
                '123',
            );
            const nextState = arbeidsforhold(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: [{ fnr: 'fnr', virksomhetsnummer: '123' }],
                hentingFeilet: [],
                data: [{ fnr: 'fnr', virksomhetsnummer: '123', stillinger: [{ yrke: 'konsulent' }] }],
            });
        });

        it('håndterer HENT_ARBEIDSFORHOLD_FEILET', () => {
            const action = actions.hentArbeidsforholdFeilet('fnr', '123');
            const nextState = arbeidsforhold(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: [],
                hentingFeilet: [{ fnr: 'fnr', virksomhetsnummer: '123' }],
                data: [],
            });
        });
    });
});
