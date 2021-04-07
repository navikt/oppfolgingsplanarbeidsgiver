import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { API_NAVN, hentSyfoapiUrl, post } from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/sett_actions';

export function* settDialoger(action) {
  yield put(actions.setterSettDialog());
  try {
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/sett`;
    yield call(post, url);
    yield put(actions.dialogSett(action.id));
  } catch (e) {
    log(e);
    yield put(actions.settDialogFeilet());
  }
}

function* watchSettDialoger() {
  yield takeEvery(actions.SETT_DIALOG_FORESPURT, settDialoger);
}

export default function* settDialogSagas() {
  yield fork(watchSettDialoger);
}
