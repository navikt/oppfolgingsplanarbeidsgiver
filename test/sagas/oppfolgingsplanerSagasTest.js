import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    get,
    post,
    hentSyfoapiUrl,
    API_NAVN,
} from '../../js/gateway-api/gatewayApi';
import {
    avvisPlanSaga,
    hentArbeidsgiversOppfolginger,
    opprettOppfolgingsplan,
    godkjennPlanSaga,
} from '../../js/sagas/oppfolgingsplan/oppfolgingsplanerSagas';
import * as actions from '../../js/actions/oppfolgingsplan/oppfolgingsplan_actions';

describe('oppfolgingsplanerSagas', () => {
    const fnr = '12345678';

    let apiUrlBase;

    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
    });

    describe('hentArbeidsgiversOppfolginger', () => {
        const generator = hentArbeidsgiversOppfolginger();

        it(`Skal dispatche ${actions.HENTER_OPPFOLGINGSPLANER}`, () => {
            const nextPut = put({
                type: actions.HENTER_OPPFOLGINGSPLANER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${apiUrlBase}/arbeidsgiver/oppfolgingsplaner`;
            const nextCall = call(get, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${actions.OPPFOLGINGSPLANER_HENTET}`, () => {
            const nextPut = put({
                type: actions.OPPFOLGINGSPLANER_HENTET,
                data: [],
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('opprettOppfolgingsplan', () => {
        const generator = opprettOppfolgingsplan({
            oppfolgingsplan: {
                fnr,
                virksomhet: {
                    virksomhetsnummer: '123',
                },
            },
            fnr,
        });

        it(`Skal dispatche ${actions.OPPRETTER_OPPFOLGINGSPLAN}`, () => {
            const nextPut = put({
                type: actions.OPPRETTER_OPPFOLGINGSPLAN,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${apiUrlBase}/arbeidsgiver/oppfolgingsplaner`;
            const nextCall = call(post, url, {
                fnr,
                virksomhet: {
                    virksomhetsnummer: '123',
                },
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dispatche ${actions.OPPFOLGINGSPLAN_OPPRETTET}`, () => {
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

        it(`Skal dispatche ${actions.GODKJENNER_PLAN}`, () => {
            const nextPut = put({
                type: actions.GODKJENNER_PLAN,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${apiUrlBase}/oppfolgingsplan/actions/${action.id}/godkjenn?status=${action.status}&aktoer=arbeidsgiver`;
            const nextCall = call(post, url, action.gyldighetstidspunkt);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest dispatche ${actions.PLAN_GODKJENT}`, () => {
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

        it(`Skal dispatche ${actions.AVVISER_PLAN}`, () => {
            const nextPut = put({
                type: actions.AVVISER_PLAN,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${apiUrlBase}/oppfolgingsplan/actions/${action.id}/avvis`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest dispatche ${actions.PLAN_AVVIST}`, () => {
            const nextPut = put({
                type: actions.PLAN_AVVIST,
                id: action.id,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
