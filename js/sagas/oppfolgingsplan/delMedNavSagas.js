import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/delmednav_actions';

export function* delMedNav(action) {
    const fnr = action.fnr;

    yield put(actions.delerMedNav(fnr));
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/delmednav`;
        yield call(post, url);
        yield put(actions.deltMedNav(action.id, fnr));
    } catch (e) {
        log(e);
        yield put(actions.delMedNavFeilet(fnr));
    }
}


function* watchDelMedNav() {
    yield takeEvery(actions.DEL_MED_NAV_FORESPURT, delMedNav);
}

export default function* delMedNavSagas() {
    yield fork(watchDelMedNav);
}

