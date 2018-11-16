import { call, put, fork, all, takeEvery } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/sykmeldte_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentArbeidsgiversSykmeldte() {
    yield put(actions.henterSykmeldte());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/arbeidsgiver/sykmeldte`);
        yield put(actions.sykmeldteHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykmeldteFeilet());
    }
}

export function* berikSykmeldte(action) {
    yield put(actions.henterSykmeldteBerikelser(action.koblingIder));
    try {
        const args = action.koblingIder.join(',');
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/arbeidsgiver/sykmeldte/berik?koblingsIder=${args}`);
        yield put(actions.sykmeldteBerikelserHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykmeldteBerikelserFeilet());
    }
}

function* watchHentArbeidsgiversSykmeldte() {
    yield takeEvery(actiontyper.HENT_SYKMELDTE_FORESPURT, hentArbeidsgiversSykmeldte);
}

function* watchHentBerikelser() {
    yield takeEvery(actiontyper.HENT_SYKMELDTE_BERIKELSER_FORESPURT, berikSykmeldte);
}

export default function* sykmeldteSagas() {
    yield all([
        fork(watchHentArbeidsgiversSykmeldte),
        fork(watchHentBerikelser),
    ]);
}

