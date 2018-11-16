import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/sykmeldinger_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentSykmeldinger(action) {
    const koblingId = action.koblingId;

    yield put(actions.henterSykmeldinger(koblingId));
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/arbeidsgiver/sykmeldinger?koblingId=${koblingId}`);
        yield put(actions.sykmeldingerHentet(data, koblingId));
    } catch (e) {
        log(e);
        yield put(actions.hentSykmeldingerFeilet(koblingId));
    }
}

function* watchHentSykmeldinger() {
    yield takeEvery(actiontyper.HENT_SYKMELDINGER_FORESPURT, hentSykmeldinger);
}


export default function* sykmeldingerSagas() {
    yield fork(watchHentSykmeldinger);
}

