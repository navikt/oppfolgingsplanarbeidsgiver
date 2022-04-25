import { call, put, takeEvery } from 'redux-saga/effects';
import { get, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '../../gateway-api';
import * as actions from '../../actions/oppfolgingsplan/virksomhet_actions';

export function* hentVirksomhetSaga(action) {
  yield put(actions.henterVirksomhet(action.virksomhetsnummer));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/v2/virksomhet/${action.virksomhetsnummer}`;
    const virksomhet = yield call(get, url);
    yield put(actions.virksomhetHentet(virksomhet, action.virksomhetsnummer));
  } catch (e) {
    yield put(actions.hentVirksomhetFeilet(action.virksomhetsnummer));
  }
}

export default function* virksomhetSagas() {
  yield takeEvery(actions.HENT_VIRKSOMHET_FORESPURT, hentVirksomhetSaga);
}
