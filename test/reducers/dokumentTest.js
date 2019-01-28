import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/dokument_actions';
import dokument from '../../js/reducers/dokument';

describe('dokument', () => {
    describe('henter', () => {
        const initialState = deepFreeze({
            data: [],
            henter: false,
            hentet: false,
            hentingFeilet: false,
            id: null,
        });

        it('håndterer HENTER_PDFURLER', () => {
            const action = actions.henterPdfurler();
            const nextState = dokument(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: true,
                hentet: false,
                hentingFeilet: false,
                id: null,
            });
        });

        it('håndterer PDFURLER_HENTET', () => {
            const action = actions.pdfurlerHentet([{ url: '1' }, { url: '2' }], '1');
            const nextState = dokument(initialState, action);

            expect(nextState).to.deep.equal({
                data: [{ url: '1' }, { url: '2' }],
                henter: false,
                hentet: true,
                hentingFeilet: false,
                id: '1',
            });
        });

        it('håndterer HENT_PDFURLER_FEILET', () => {
            const action = actions.hentPdfurlerFeilet();
            const nextState = dokument(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: false,
                hentet: false,
                hentingFeilet: true,
                id: null,
            });
        });
    });
});
