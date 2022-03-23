import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/tiltak_actions';
import { input2RSTiltak } from '@/utils/tiltakUtils';
import { post, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';

export function* lagreTiltak(action) {
  const fnr = action.fnr;
  yield put(actions.lagrerTiltak(fnr, action.tiltak.tiltakId));
  const body = input2RSTiltak(action.tiltak);
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/oppfolgingsplan/actions/${action.id}/lagreTiltak`;
    const data = yield call(post, url, body);
    yield put(actions.tiltakLagret(action.id, data, action.tiltak, fnr));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    yield put(actions.lagreTiltakFeilet(fnr, action.tiltak));
  }
}

export function* slettTiltak(action) {
  const fnr = action.fnr;

  yield put(actions.sletterTiltak(fnr));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/tiltak/actions/${action.tiltakId}/slett`;
    yield call(post, url);
    yield put(actions.tiltakSlettet(action.id, action.tiltakId, fnr));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    yield put(actions.slettTiltakFeilet(fnr, action.tiltakId));
  }
}

export default function* tiltakSagas() {
  yield takeEvery(actions.LAGRE_TILTAK_FORESPURT, lagreTiltak);
  yield takeEvery(actions.SLETT_TILTAK_FORESPURT, slettTiltak);
}
