import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/naermesteLeder_actions';
import { personHentet } from '../../actions/oppfolgingsplan/person_actions';
import { fullNaisUrl } from '../../utils/urlUtils';
import { HOST_NAMES } from '../../konstanter';
import { get } from '../../gateway-api';

export const mapNarmesteLederToPerson = (narmesteLeder) => {
  return {
    fnr: narmesteLeder.fnr,
    navn: narmesteLeder.navn,
  };
};

export function* hentNaermesteLederSaga(action) {
  yield put(actions.henterNaermesteLeder(action.fnr, action.virksomhetsnummer));
  try {
    const path = `${process.env.REACT_APP_SYFOOPREST_ROOT}/naermesteleder/${action.fnr}?virksomhetsnummer=${action.virksomhetsnummer}`;
    const url = fullNaisUrl(HOST_NAMES.SYFOOPREST, path);
    const narmesteLeder = yield call(get, url);
    yield put(personHentet(mapNarmesteLederToPerson(narmesteLeder), narmesteLeder.fnr));
    yield put(actions.naermesteLederHentet(narmesteLeder, action.fnr, action.virksomhetsnummer));
  } catch (e) {
    if (e.message === '404') {
      yield put(actions.ingenNaermesteLeder(action.fnr, action.virksomhetsnummer));
      return;
    }
    yield put(actions.hentNaermesteLederFeilet(action.fnr, action.virksomhetsnummer));
  }
}

function* watchHentNaermesteLeder() {
  yield takeEvery(actions.HENT_NAERMESTELEDER_FORESPURT, hentNaermesteLederSaga);
}

export default function* naermesteLederSagas() {
  yield fork(watchHentNaermesteLeder);
}
