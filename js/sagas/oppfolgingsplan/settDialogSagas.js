import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/sett_actions';
import { post, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';

export function* settDialoger(action) {
  yield put(actions.setterSettDialog());
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/oppfolgingsplan/actions/${action.id}/sett`;
    yield call(post, url);
    yield put(actions.dialogSett(action.id));
  } catch (e) {
    yield put(actions.settDialogFeilet());
  }
}

export default function* settDialogSagas() {
  yield takeEvery(actions.SETT_DIALOG_FORESPURT, settDialoger);
}
