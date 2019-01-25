import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { post } from 'digisyfo-npm';
import { delMedNav } from '../../js/sagas/oppfolgingsplan/delMedNavSagas';
import * as actions from '../../js/actions/oppfolgingsplan/delmednav_actions';

describe('delmednavSagas', () => {
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
        const generator = delMedNav(action);

        it('Skal dispatche DELER_MED_NAV', () => {
            const nextPut = put({
                type: actions.DELER_MED_NAV,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/delmednav`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette DELT_MED_NAV', () => {
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
