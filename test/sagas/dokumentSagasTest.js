import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    API_NAVN,
    hentSyfoapiUrl,
    get,
} from '../../js/gateway-api/gatewayApi';
import { henterPdfurler } from '../../js/sagas/oppfolgingsplan/dokumentSagas';
import * as actions from '../../js/actions/oppfolgingsplan/dokument_actions';

describe('dokumentSagas', () => {
    let apiUrlBase;
    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
    });

    describe('henterPdfurler', () => {
        const generator = henterPdfurler({
            id: '1',
        });

        it(`Skal dispatche ${actions.HENTER_PDFURLER}`, () => {
            const nextPut = put({
                type: actions.HENTER_PDFURLER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${apiUrlBase}/dokument/1/pdfurler`;
            const nextCall = call(get, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest dispatche ${actions.PDFURLER_HENTET}`, () => {
            const nextPut = put({
                type: actions.PDFURLER_HENTET,
                data: [],
                id: '1',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
