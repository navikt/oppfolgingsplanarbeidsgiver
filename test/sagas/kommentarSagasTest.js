import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { post } from 'digisyfo-npm';
import { lagreKommentar, slettKommentar } from '../../js/sagas/oppfolgingsplan/kommentarSagas';
import * as actions from '../../js/actions/oppfolgingsplan/kommentar_actions';

describe('kommentarSagas', () => {
    const fnr = '12345678';
    const tiltakId = 1;

    beforeEach(() => {
        process.env = {
            REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
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

        it('Skal dispatche LAGRER_KOMMENTAR', () => {
            const nextPut = put({
                type: actions.LAGRER_KOMMENTAR,
                fnr,
                tiltakId,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/tiltak/actions/1/lagreKommentar`;
            const nextCall = call(post, url, {
                tekst: 'tekst',
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette kommentar lagret', () => {
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

        it('Skal dispatche SLETTER_KOMMENTAR', () => {
            const nextPut = put({
                type: actions.SLETTER_KOMMENTAR,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/kommentar/actions/1/slett`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette kommentar til slettet', () => {
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
