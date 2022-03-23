import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/avbrytdialog_actions';
import { post, SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST } from '@/gateway-api';

export function* avbrytDialog(action) {
  const fnr = action.fnr;

  yield put(actions.avbryterDialog(fnr));
  try {
    const url = `${SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST}/oppfolgingsplan/actions/${action.id}/avbryt`;
    yield call(post, url);
    yield put(actions.dialogAvbrutt(action.id, fnr));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    yield put(actions.avbrytDialogFeilet(fnr));
  }
}

export default function* avbrytdialogSagas() {
  yield takeEvery(actions.AVBRYT_DIALOG_FORESPURT, avbrytDialog);
}
