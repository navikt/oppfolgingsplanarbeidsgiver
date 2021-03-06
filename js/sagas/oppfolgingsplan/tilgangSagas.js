import {
    call,
    put,
    fork,
    select,
    takeEvery,
} from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import {
    API_NAVN,
    hentSyfoapiUrl,
    get,
} from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/sjekkTilgang_actions';
import { skalHenteOPTilgang } from '../../selectors/tilgangSelectors';

export function* sjekkerTilgang(action) {
    const fnr = action.sykmeldt.fnr;

    yield put(actions.sjekkerTilgang(fnr));
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/tilgang?fnr=${fnr}`;
    try {
        const data = yield call(get, url);
        yield put(actions.sjekketTilgang(data, fnr));
    } catch (e) {
        if (e.message === '403') {
            yield put(actions.sjekkTilgang403(fnr));
            return;
        }
        log(e);
        yield put(actions.sjekkTilgangFeilet(fnr));
    }
}

export function* sjekkTilgangHvisIkkeSjekket(action) {
    const skalHente = yield select(skalHenteOPTilgang, action);
    if (skalHente) {
        yield sjekkerTilgang(action);
    }
}

function* watchSjekkTilgang() {
    yield takeEvery(actions.SJEKK_TILGANG_FORESPURT, sjekkTilgangHvisIkkeSjekket);
}

export default function* tilgangSagas() {
    yield fork(watchSjekkTilgang);
}
