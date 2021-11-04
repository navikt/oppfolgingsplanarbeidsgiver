import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/virksomhet_actions';
import { fullNaisUrl } from '../../utils/urlUtils';
import { HOST_NAMES } from '../../konstanter';
import { get } from '../../gateway-api';

export function* hentVirksomhetSaga(action) {
  yield put(actions.henterVirksomhet(action.virksomhetsnummer));
  try {
    const path = `${process.env.REACT_APP_SYFOOPREST_ROOT}/virksomhet/${action.virksomhetsnummer}`;
    const url = fullNaisUrl(HOST_NAMES.SYFOOPREST, path);
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
