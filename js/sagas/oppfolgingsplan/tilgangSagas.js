import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import logger from '../../logg/logging';
import * as actions from '../../actions/oppfolgingsplan/sjekkTilgang_actions';

export function* sjekkerTilgang(action) {
    const fnr = action.fnr;

    yield put(actions.sjekkerTilgang(fnr));
    const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/tilgang?fnr=${fnr}`;
    try {
        const data = yield call(get, url);
        yield put(actions.sjekketTilgang(data, fnr));
    } catch (e) {
        if (e.message === '403') {
            yield put(actions.sjekkTilgang403(fnr));
            return;
        }
        log(e);
        logger.error(`Kunne ikke hente tilgang for arbeidsgiver. ${e.message}`);
        yield put(actions.sjekkTilgangFeilet(fnr));
    }
}

function* watchSjekkTilgang() {
    yield takeEvery(actions.SJEKK_TILGANG_FORESPURT, sjekkerTilgang);
}

export default function* tilgangSagas() {
    yield fork(watchSjekkTilgang);
}
