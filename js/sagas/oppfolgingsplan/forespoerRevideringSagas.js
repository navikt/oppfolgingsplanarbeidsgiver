import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import {
    API_NAVN,
    hentSyfoapiUrl,
    post,
} from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/forespoerRevidering_actions';

export function* forespoerRevidering(action) {
    yield put(actions.forespoerRevideringSender(action.id));
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/foresporRevidering`;
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
