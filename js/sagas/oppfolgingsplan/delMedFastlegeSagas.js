import {
    call,
    put,
    fork,
    takeEvery,
} from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import {
    API_NAVN,
    hentSyfoapiUrl,
    post,
} from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/delMedFastlege_actions';

export function* delMedFastlege(action) {
    const fnr = action.fnr;

    yield put(actions.delerMedFastlege(fnr));
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/delmedfastlege`;
        yield call(post, url);
        yield put(actions.deltMedFastlege(action.id, fnr));
    } catch (e) {
        log(e);
        yield put(actions.delMedFastlegeFeilet(fnr));
    }
}

function* watchDelMedFastlege() {
    yield takeEvery(actions.DEL_MED_FASTLEGE_FORESPURT, delMedFastlege);
}

export default function* delMedFastlegeSagas() {
    yield fork(watchDelMedFastlege);
}
