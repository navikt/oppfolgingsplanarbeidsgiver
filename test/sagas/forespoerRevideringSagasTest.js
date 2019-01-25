import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { post } from 'digisyfo-npm';
import { forespoerRevidering } from '../../js/sagas/oppfolgingsplan/forespoerRevideringSagas';
import {
    FORESPOER_REVIDERING_SENDER,
    FORESPOER_REVIDERING_SUKSESS,
} from '../../js/actions/oppfolgingsplan/forespoerRevidering_actions';

describe('forespoerRevideringSagas', () => {
    const id = '1';

    beforeEach(() => {
        process.env = {
            REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    describe('forespoerRevidering', () => {
        const action = {
            id,
        };
        const generator = forespoerRevidering(action);

        it('Skal dispatche DELER_MED_NAV', () => {
            const nextPut = put({
                type: FORESPOER_REVIDERING_SENDER,
                id,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/forespoerRevidering`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette FORESPOER_REVIDERING_SUKSESS', () => {
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
