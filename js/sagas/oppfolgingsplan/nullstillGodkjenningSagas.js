import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/nullstillGodkjenning_actions';

export function* nullstillGodkjenning(action) {
    const fnr = action.fnr;

    yield put(actions.nullstillerGodkjenning(fnr));
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/nullstillGodkjenning`;
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
