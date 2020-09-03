import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/tiltak_actions';
import tiltak from '../../js/reducers/tiltak';
import getTiltak from '../mock/mockTiltak';

describe('tiltak', () => {
    const fnr = '12345678';
    const tiltakId = 1;
    const tmpTiltak = {
        tiltakId: 1,
    };

    describe('henter', () => {
        const tiltaker = getTiltak();
        const initialState = deepFreeze({
            lagrer: false,
            lagret: false,
            lagringFeilet: false,
        });

        it('håndterer LAGRER_TILTAK', () => {
            const action = actions.lagrerTiltak(fnr, tiltakId);
            const nextState = tiltak(initialState, action);
            expect(nextState).to.deep.equal({
                feiletTiltakId: 0,
                lagrer: true,
                lagret: false,
                lagringFeilet: false,
                tiltakId,
                tiltak: null,
            });
        });

        it('håndterer TILTAK_LAGRET', () => {
            const action = actions.tiltakLagret(1, [], tiltaker, fnr);
            const nextState = tiltak(initialState, action);
            expect(nextState).to.deep.equal({
                feiletTiltakId: 0,
                lagrer: false,
                lagret: true,
                lagringFeilet: false,
                tiltakId: 1345,
                tiltak: null,
            });
        });


        it('håndterer LAGRE_TILTAK_FEILET', () => {
            const action = actions.lagreTiltakFeilet(fnr, tmpTiltak);
            const nextState = tiltak(initialState, action);
            expect(nextState).to.deep.equal({
                lagrer: false,
                lagret: false,
                lagringFeilet: true,
                sletter: false,
                slettingFeilet: false,
                tiltak: tmpTiltak,
                feiletTiltakId: 1,
            });
        });
    });

    describe('sletter', () => {
        const initialState = deepFreeze({
            slettet: false,
            sletter: false,
            slettingFeilet: false,
        });

        it('håndterer SLETTER_TILTAK', () => {
            const action = actions.sletterTiltak();
            const nextState = tiltak(initialState, action);
            expect(nextState).to.deep.equal({
                feiletTiltakId: 0,
                slettet: false,
                sletter: true,
                slettingFeilet: false,
                tiltak: null,
            });
        });

        it('håndterer TILTAK_SLETTET', () => {
            const action = actions.tiltakSlettet();
            const nextState = tiltak(initialState, action);
            expect(nextState).to.deep.equal({
                feiletTiltakId: 0,
                lagret: false,
                lagringFeilet: false,
                slettet: true,
                sletter: false,
                slettingFeilet: false,
                tiltak: null,
            });
        });


        it('håndterer SLETT_TILTAK_FEILET', () => {
            const action = actions.slettTiltakFeilet(fnr, 1);
            const nextState = tiltak(initialState, action);
            expect(nextState).to.deep.equal({
                feiletTiltakId: 1,
                lagringFeilet: false,
                slettet: false,
                sletter: false,
                slettingFeilet: true,
                tiltak: null,
            });
        });
    });
});
