import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { API_NAVN, hentSyfoapiUrl, post } from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/arbeidsoppgave_actions';
import { input2RSArbeidsoppgave } from '../../utils/arbeidsoppgaveUtils';

export function* lagreArbeidsoppgave(action) {
  const fnr = action.fnr;
  yield put(actions.lagrerArbeidsoppgave(fnr, action.arbeidsoppgave.arbeidsoppgaveId));
  const body = input2RSArbeidsoppgave(action.arbeidsoppgave);
  try {
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${
      action.id
    }/lagreArbeidsoppgave`;
    const data = yield call(post, url, body);
    yield put(actions.arbeidsoppgaveLagret(action.id, data, action.arbeidsoppgave, fnr));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    log(e);

    yield put(actions.lagreArbeidsoppgaveFeilet(fnr, body));
  }
}

export function* slettArbeidsoppgave(action) {
  const fnr = action.fnr;

  yield put(actions.sletterArbeidsoppgave(fnr));
  try {
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/arbeidsoppgave/actions/${
      action.arbeidsoppgaveId
    }/slett`;
    yield call(post, url);
    yield put(actions.arbeidsoppgaveSlettet(action.id, action.arbeidsoppgaveId, fnr));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    log(e);
    yield put(actions.slettArbeidsoppgaveFeilet(fnr, action.arbeidsoppgaveId));
  }
}

function* watchLagreArbeidsoppgave() {
  yield takeEvery(actions.LAGRE_ARBEIDSOPPGAVE_FORESPURT, lagreArbeidsoppgave);
}

function* watchSlettArbeidsoppgave() {
  yield takeEvery(actions.SLETT_ARBEIDSOPPGAVE_FORESPURT, slettArbeidsoppgave);
}

export default function* arbeidsoppgaveSagas() {
  yield all([fork(watchLagreArbeidsoppgave), fork(watchSlettArbeidsoppgave)]);
}
