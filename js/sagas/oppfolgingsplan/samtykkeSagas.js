import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/samtykke_actions';

export function* giSamtykke(action) {
    const fnr = action.fnr;

    yield put(actions.girSamtykke(fnr));
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/samtykke?samtykke=${action.samtykke}`;
        yield call(post, url);
        yield put(actions.samtykkeGitt(action.id, action.samtykke, fnr));
    } catch (e) {
        log(e);
        yield put(actions.giSamtykkeFeilet(fnr));
    }
}

function* watchGiSamtykke() {
    yield takeEvery(actions.GI_SAMTYKKE_FORESPURT, giSamtykke);
}

export default function* samtykkeSagas() {
    yield fork(watchGiSamtykke);
}
