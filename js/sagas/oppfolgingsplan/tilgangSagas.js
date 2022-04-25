import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/sjekkTilgang_actions';
import { skalHenteOPTilgang } from '@/selectors/tilgangSelectors';
import { get, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';

export function* sjekkerTilgang(action) {
  const fnr = action.sykmeldt.fnr;

  yield put(actions.sjekkerTilgang(fnr));
  const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/tilgang?fnr=${fnr}`;
  try {
    const data = yield call(get, url);
    yield put(actions.sjekketTilgang(data, fnr));
  } catch (e) {
    if (e.message === '403') {
      yield put(actions.sjekkTilgang403(fnr));
      return;
    }
    yield put(actions.sjekkTilgangFeilet(fnr));
  }
}

export function* sjekkTilgangHvisIkkeSjekket(action) {
  const skalHente = yield select(skalHenteOPTilgang, action);
  if (skalHente) {
    yield sjekkerTilgang(action);
  }
}

export default function* tilgangSagas() {
  yield takeEvery(actions.SJEKK_TILGANG_FORESPURT, sjekkTilgangHvisIkkeSjekket);
}
