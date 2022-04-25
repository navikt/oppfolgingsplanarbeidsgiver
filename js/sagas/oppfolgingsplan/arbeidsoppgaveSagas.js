import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/arbeidsoppgave_actions';
import { input2RSArbeidsoppgave } from '@/utils/arbeidsoppgaveUtils';
import { post, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';

export function* lagreArbeidsoppgave(action) {
  const fnr = action.fnr;
  yield put(actions.lagrerArbeidsoppgave(fnr, action.arbeidsoppgave.arbeidsoppgaveId));
  const body = input2RSArbeidsoppgave(action.arbeidsoppgave);
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/oppfolgingsplan/actions/${action.id}/lagreArbeidsoppgave`;
    const data = yield call(post, url, body);
    yield put(actions.arbeidsoppgaveLagret(action.id, data, action.arbeidsoppgave, fnr));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    yield put(actions.lagreArbeidsoppgaveFeilet(fnr, body));
  }
}

export function* slettArbeidsoppgave(action) {
  const fnr = action.fnr;

  yield put(actions.sletterArbeidsoppgave(fnr));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/arbeidsoppgave/actions/${action.arbeidsoppgaveId}/slett`;
    yield call(post, url);
    yield put(actions.arbeidsoppgaveSlettet(action.id, action.arbeidsoppgaveId, fnr));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    yield put(actions.slettArbeidsoppgaveFeilet(fnr, action.arbeidsoppgaveId));
  }
}

export default function* arbeidsoppgaveSagas() {
  yield takeEvery(actions.LAGRE_ARBEIDSOPPGAVE_FORESPURT, lagreArbeidsoppgave);
  yield takeEvery(actions.SLETT_ARBEIDSOPPGAVE_FORESPURT, slettArbeidsoppgave);
}
