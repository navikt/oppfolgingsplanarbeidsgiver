import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/delmednav_actions';
import { post, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';

export function* delMedNav(action) {
  const fnr = action.fnr;

  yield put(actions.delerMedNav(fnr));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/oppfolgingsplan/actions/${action.id}/delmednav`;
    yield call(post, url);
    yield put(actions.deltMedNav(action.id, fnr));
  } catch (e) {
    yield put(actions.delMedNavFeilet(fnr));
  }
}

export default function* delMedNavSagas() {
  yield takeEvery(actions.DEL_MED_NAV_FORESPURT, delMedNav);
}
