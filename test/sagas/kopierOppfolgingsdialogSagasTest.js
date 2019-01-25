import { expect } from 'chai';
import { post } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import { kopierOppfolgingsdialog } from '../../js/sagas/oppfolgingsplan/kopierOppfolgingsdialogSagas';
import {
    KOPIERER_OPPFOLGINGSDIALOG,
    OPPFOLGINGSDIALOG_KOPIERT,
} from '../../js/actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';

describe('kopierOppfolgingsdialogSagas', () => {
    beforeEach(() => {
        process.env = {
            REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    describe('avbrytDialog', () => {
        const generator = kopierOppfolgingsdialog({
            id: 1,
        });

        it('Skal dispatche KOPIERER_OPPFOLGINGSDIALOG', () => {
            const nextPut = put({
                type: KOPIERER_OPPFOLGINGSDIALOG,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/1/kopier`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette OPPFOLGINGSDIALOG_KOPIERT', () => {
            const nextPut = put({
                type: OPPFOLGINGSDIALOG_KOPIERT,
                id: 1,
            });
            expect(generator.next(1).value).to.deep.equal(nextPut);
        });
    });
});
