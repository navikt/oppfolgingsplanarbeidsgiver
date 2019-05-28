import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from 'digisyfo-npm';
import {
    hentSyfoapiUrl,
    API_NAVN,
    post,
} from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/avbrytdialog_actions';

export function* avbrytDialog(action) {
    const fnr = action.fnr;

    yield put(actions.avbryterDialog(fnr));
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/avbryt`;
        yield call(post, url);
        yield put(actions.dialogAvbrutt(action.id, fnr));
    } catch (e) {
        if (e.message === '409') {
            window.location.reload();
            return;
        }
        log(e);
        yield put(actions.avbrytDialogFeilet(fnr));
    }
}

function* watchAvbrytDialog() {
    yield takeEvery(actions.AVBRYT_DIALOG_FORESPURT, avbrytDialog);
}

export default function* avbrytdialogSagas() {
    yield fork(watchAvbrytDialog);
}

