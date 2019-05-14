import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from 'digisyfo-npm';
import {
    API_NAVN,
    hentSyfoapiUrl,
    get,
} from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/dokument_actions';

export function* henterPdfurler(action) {
    yield put(actions.henterPdfurler());
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/dokument/${action.id}/pdfurler`;
        const data = yield call(get, url);
        yield put(actions.pdfurlerHentet(data, action.id));
    } catch (e) {
        log(e);
        yield put(actions.hentPdfurlerFeilet());
    }
}

function* watchHentPdfUrler() {
    yield takeEvery(actions.HENT_PDFURLER_FORESPURT, henterPdfurler);
}

export default function* dokumentSagas() {
    yield fork(watchHentPdfUrler);
}

