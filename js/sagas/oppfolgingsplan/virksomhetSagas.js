import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { get } from '../../gateway-api';
import * as actions from '../../actions/oppfolgingsplan/virksomhet_actions';

export function* hentVirksomhetSaga(action) {
  yield put(actions.henterVirksomhet(action.virksomhetsnummer));
  try {
    const url = `${process.env.REACT_APP_SYFOOPREST_PROXY_PATH}/virksomhet/${action.virksomhetsnummer}`;
    const virksomhet = yield call(get, url);
    yield put(actions.virksomhetHentet(virksomhet, action.virksomhetsnummer));
  } catch (e) {
    yield put(actions.hentVirksomhetFeilet(action.virksomhetsnummer));
  }
}

function* watchHentVirksomhet() {
  yield takeEvery(actions.HENT_VIRKSOMHET_FORESPURT, hentVirksomhetSaga);
}

export default function* virksomhetSagas() {
  yield fork(watchHentVirksomhet);
}
