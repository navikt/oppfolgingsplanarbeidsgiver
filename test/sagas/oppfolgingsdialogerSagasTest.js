import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get, post } from 'digisyfo-npm';
import {
    avvisDialogSaga,
    hentArbeidsgiversOppfolginger,
    opprettOppfolgingsdialog,
    godkjennDialogSaga,
} from '../../js/sagas/oppfolgingsplan/oppfolgingsdialogerSagas';
import * as actions from '../../js/actions/oppfolgingsplan/oppfolgingsdialog_actions';

describe('oppfolgingsdialogerSagas', () => {
    const fnr = '12345678';

    beforeEach(() => {
        process.env = {
            REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    describe('hentArbeidsgiversOppfolginger', () => {
        const generator = hentArbeidsgiversOppfolginger();

        it('Skal dispatche HENTER_OPPFOLGINGSDIALOGER', () => {
            const nextPut = put({
                type: actions.HENTER_OPPFOLGINGSDIALOGER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/arbeidsgiver/oppfoelgingsdialoger`;
            const nextCall = call(get, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette oppfolgingsdialoger henter', () => {
            const nextPut = put({
                type: actions.OPPFOLGINGSDIALOGER_HENTET,
                data: [],
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('opprettOppfolgingsdialog', () => {
        const generator = opprettOppfolgingsdialog({
            oppfolgingsdialog: {
                fnr,
                virksomhet: {
                    virksomhetsnummer: '123',
                },
            },
            fnr,
        });

        it('Skal dispatche OPPRETTER_OPPFOLGINGSDIALOG', () => {
            const nextPut = put({
                type: actions.OPPRETTER_OPPFOLGINGSDIALOG,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/arbeidsgiver/oppfoelgingsdialoger`;
            const nextCall = call(post, url, {
                fnr,
                virksomhet: {
                    virksomhetsnummer: '123',
                },
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette oppfolgingsdialoger til opprettet', () => {
            const data = 1;
            const nextPut = put({
                type: actions.OPPFOLGINGSDIALOG_OPPRETTET,
                data,
                fnr,
            });
            expect(generator.next(data).value).to.deep.equal(nextPut);
        });
    });

    describe('godkjennOppfolgingsdialog', () => {
        const action = {
            id: '12345678',
            gyldighetstidspunkt: {},
            status: 'TRUE',
            fnr,
        };

        const generator = godkjennDialogSaga(action);

        it('Skal dispatche GODKJENNER_DIALOG', () => {
            const nextPut = put({
                type: actions.GODKJENNER_DIALOG,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/godkjenn?status=${action.status}&aktoer=arbeidsgiver`;
            const nextCall = call(post, url, action.gyldighetstidspunkt);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette oppfolgingsdialoger til godkjent', () => {
            const nextPut = put({
                type: actions.DIALOG_GODKJENT,
                id: action.id,
                status: action.status,
                gyldighetstidspunkt: {},
                fnr,
            });
            expect(generator.next({}).value).to.deep.equal(nextPut);
        });
    });

    describe('avvisDialogSaga', () => {
        const action = {
            id: '12345678',
            fnr,
        };

        const generator = avvisDialogSaga(action);

        it('Skal dispatche AVVISER_DIALOG', () => {
            const nextPut = put({
                type: actions.AVVISER_DIALOG,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/avvis`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette oppfolgingsdialoger til godkjent', () => {
            const nextPut = put({
                type: actions.DIALOG_AVVIST,
                id: action.id,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
