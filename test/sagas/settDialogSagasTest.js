import { expect } from 'chai';
import { post } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import { settDialoger } from '../../js/sagas/oppfolgingsplan/settDialogSagas';
import * as actions from '../../js/actions/oppfolgingsplan/sett_actions';

describe('settDialogSagas', () => {
    beforeEach(() => {
        process.env = {
            REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    describe('settDialoger', () => {
        const generator = settDialoger({
            id: 1,
        });

        it('Skal dispatche SETTER_SETT_DIALOG', () => {
            const nextPut = put({
                type: actions.SETTER_SETT_DIALOG,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/1/sett`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette DIALOG_SETT', () => {
            const nextPut = put({
                type: actions.DIALOG_SETT,
                id: 1,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
