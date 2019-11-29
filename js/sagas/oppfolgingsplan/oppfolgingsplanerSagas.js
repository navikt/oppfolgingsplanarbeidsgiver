import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import {
    API_NAVN,
    hentSyfoapiUrl,
    get,
    post,
} from '../../gateway-api/gatewayApi';
import logger from '../../logg/logging';
import * as actions from '../../actions/oppfolgingsplan/oppfolgingsplan_actions';

export function* hentArbeidsgiversOppfolginger() {
    yield put(actions.henterOppfolgingsplaner());
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/arbeidsgiver/oppfolgingsplaner`;
        const data = yield call(get, url);
        yield put(actions.oppfolgingsplanerHentet(data));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke hente oppfolgingsplaner for arbeidsgiver. ${e.message}`);
        yield put(actions.hentOppfolgingsplanerFeilet());
    }
}

export function* opprettOppfolgingsplan(action) {
    const fnr = action.fnr;

    yield put(actions.oppretterOppfolgingsplan(fnr));
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/arbeidsgiver/oppfolgingsplaner`;
        const data = yield call(post, url, action.oppfolgingsplan);
        yield put(actions.oppfolgingsplanOpprettet(data, fnr));
    } catch (e) {
        if (e.message === '409') {
            window.location.reload();
            return;
        }
        log(e);
        yield put(actions.opprettOppfolgingsplanFeilet(fnr));
    }
}

export function* godkjennPlanSaga(action) {
    const fnr = action.fnr;

    yield put(actions.godkjennerPlan(fnr));
    try {
        const delMedNav = action.delMedNav ? `&delmednav=${action.delMedNav}` : '';
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/godkjenn?status=${action.status}&aktoer=arbeidsgiver${delMedNav}`;
        const data = yield call(post, url, action.gyldighetstidspunkt);
        yield put(actions.planGodkjent(action.id, data, action.status, fnr, action.delMedNav));
    } catch (e) {
        if (e.message === '409') {
            window.location.reload();
            return;
        }
        log(e);
        yield put(actions.godkjennPlanFeilet(fnr));
    }
}

export function* avvisPlanSaga(action) {
    const fnr = action.fnr;

    yield put(actions.avviserPlan(fnr));
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/avvis`;
        yield call(post, url);
        yield put(actions.planAvvist(action.id, fnr));
    } catch (e) {
        log(e);
        yield put(actions.avvisPlanFeilet(fnr));
    }
}

function* watchGodkjennPlan() {
    yield takeEvery(actions.GODKJENN_PLAN_FORESPURT, godkjennPlanSaga);
}

function* watchAvvisPlan() {
    yield takeEvery(actions.AVVIS_PLAN_FORESPURT, avvisPlanSaga);
}

function* watchHentOppfolgingsplaner() {
    yield takeEvery(actions.HENT_OPPFOLGINGSPLANER_FORESPURT, hentArbeidsgiversOppfolginger);
}

function* watchOpprettOppfolgingsplan() {
    yield takeEvery(actions.OPPRETT_OPPFOLGINGSPLAN_FORESPURT, opprettOppfolgingsplan);
}

export default function* oppfolgingsplanerSagas() {
    yield all([
        fork(watchHentOppfolgingsplaner),
        fork(watchOpprettOppfolgingsplan),
        fork(watchGodkjennPlan),
        fork(watchAvvisPlan),
    ]);
}
