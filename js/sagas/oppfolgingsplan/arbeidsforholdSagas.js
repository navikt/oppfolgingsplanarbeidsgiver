import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/arbeidsforhold_actions';

export function* hentArbeidsforhold(action) {
  yield put(actions.henterArbeidsforhold(action.fnr, action.virksomhetsnummer));
  try {
    const url = `${process.env.REACT_APP_SYFOOPREST_PROXY_PATH}/api/arbeidsforhold?fnr=${action.fnr}&virksomhetsnummer=${action.virksomhetsnummer}&fom=${action.fom}`;
    const stillinger = yield call(get, url);
    yield put(actions.hentetArbeidsforhold(stillinger, action.fnr, action.virksomhetsnummer));
  } catch (e) {
    log(e);
    yield put(actions.hentArbeidsforholdFeilet(action.fnr, action.virksomhetsnummer));
  }
}

function* watchHentArbeidsforhold() {
  yield takeEvery(actions.HENT_ARBEIDSFORHOLD_FORESPURT, hentArbeidsforhold);
}

export default function* arbeidsforholdSagas() {
  yield fork(watchHentArbeidsforhold);
}
