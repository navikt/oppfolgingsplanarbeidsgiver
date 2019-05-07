import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    API_NAVN,
    hentSyfoapiUrl,
    post,
} from '../../js/gateway-api/gatewayApi';
import { nullstillGodkjenning } from '../../js/sagas/oppfolgingsplan/nullstillGodkjenningSagas';
import * as actions from '../../js/actions/oppfolgingsplan/nullstillGodkjenning_actions';

describe('nullstillGodkjenningSagas', () => {
    let apiUrlBase;
    const fnr = '12345678';

    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
    });

    describe('nullstillGodkjenning', () => {
        const generator = nullstillGodkjenning({
            id: 1,
            fnr,
        });

        it('Skal dispatche NULLSTILLER_GODKJENNING', () => {
            const nextPut = put({
                type: actions.NULLSTILLER_GODKJENNING,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${apiUrlBase}/oppfolgingsplan/actions/1/nullstillGodkjenning`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${actions.NULLSTILT_GODKJENNING}`, () => {
            const nextPut = put({
                type: actions.NULLSTILT_GODKJENNING,
                id: 1,
                fnr,
            });
            expect(generator.next({
                id: 1,
            }).value).to.deep.equal(nextPut);
        });
    });
});
