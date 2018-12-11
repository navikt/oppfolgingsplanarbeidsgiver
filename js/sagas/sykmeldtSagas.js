import {
    all,
    call,
    put,
    fork,
    takeEvery,
} from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import * as actions from '../actions/sykmeldt_actions';
import * as actiontyper from '../actions/actiontyper';
import history from '../history';

export function* slettSykmeldt(action) {
    yield put(actions.sletterSykmeldt());
    try {
        yield call(post, `${process.env.REACT_APP_SYFOREST_ROOT}/arbeidsgiver/${action.fnr}/${action.orgnr}/actions/avkreft`);
        yield put(actions.sykmeldtSlettet(action.fnr, action.orgnr));
        yield history.replace('/sykefravaerarbeidsgiver');
    } catch (e) {
        log(e);
        yield put(actions.slettSykmeldtFeilet());
    }
}

function* watchSlettSykmeldt() {
    yield takeEvery(actiontyper.SLETT_SYKMELDT_FORESPURT, slettSykmeldt);
}

export default function* sykmeldteSagas() {
    yield all([
        fork(watchSlettSykmeldt),
    ]);
}
