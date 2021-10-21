import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get } from '@navikt/digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/arbeidsforhold_actions';
import { fullNaisUrl } from '../../utils/urlUtils';
import { HOST_NAMES } from '../../konstanter';

export function* hentArbeidsforhold(action) {
  yield put(actions.henterArbeidsforhold(action.fnr, action.virksomhetsnummer));
  try {
    const path = `${process.env.REACT_APP_SYFOOPREST_ROOT}/arbeidsforhold?fnr=${action.fnr}&virksomhetsnummer=${action.virksomhetsnummer}&fom=${action.fom}`;
    const url = fullNaisUrl(HOST_NAMES.SYFOOPREST, path);
    const stillinger = yield call(get, url);
    yield put(actions.hentetArbeidsforhold(stillinger, action.fnr, action.virksomhetsnummer));
  } catch (e) {
    yield put(actions.hentArbeidsforholdFeilet(action.fnr, action.virksomhetsnummer));
  }
}

function* watchHentArbeidsforhold() {
  yield takeEvery(actions.HENT_ARBEIDSFORHOLD_FORESPURT, hentArbeidsforhold);
}

export default function* arbeidsforholdSagas() {
  yield fork(watchHentArbeidsforhold);
}
