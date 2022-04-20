import { call, put, takeEvery } from 'redux-saga/effects';
import { get, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '../../gateway-api';
import * as actions from '../../actions/oppfolgingsplan/kontaktinfo_actions';

export function* hentKontaktinfoSaga(action) {
  yield put(actions.henterKontaktinfo(action.fnr));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/v2/kontaktinfo/${action.fnr}`;
    const kontaktinfo = yield call(get, url);
    yield put(actions.kontaktinfoHentet(kontaktinfo, action.fnr));
  } catch (e) {
    yield put(actions.hentKontaktinfoFeilet(action.fnr));
  }
}

export default function* kontaktinfoSagas() {
  yield takeEvery(actions.HENT_KONTAKTINFO_FORESPURT, hentKontaktinfoSaga);
}
