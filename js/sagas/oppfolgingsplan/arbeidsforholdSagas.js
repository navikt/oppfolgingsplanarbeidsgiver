import { call, put, takeEvery } from 'redux-saga/effects';
import { get, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '../../gateway-api';
import * as actions from '../../actions/oppfolgingsplan/arbeidsforhold_actions';

export function* hentArbeidsforhold(action) {
  yield put(actions.henterArbeidsforhold(action.fnr, action.virksomhetsnummer));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/v2/arbeidsforhold?fnr=${action.fnr}&virksomhetsnummer=${action.virksomhetsnummer}&fom=${action.fom}`;
    const stillinger = yield call(get, url);
    yield put(actions.hentetArbeidsforhold(stillinger, action.fnr, action.virksomhetsnummer));
  } catch (e) {
    yield put(actions.hentArbeidsforholdFeilet(action.fnr, action.virksomhetsnummer));
  }
}

export default function* arbeidsforholdSagas() {
  yield takeEvery(actions.HENT_ARBEIDSFORHOLD_FORESPURT, hentArbeidsforhold);
}
