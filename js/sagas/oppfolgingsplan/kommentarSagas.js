import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/kommentar_actions';
import { post, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';

export function* lagreKommentar(action) {
  const fnr = action.fnr;
  yield put(actions.lagrerKommentar(fnr, action.tiltakId));
  const body = action.kommentar;
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/tiltak/actions/${action.tiltakId}/lagreKommentar`;
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
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/kommentar/actions/${action.kommentarId}/slett`;
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

export default function* kommentarSagas() {
  yield takeEvery(actions.LAGRE_KOMMENTAR_FORESPURT, lagreKommentar);
  yield takeEvery(actions.SLETT_KOMMENTAR_FORESPURT, slettKommentar);
}
