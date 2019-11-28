import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';

import {
    timeout,
    sykeforlopsPerioder,
} from '@navikt/digisyfo-npm';
import arbeidsoppgaver from './reducers/arbeidsoppgaver';
import arbeidsforhold from './reducers/arbeidsforhold';
import avbrytdialogReducer from './reducers/avbrytdialog';
import delmednav from './reducers/delmednav';
import dokument from './reducers/dokument';
import fastlegeDeling from './reducers/fastlegeDeling';
import forespoerselRevidering from './reducers/forespoerselRevidering';
import kommentar from './reducers/kommentar';
import kontaktinfo from './reducers/kontaktinfo';
import kopierDialogReducer from './reducers/kopierOppfolgingsdialog';
import oppfolgingsdialoger from './reducers/oppfolgingsplaner';
import navigasjontoggles from './reducers/navigasjontoggles';
import naermesteleder from './reducers/naermesteleder';
import nullstill from './reducers/nullstillGodkjenning';
import person from './reducers/person';
import nyNaermesteLeder from './reducers/nyNaermesteLeder';
import samtykke from './reducers/samtykke';
import tilgang from './reducers/tilgang';
import tiltak from './reducers/tiltak';
import virksomhet from './reducers/virksomhet';

import sykmeldte from './reducers/sykmeldte';
import sykmeldinger from './reducers/sykmeldinger';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    oppfolgingsdialoger,
    arbeidsoppgaver,
    arbeidsforhold,
    avbrytdialogReducer,
    kopierDialogReducer,
    navigasjontoggles,
    nullstill,
    nyNaermesteLeder,
    tilgang,
    samtykke,
    kommentar,
    dokument,
    forespoerselRevidering,
    sykmeldte,
    sykmeldinger,
    tiltak,
    delmednav,
    fastlegeDeling,
    virksomhet,
    person,
    naermesteleder,
    kontaktinfo,
    timeout,
    form: formReducer,
    sykeforlopsPerioder,
});

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
