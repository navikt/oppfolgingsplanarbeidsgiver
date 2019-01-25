import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { get, post, log } from 'digisyfo-npm';
import logger from '../../logg/logging';
import * as actions from '../../actions/oppfolgingsplan/oppfolgingsdialog_actions';

export function* hentArbeidsgiversOppfolginger() {
    yield put(actions.henterOppfolgingsdialoger());
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/arbeidsgiver/oppfoelgingsdialoger`;
        const data = yield call(get, url);
        yield put(actions.oppfolgingsdialogerHentet(data));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke hente oppfolgingsdialoger for arbeidsgiver. ${e.message}`);
        yield put(actions.hentOppfolgingsdialogerFeilet());
    }
}

export function* opprettOppfolgingsdialog(action) {
    const fnr = action.fnr;

    yield put(actions.oppretterOppfolgingsdialog(fnr));
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/arbeidsgiver/oppfoelgingsdialoger`;
        const data = yield call(post, url, action.oppfolgingsdialog);
        yield put(actions.oppfolgingsdialogOpprettet(data, fnr));
    } catch (e) {
        log(e);
        yield put(actions.opprettOppfolgingsdialogFeilet(fnr));
    }
}

export function* godkjennDialogSaga(action) {
    const fnr = action.fnr;

    yield put(actions.godkjennerDialog(fnr));
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/godkjenn?status=${action.status}&aktoer=arbeidsgiver`;
        const data = yield call(post, url, action.gyldighetstidspunkt);
        yield put(actions.dialogGodkjent(action.id, data, action.status, fnr));
    } catch (e) {
        if (e.message === '409') {
            window.location.reload();
            return;
        }
        log(e);
        yield put(actions.godkjennDialogFeilet(fnr));
    }
}

export function* avvisDialogSaga(action) {
    const fnr = action.fnr;

    yield put(actions.avviserDialog(fnr));
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/avvis`;
        yield call(post, url);
        yield put(actions.dialogAvvist(action.id, fnr));
    } catch (e) {
        log(e);
        yield put(actions.avvisDialogFeilet(fnr));
    }
}

function* watchGodkjennDialog() {
    yield takeEvery(actions.GODKJENN_DIALOG_FORESPURT, godkjennDialogSaga);
}

function* watchAvvisDialog() {
    yield takeEvery(actions.AVVIS_DIALOG_FORESPURT, avvisDialogSaga);
}

function* watchHentOppfolgingsdialoger() {
    yield takeEvery(actions.HENT_OPPFOLGINGSDIALOGER_FORESPURT, hentArbeidsgiversOppfolginger);
}

function* watchOpprettOppfolgingsdialog() {
    yield takeEvery(actions.OPPRETT_OPPFOLGINGSDIALOG_FORESPURT, opprettOppfolgingsdialog);
}

export default function* oppfolgingsdialogerSagas() {
    yield all([
        fork(watchHentOppfolgingsdialoger),
        fork(watchOpprettOppfolgingsdialog),
        fork(watchGodkjennDialog),
        fork(watchAvvisDialog),
    ]);
}
