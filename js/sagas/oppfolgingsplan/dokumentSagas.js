import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/dokument_actions';

export function* henterPdfurler(action) {
    yield put(actions.henterPdfurler());
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/dokument/${action.id}/pdfurler`;
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

