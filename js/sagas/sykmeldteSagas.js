import {
    all,
    call,
    put,
    fork,
    takeEvery,
} from 'redux-saga/effects';
import {
    get,
    post,
    log,
} from '@navikt/digisyfo-npm';
import * as actions from '../actions/sykmeldte_actions';
import * as sykmeldtActions from '../actions/sykmeldt_actions';
import * as actiontyper from '../actions/actiontyper';
import history from '../history';


export function* hentArbeidsgiversSykmeldte() {
    yield put(actions.henterSykmeldte());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/arbeidsgiver/sykmeldte`);
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
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/arbeidsgiver/sykmeldte/berik?koblingsIder=${args}`);
        yield put(actions.sykmeldteBerikelserHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykmeldteBerikelserFeilet());
    }
}

export function* slettSykmeldt(action) {
    yield put(sykmeldtActions.sletterSykmeldt());
    try {
        yield call(post, `${process.env.REACT_APP_SYFOREST_ROOT}/arbeidsgiver/${action.fnr}/${action.orgnr}/actions/avkreft`);
        yield put(sykmeldtActions.sykmeldtSlettet(action.fnr, action.orgnr));
        history.replace('/sykefravaerarbeidsgiver');
        window.location.reload();
    } catch (e) {
        log(e);
        yield put(sykmeldtActions.slettSykmeldtFeilet());
    }
}

function* watchHentArbeidsgiversSykmeldte() {
    yield takeEvery(actiontyper.HENT_SYKMELDTE_FORESPURT, hentArbeidsgiversSykmeldte);
}

function* watchHentBerikelser() {
    yield takeEvery(actiontyper.HENT_SYKMELDTE_BERIKELSER_FORESPURT, berikSykmeldte);
}

function* watchSlettSykmeldt() {
    yield takeEvery(sykmeldtActions.SLETT_SYKMELDT_FORESPURT, slettSykmeldt);
}

export default function* sykmeldteSagas() {
    yield all([
        fork(watchHentArbeidsgiversSykmeldte),
        fork(watchHentBerikelser),
        fork(watchSlettSykmeldt),
    ]);
}
