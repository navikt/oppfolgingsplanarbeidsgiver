import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/sykmeldt_actions';
import * as actiontyper from '../actions/actiontyper';
import { getContextRoot } from '../routers/paths';
import { get } from '../gateway-api';

export function* hentSykmeldt(action) {
  yield put(actions.henterSykmeldt());
  try {
    const url = `${getContextRoot()}/api/dinesykmeldte/${action.narmestelederId}`;
    const data = yield call(get, url);
    yield put(actions.sykmeldtHentet(data));
  } catch (e) {
    yield put(actions.hentSykmeldtFeilet());
  }
}

export default function* sykmeldtSagas() {
  yield takeEvery(actiontyper.HENT_SYKMELDT_FORESPURT, hentSykmeldt);
}
