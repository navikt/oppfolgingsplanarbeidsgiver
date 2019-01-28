import { expect } from 'chai';
import { get } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import { henterPdfurler } from '../../js/sagas/oppfolgingsplan/dokumentSagas';
import * as actions from '../../js/actions/oppfolgingsplan/dokument_actions';

describe('dokumentSagas', () => {
    beforeEach(() => {
        process.env = {
            REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    describe('henterPdfurler', () => {
        const generator = henterPdfurler({
            id: '1',
        });

        it('Skal dispatche HENTER_PDFURLER', () => {
            const nextPut = put({
                type: actions.HENTER_PDFURLER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/dokument/1/pdfurler`;
            const nextCall = call(get, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette pdfurler henter', () => {
            const nextPut = put({
                type: actions.PDFURLER_HENTET,
                data: [],
                id: '1',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
