import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { log } from 'digisyfo-npm';
import {
    API_NAVN,
    hentSyfoapiUrl,
    post,
} from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/tiltak_actions';
import { input2RSTiltak } from '../../utils/tiltakUtils';

export function* lagreTiltak(action) {
    const fnr = action.fnr;
    yield put(actions.lagrerTiltak(fnr, action.tiltak.tiltakId));
    const body = input2RSTiltak(action.tiltak);
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/lagreTiltak`;
        const data = yield call(post, url, body);
        yield put(actions.tiltakLagret(action.id, data, action.tiltak, fnr));
    } catch (e) {
        if (e.message === '409') {
            window.location.reload();
            return;
        }
        log(e);
        yield put(actions.lagreTiltakFeilet(fnr, action.tiltak));
    }
}

export function* slettTiltak(action) {
    const fnr = action.fnr;

    yield put(actions.sletterTiltak(fnr));
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/tiltak/actions/${action.tiltakId}/slett`;
        yield call(post, url);
        yield put(actions.tiltakSlettet(action.id, action.tiltakId, fnr));
    } catch (e) {
        if (e.message === '409') {
            window.location.reload();
            return;
        }
        log(e);
        yield put(actions.slettTiltakFeilet(fnr, action.tiltakId));
    }
}

function* watchLagreTiltak() {
    yield takeEvery(actions.LAGRE_TILTAK_FORESPURT, lagreTiltak);
}

function* watchSlettTiltak() {
    yield takeEvery(actions.SLETT_TILTAK_FORESPURT, slettTiltak);
}

export default function* tiltakSagas() {
    yield all([
        fork(watchLagreTiltak),
        fork(watchSlettTiltak),
    ]);
}
