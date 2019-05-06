import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    post,
    hentSyfoapiUrl,
    API_NAVN,
} from '../../js/gateway-api/gatewayApi';
import { lagreTiltak, slettTiltak } from '../../js/sagas/oppfolgingsplan/tiltakSagas';
import * as actions from '../../js/actions/oppfolgingsplan/tiltak_actions';

describe('tiltakSagas', () => {
    let apiUrlBase;
    const fnr = '12345678';
    const tiltakId = '1';

    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
    });

    describe('lagreTiltak', () => {
        const generator = lagreTiltak({
            tiltak: {
                tiltaknavn: 'tiltak123',
                tiltakId: '1',
            },
            id: '123',
            fnr,
        });

        it(`Skal dispatche ${actions.LAGRER_TILTAK}`, () => {
            const nextPut = put({
                type: actions.LAGRER_TILTAK,
                fnr,
                tiltakId,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${apiUrlBase}/oppfolgingsplan/actions/123/lagreTiltak`;
            const nextCall = call(post, url, {
                tiltaknavn: 'tiltak123',
                tiltakId: '1',
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${actions.TILTAK_LAGRET}`, () => {
            const nextPut = put({
                type: actions.TILTAK_LAGRET,
                id: '123',
                tiltak: {
                    tiltaknavn: 'tiltak123',
                    tiltakId: '1',
                },
                data: 1,
                fnr,
            });
            expect(generator.next(1).value).to.deep.equal(nextPut);
        });
    });

    describe('slettTiltak', () => {
        const generator = slettTiltak({
            tiltakId: '123',
            id: '123',
            fnr,
        });

        it(`Skal dispatche ${actions.SLETTER_TILTAK}`, () => {
            const nextPut = put({
                type: actions.SLETTER_TILTAK,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${apiUrlBase}/tiltak/actions/123/slett`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette tiltak til ${actions.TILTAK_SLETTET}`, () => {
            const nextPut = put({
                type: actions.TILTAK_SLETTET,
                id: '123',
                tiltakId: '123',
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
