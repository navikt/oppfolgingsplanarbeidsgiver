import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/nullstillGodkjenning_actions';
import { post, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';

export function* nullstillGodkjenning(action) {
  const fnr = action.fnr;

  yield put(actions.nullstillerGodkjenning(fnr));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/oppfolgingsplan/actions/${action.id}/nullstillGodkjenning`;
    yield call(post, url);
    yield put(actions.nullstiltGodkjenning(action.id, fnr));
  } catch (e) {
    yield put(actions.nullstillGodkjenningFeilet(fnr));
  }
}

export default function* nullstillGodkjenningSagas() {
  yield takeEvery(actions.NULLSTILL_GODKJENNING_FORESPURT, nullstillGodkjenning);
}
