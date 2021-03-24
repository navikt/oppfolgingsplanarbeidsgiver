import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { API_NAVN, hentSyfoapiUrl, post } from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/samtykke_actions';

export function* giSamtykke(action) {
  const fnr = action.fnr;

  yield put(actions.girSamtykke(fnr));
  try {
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${
      action.id
    }/samtykk?samtykke=${action.samtykke}`;
    yield call(post, url);
    yield put(actions.samtykkeGitt(action.id, action.samtykke, fnr, action.erEgenLeder));
  } catch (e) {
    log(e);
    yield put(actions.giSamtykkeFeilet(fnr));
  }
}

function* watchGiSamtykke() {
  yield takeEvery(actions.GI_SAMTYKKE_FORESPURT, giSamtykke);
}

export default function* samtykkeSagas() {
  yield fork(watchGiSamtykke);
}
