import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/delMedFastlege_actions';
import { post, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';

export function* delMedFastlege(action) {
  const fnr = action.fnr;

  yield put(actions.delerMedFastlege(fnr));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/oppfolgingsplan/actions/${action.id}/delmedfastlege`;
    yield call(post, url);
    yield put(actions.deltMedFastlege(action.id, fnr));
  } catch (e) {
    yield put(actions.delMedFastlegeFeilet(fnr));
  }
}

export default function* delMedFastlegeSagas() {
  yield takeEvery(actions.DEL_MED_FASTLEGE_FORESPURT, delMedFastlege);
}
