import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { API_NAVN, hentSyfoapiUrl, post } from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/kommentar_actions';

export function* lagreKommentar(action) {
  const fnr = action.fnr;
  yield put(actions.lagrerKommentar(fnr, action.tiltakId));
  const body = action.kommentar;
  try {
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/tiltak/actions/${
      action.tiltakId
    }/lagreKommentar`;
    const data = yield call(post, url, body);
    yield put(actions.kommentarLagret(action.id, action.tiltakId, data, action.kommentar, fnr));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    yield put(actions.lagreKommentarFeilet(fnr, action.tiltakId));
  }
}

export function* slettKommentar(action) {
  const fnr = action.fnr;

  yield put(actions.sletterKommentar(fnr));
  try {
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/kommentar/actions/${action.kommentarId}/slett`;
    yield call(post, url);
    yield put(actions.kommentarSlettet(action.id, action.tiltakId, action.kommentarId, fnr));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    yield put(actions.slettKommentarFeilet(fnr, action.tiltakId, action.kommentarId));
  }
}

function* watchLagreKommentar() {
  yield takeEvery(actions.LAGRE_KOMMENTAR_FORESPURT, lagreKommentar);
}

function* watchSlettKommentar() {
  yield takeEvery(actions.SLETT_KOMMENTAR_FORESPURT, slettKommentar);
}

export default function* kommentarSagas() {
  yield all([fork(watchLagreKommentar), fork(watchSlettKommentar)]);
}
