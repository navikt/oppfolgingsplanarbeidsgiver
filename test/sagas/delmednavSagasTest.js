import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    API_NAVN,
    hentSyfoapiUrl,
    post,
} from '../../js/gateway-api/gatewayApi';
import { delMedNav } from '../../js/sagas/oppfolgingsplan/delMedNavSagas';
import * as actions from '../../js/actions/oppfolgingsplan/delmednav_actions';

describe('delmednavSagas', () => {
    let apiUrlBase;
    const fnr = '12345678';

    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
    });

    describe('delMedNav', () => {
        const action = {
            id: 1,
            fnr,
        };
        const generator = delMedNav(action);

        it(`Skal dispatche ${actions.DELER_MED_NAV}`, () => {
            const nextPut = put({
                type: actions.DELER_MED_NAV,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${apiUrlBase}/oppfolgingsplan/actions/${action.id}/delmednav`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${actions.DELT_MED_NAV}`, () => {
            const nextPut = put({
                type: actions.DELT_MED_NAV,
                id: 1,
                fnr,
            });
            expect(generator.next({
                id: 1,
            }).value).to.deep.equal(nextPut);
        });
    });
});
