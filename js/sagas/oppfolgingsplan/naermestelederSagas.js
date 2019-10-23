import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/naermesteLeder_actions';

export function* hentNaermesteLederSaga(action) {
    yield put(actions.henterNaermesteLeder(action.fnr, action.virksomhetsnummer));
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/naermesteleder/${action.fnr}?virksomhetsnummer=${action.virksomhetsnummer}`;
        const naermesteLeder = yield call(get, url);
        yield put(actions.naermesteLederHentet(naermesteLeder, action.fnr, action.virksomhetsnummer));
    } catch (e) {
        if (e.message === '404') {
            yield put(actions.ingenNaermesteLeder(action.fnr, action.virksomhetsnummer));
            return;
        }
        log(e);
        yield put(actions.hentNaermesteLederFeilet(action.fnr, action.virksomhetsnummer));
    }
}

function* watchHentNaermesteLeder() {
    yield takeEvery(actions.HENT_NAERMESTELEDER_FORESPURT, hentNaermesteLederSaga);
}

export default function* naermesteLederSagas() {
    yield fork(watchHentNaermesteLeder);
}

