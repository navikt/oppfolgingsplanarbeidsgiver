import { call, put, takeEvery } from 'redux-saga/effects';
import { get, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '../../gateway-api';
import * as actions from '../../actions/oppfolgingsplan/naermesteLeder_actions';
import { personHentet } from '@/actions/oppfolgingsplan/person_actions';

export const mapNarmesteLederToPerson = (narmesteLeder) => {
  return {
    fnr: narmesteLeder.fnr,
    navn: narmesteLeder.navn,
  };
};

export function* hentNaermesteLederSaga(action) {
  yield put(actions.henterNaermesteLeder(action.fnr, action.virksomhetsnummer));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/v2/narmesteleder/${action.fnr}?virksomhetsnummer=${action.virksomhetsnummer}`;
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

export default function* naermesteLederSagas() {
  yield takeEvery(actions.HENT_NAERMESTELEDER_FORESPURT, hentNaermesteLederSaga);
}
