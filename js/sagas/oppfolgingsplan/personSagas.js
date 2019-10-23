import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/person_actions';

export function* hentPersonSaga(action) {
    yield put(actions.henterPerson(action.fnr));
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/person/${action.fnr}`;
        const person = yield call(get, url);
        yield put(actions.personHentet(person, action.fnr));
    } catch (e) {
        log(e);
        yield put(actions.hentPersonFeilet(action.fnr));
    }
}

function* watchHentPerson() {
    yield takeEvery(actions.HENT_PERSON_FORESPURT, hentPersonSaga);
}

export default function* personSagas() {
    yield fork(watchHentPerson);
}

