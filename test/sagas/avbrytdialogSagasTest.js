import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { post } from 'digisyfo-npm';
import { avbrytDialog } from '../../js/sagas/oppfolgingsplan/avbrytdialogSagas';
import * as actions from '../../js/actions/oppfolgingsplan/avbrytdialog_actions';

describe('avbrytdialogSagas', () => {
    const fnr = '12345678';

    beforeEach(() => {
        process.env = {
            REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    describe('avbrytDialog', () => {
        const generator = avbrytDialog({
            id: 1,
            fnr,
        });

        it('Skal dispatche AVBRYTER_DIALOG', () => {
            const nextPut = put({
                type: actions.AVBRYTER_DIALOG,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/1/avbryt`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette DIALOG_AVBRUTT', () => {
            const nextPut = put({
                type: actions.DIALOG_AVBRUTT,
                id: 1,
                fnr,
            });
            expect(generator.next({
                id: 1,
            }).value).to.deep.equal(nextPut);
        });
    });
});
