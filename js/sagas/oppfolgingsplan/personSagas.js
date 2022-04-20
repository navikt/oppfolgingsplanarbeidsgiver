import { call, put, takeEvery } from 'redux-saga/effects';
import { get, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';
import * as actions from '../../actions/oppfolgingsplan/person_actions';

export function* hentPersonSaga(action) {
  yield put(actions.henterPerson(action.fnr));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/v2/person/${action.fnr}`;
    const person = yield call(get, url);
    yield put(actions.personHentet(person, action.fnr));
  } catch (e) {
    yield put(actions.hentPersonFeilet(action.fnr));
  }
}

export default function* personSagas() {
  yield takeEvery(actions.HENT_PERSON_FORESPURT, hentPersonSaga);
}
