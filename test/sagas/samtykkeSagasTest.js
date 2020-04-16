import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    API_NAVN,
    hentSyfoapiUrl,
    post,
} from '../../js/gateway-api/gatewayApi';
import { giSamtykke } from '../../js/sagas/oppfolgingsplan/samtykkeSagas';
import * as actions from '../../js/actions/oppfolgingsplan/samtykke_actions';

describe('samtykkeSagas', () => {
    const fnr = '12345678';

    let apiUrlBase;
    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
    });

    describe('giSamtykke', () => {
        const generator = giSamtykke({
            id: 1,
            samtykke: true,
            fnr,
            erEgenLeder: false,
        });

        it(`Skal dispatche ${actions.GIR_SAMTYKKE}`, () => {
            const nextPut = put({
                type: actions.GIR_SAMTYKKE,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${apiUrlBase}/oppfolgingsplan/actions/1/samtykk?samtykke=true`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${actions.SAMTYKKE_GITT}`, () => {
            const nextPut = put({
                type: actions.SAMTYKKE_GITT,
                id: 1,
                samtykke: true,
                fnr,
                erEgenLeder: false,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
