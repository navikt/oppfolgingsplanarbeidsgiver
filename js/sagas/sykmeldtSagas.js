import { call, put, takeEvery } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from '../actions/sykmeldt_actions';
import * as actiontyper from '../actions/actiontyper';
import { getContextRoot } from '../routers/paths';

export function* hentSykmeldt(action) {
  yield put(actions.henterSykmeldt());
  try {
    const url = `${getContextRoot()}/api/dinesykmeldte/${action.narmestelederId}`;
    const data = yield call(get, url);
    yield put(actions.sykmeldtHentet(data));
  } catch (e) {
    log(e);
    yield put(actions.hentSykmeldtFeilet());
  }
}

export default function* sykmeldtSagas() {
  yield takeEvery(actiontyper.HENT_SYKMELDT_FORESPURT, hentSykmeldt);
}
