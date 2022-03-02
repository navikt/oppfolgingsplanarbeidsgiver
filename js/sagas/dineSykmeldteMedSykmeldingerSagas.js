import { call, fork, put, takeEvery } from 'redux-saga/effects';
import * as actiontyper from '../actions/sykmeldinger/sykmeldinger_actions';
import {
  henterDineSykmeldteMedSykmeldinger,
  hentDineSykmeldteMedSykmeldingerFeilet,
  dineSykmeldteMedSykmeldingerHentet,
} from '@/actions/sykmeldinger/sykmeldinger_actions';
import { get } from '@/gateway-api';
import { getContextRoot } from '@/routers/paths';

export function* hentDineSykmeldteMedSykmeldinger() {
  yield put(henterDineSykmeldteMedSykmeldinger());
  const url = `${getContextRoot()}/api/dinesykmeldte`;
  try {
    const data = yield call(get, url);
    yield put(dineSykmeldteMedSykmeldingerHentet(data));
  } catch (e) {
    yield put(hentDineSykmeldteMedSykmeldingerFeilet());
  }
}

function* watchHentDineSykmeldteMedSykmeldinger() {
  yield takeEvery([actiontyper.HENT_DINE_SYKMELDTE_MED_SYKMELDINGER_FORESPURT], hentDineSykmeldteMedSykmeldinger);
}

export default function* dineSykmeldteMedSykmeldingerSagas() {
  yield fork(watchHentDineSykmeldteMedSykmeldinger);
}
