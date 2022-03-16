import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/samtykke_actions';
import { post, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';

export function* giSamtykke(action) {
  const fnr = action.fnr;

  yield put(actions.girSamtykke(fnr));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/oppfolgingsplan/actions/${action.id}/samtykk?samtykke=${action.samtykke}`;
    yield call(post, url);
    yield put(actions.samtykkeGitt(action.id, action.samtykke, fnr, action.erEgenLeder));
  } catch (e) {
    yield put(actions.giSamtykkeFeilet(fnr));
  }
}

export default function* samtykkeSagas() {
  yield takeEvery(actions.GI_SAMTYKKE_FORESPURT, giSamtykke);
}
