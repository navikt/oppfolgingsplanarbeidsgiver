import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';
import { post, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';

export function* kopierOppfolgingsplan(action) {
  yield put(actions.kopiererOppfolgingsdialog());
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/oppfolgingsplan/actions/${action.id}/kopier`;
    const data = yield call(post, url);
    yield put(actions.oppfolgingsdialogKopiert(data));
  } catch (e) {
    yield put(actions.kopierOppfolgingsdialogFeilet());
  }
}

export default function* kopierOppfolgingsplanSagas() {
  yield takeEvery(actions.KOPIER_OPPFOLGINGSDIALOG_FORESPURT, kopierOppfolgingsplan);
}
