import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/forespoerRevidering_actions';

export function* forespoerRevidering(action) {
    yield put(actions.forespoerRevideringSender(action.id));
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/forespoerRevidering`;
        yield call(post, url);
        yield put(actions.forespoerRevideringSuksess(action.id));
    } catch (e) {
        log(e);
        yield put(actions.forespoerRevideringFeilet(action.id));
    }
}

function* watchForespoerRevidering() {
    yield takeEvery(actions.FORESPOER_REVIDERING_FORESPURT, forespoerRevidering);
}

export default function* forespoerRevideringSagas() {
    yield fork(watchForespoerRevidering);
}
