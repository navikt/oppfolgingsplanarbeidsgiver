import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    post,
    hentSyfoapiUrl,
    API_NAVN,
} from '../../js/gateway-api/gatewayApi';
import { lagreKommentar, slettKommentar } from '../../js/sagas/oppfolgingsplan/kommentarSagas';
import * as actions from '../../js/actions/oppfolgingsplan/kommentar_actions';

describe('kommentarSagas', () => {
    let apiUrlBase;
    const fnr = '12345678';
    const tiltakId = 1;

    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
    });

    describe('lagreKommentar', () => {
        const generator = lagreKommentar({
            id: 1,
            tiltakId: 1,
            kommentar: {
                tekst: 'tekst',
            },
            fnr,
        });

        it(`Skal dispatche ${actions.LAGRER_KOMMENTAR}`, () => {
            const nextPut = put({
                type: actions.LAGRER_KOMMENTAR,
                fnr,
                tiltakId,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${apiUrlBase}/tiltak/actions/1/lagreKommentar`;
            const nextCall = call(post, url, {
                tekst: 'tekst',
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${actions.KOMMENTAR_LAGRET}`, () => {
            const nextPut = put({
                type: actions.KOMMENTAR_LAGRET,
                id: 1,
                tiltakId: 1,
                kommentar: {
                    tekst: 'tekst',
                },
                data: 1,
                fnr,
            });
            expect(generator.next(1).value).to.deep.equal(nextPut);
        });
    });

    describe('slettKommentar', () => {
        const generator = slettKommentar({
            id: 1,
            tiltakId: 1,
            kommentarId: 1,
            fnr,
        });

        it(`Skal dispatche ${actions.SLETTER_KOMMENTAR}`, () => {
            const nextPut = put({
                type: actions.SLETTER_KOMMENTAR,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${apiUrlBase}/kommentar/actions/1/slett`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${actions.KOMMENTAR_SLETTET}`, () => {
            const nextPut = put({
                type: actions.KOMMENTAR_SLETTET,
                id: 1,
                tiltakId: 1,
                kommentarId: 1,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
