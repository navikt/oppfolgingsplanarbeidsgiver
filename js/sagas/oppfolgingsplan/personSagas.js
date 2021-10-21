import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/person_actions';
import { fullNaisUrl } from '../../utils/urlUtils';
import { HOST_NAMES } from '../../konstanter';
import { get } from '../../gateway-api';

export function* hentPersonSaga(action) {
  yield put(actions.henterPerson(action.fnr));
  try {
    const path = `${process.env.REACT_APP_SYFOOPREST_ROOT}/person/${action.fnr}`;
    const url = fullNaisUrl(HOST_NAMES.SYFOOPREST, path);
    const person = yield call(get, url);
    yield put(actions.personHentet(person, action.fnr));
  } catch (e) {
    yield put(actions.hentPersonFeilet(action.fnr));
  }
}

function* watchHentPerson() {
  yield takeEvery(actions.HENT_PERSON_FORESPURT, hentPersonSaga);
}

export default function* personSagas() {
  yield fork(watchHentPerson);
}
