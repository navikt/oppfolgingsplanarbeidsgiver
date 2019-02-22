import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get, post } from 'digisyfo-npm';
import {
    avvisPlanSaga,
    hentArbeidsgiversOppfolginger,
    opprettOppfolgingsplan,
    godkjennPlanSaga,
} from '../../js/sagas/oppfolgingsplan/oppfolgingsplanerSagas';
import * as actions from '../../js/actions/oppfolgingsplan/oppfolgingsplan_actions';

describe('oppfolgingsplanerSagas', () => {
    const fnr = '12345678';

    beforeEach(() => {
        process.env = {
            REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    describe('hentArbeidsgiversOppfolginger', () => {
        const generator = hentArbeidsgiversOppfolginger();

        it('Skal dispatche HENTER_OPPFOLGINGSPLANER', () => {
            const nextPut = put({
                type: actions.HENTER_OPPFOLGINGSPLANER,
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
                type: actions.OPPFOLGINGSPLANER_HENTET,
                data: [],
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('opprettOppfolgingsplan', () => {
        const generator = opprettOppfolgingsplan({
            oppfolgingsdialog: {
                fnr,
                virksomhet: {
                    virksomhetsnummer: '123',
                },
            },
            fnr,
        });

        it('Skal dispatche OPPRETTER_OPPFOLGINGSPLAN', () => {
            const nextPut = put({
                type: actions.OPPRETTER_OPPFOLGINGSPLAN,
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

        it('Skal dernest sette oppfolgingsplaner til opprettet', () => {
            const data = 1;
            const nextPut = put({
                type: actions.OPPFOLGINGSPLAN_OPPRETTET,
                data,
                fnr,
            });
            expect(generator.next(data).value).to.deep.equal(nextPut);
        });
    });

    describe('godkjennOppfolgingsplan', () => {
        const action = {
            id: '12345678',
            gyldighetstidspunkt: {},
            status: 'TRUE',
            fnr,
        };

        const generator = godkjennPlanSaga(action);

        it('Skal dispatche GODKJENNER_PLAN', () => {
            const nextPut = put({
                type: actions.GODKJENNER_PLAN,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/godkjenn?status=${action.status}&aktoer=arbeidsgiver`;
            const nextCall = call(post, url, action.gyldighetstidspunkt);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette oppfolgingsplaner til godkjent', () => {
            const nextPut = put({
                type: actions.PLAN_GODKJENT,
                id: action.id,
                status: action.status,
                gyldighetstidspunkt: {},
                fnr,
            });
            expect(generator.next({}).value).to.deep.equal(nextPut);
        });
    });

    describe('avvisPlanSaga', () => {
        const action = {
            id: '12345678',
            fnr,
        };

        const generator = avvisPlanSaga(action);

        it('Skal dispatche AVVISER_PLAN', () => {
            const nextPut = put({
                type: actions.AVVISER_PLAN,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/avvis`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette oppfolgingsplaner til godkjent', () => {
            const nextPut = put({
                type: actions.PLAN_AVVIST,
                id: action.id,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
