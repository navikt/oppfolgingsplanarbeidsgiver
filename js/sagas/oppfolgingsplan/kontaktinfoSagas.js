import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { get } from '../../gateway-api';
import * as actions from '../../actions/oppfolgingsplan/kontaktinfo_actions';

export function* hentKontaktinfoSaga(action) {
  yield put(actions.henterKontaktinfo(action.fnr));
  try {
    const url = `${process.env.REACT_APP_SYFOOPREST_PROXY_PATH}/kontaktinfo/${action.fnr}`;
    const kontaktinfo = yield call(get, url);
    yield put(actions.kontaktinfoHentet(kontaktinfo, action.fnr));
  } catch (e) {
    yield put(actions.hentKontaktinfoFeilet(action.fnr));
  }
}

function* watchHentKontaktinfo() {
  yield takeEvery(actions.HENT_KONTAKTINFO_FORESPURT, hentKontaktinfoSaga);
}

export default function* kontaktinfoSagas() {
  yield fork(watchHentKontaktinfo);
}
