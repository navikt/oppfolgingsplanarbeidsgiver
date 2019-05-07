import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from 'digisyfo-npm';
import {
    API_NAVN,
    hentSyfoapiUrl,
    post,
} from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/nullstillGodkjenning_actions';

export function* nullstillGodkjenning(action) {
    const fnr = action.fnr;

    yield put(actions.nullstillerGodkjenning(fnr));
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/nullstillGodkjenning`;
        yield call(post, url);
        yield put(actions.nullstiltGodkjenning(action.id, fnr));
    } catch (e) {
        log(e);
        yield put(actions.nullstillGodkjenningFeilet(fnr));
    }
}

function* watchNullstillGodkjenning() {
    yield takeEvery(actions.NULLSTILL_GODKJENNING_FORESPURT, nullstillGodkjenning);
}

export default function* nullstillGodkjenningSagas() {
    yield fork(watchNullstillGodkjenning);
}
