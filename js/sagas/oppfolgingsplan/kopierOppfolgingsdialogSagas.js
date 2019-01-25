import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';

export function* kopierOppfolgingsdialog(action) {
    yield put(actions.kopiererOppfolgingsdialog());
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/kopier`;
        const data = yield call(post, url);
        yield put(actions.oppfolgingsdialogKopiert(data));
    } catch (e) {
        log(e);
        yield put(actions.kopierOppfolgingsdialogFeilet());
    }
}


function* watchKopierOppfolgingsdialog() {
    yield takeEvery(actions.KOPIER_OPPFOLGINGSDIALOG_FORESPURT, kopierOppfolgingsdialog);
}

export default function* kopierOppfolgingsdialogSagas() {
    yield fork(watchKopierOppfolgingsdialog);
}

