import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    API_NAVN,
    hentSyfoapiUrl,
    post,
} from '../../js/gateway-api/gatewayApi';
import { forespoerRevidering } from '../../js/sagas/oppfolgingsplan/forespoerRevideringSagas';
import {
    FORESPOER_REVIDERING_SENDER,
    FORESPOER_REVIDERING_SUKSESS,
} from '../../js/actions/oppfolgingsplan/forespoerRevidering_actions';

describe('forespoerRevideringSagas', () => {
    let apiUrlBase;
    const id = '1';

    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
    });

    describe('forespoerRevidering', () => {
        const action = {
            id,
        };
        const generator = forespoerRevidering(action);

        it(`Skal dispatche ${FORESPOER_REVIDERING_SENDER}`, () => {
            const nextPut = put({
                type: FORESPOER_REVIDERING_SENDER,
                id,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${apiUrlBase}/oppfolgingsplan/actions/${action.id}/foresporRevidering`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${FORESPOER_REVIDERING_SUKSESS}`, () => {
            const nextPut = put({
                type: FORESPOER_REVIDERING_SUKSESS,
                id,
            });
            expect(generator.next({
                id,
            }).value).to.deep.equal(nextPut);
        });
    });
});
