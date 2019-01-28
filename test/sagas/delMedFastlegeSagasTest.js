import { expect } from 'chai';
import {
    put,
    call,
} from 'redux-saga/effects';
import { post } from 'digisyfo-npm';
import { delMedFastlege } from '../../js/sagas/oppfolgingsplan/delMedFastlegeSagas';
import {
    DELER_MED_FASTLEGE,
    DELT_MED_FASTLEGE,
} from '../../js/actions/oppfolgingsplan/delMedFastlege_actions';

describe('delMedFastlegeSagas', () => {
    const fnr = '12345678';

    beforeEach(() => {
        process.env = {
            REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    describe('delMedNav', () => {
        const action = {
            id: 1,
            fnr,
        };
        const generator = delMedFastlege(action);

        it('Skal dispatche DELER_MED_FASTLEGE', () => {
            const nextPut = put({
                type: DELER_MED_FASTLEGE,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/delmedfastlege`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette DELT_MED_FASTLEGE', () => {
            const nextPut = put({
                type: DELT_MED_FASTLEGE,
                id: 1,
                fnr,
            });
            expect(generator.next({
                id: 1,
            }).value).to.deep.equal(nextPut);
        });
    });
});
