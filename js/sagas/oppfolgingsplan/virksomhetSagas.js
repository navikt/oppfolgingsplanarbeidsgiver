import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/virksomhet_actions';

export function* hentVirksomhetSaga(action) {
    yield put(actions.henterVirksomhet(action.virksomhetsnummer));
    try {
        const virksomhet = yield call(get, `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/virksomhet/${action.virksomhetsnummer}`);
        yield put(actions.virksomhetHentet(virksomhet, action.virksomhetsnummer));
    } catch (e) {
        log(e);
        yield put(actions.hentVirksomhetFeilet(action.virksomhetsnummer));
    }
}

function* watchHentVirksomhet() {
    yield takeEvery(actions.HENT_VIRKSOMHET_FORESPURT, hentVirksomhetSaga);
}

export default function* virksomhetSagas() {
    yield fork(watchHentVirksomhet);
}

