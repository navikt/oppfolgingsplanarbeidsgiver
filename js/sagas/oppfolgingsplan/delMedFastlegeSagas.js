import {
    call,
    put,
    fork,
    takeEvery,
} from 'redux-saga/effects';
import {
    post,
    log,
} from 'digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/delMedFastlege_actions';

export function* delMedFastlege(action) {
    const fnr = action.fnr;

    yield put(actions.delerMedFastlege(fnr));
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/delmedfastlege`;
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
