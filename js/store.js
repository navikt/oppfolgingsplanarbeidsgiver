import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ledetekster, toggles, timeout, sykeforlopsPerioder } from 'digisyfo-npm';
import {
    oppfolgingsdialogerAg as oppfolgingsdialoger,
    arbeidsoppgaver,
    samtykke,
    tiltak,
    nullstill,
    kommentar,
    dokument,
    forespoerselRevidering,
    navigasjontoggles,
    avbrytdialogReducer,
    arbeidsforhold,
    kopierDialog as kopierDialogReducer,
    tilgangAg as tilgang,
    nyNaermesteLeder,
    delmednav,
    fastlegeDeling,
    virksomhet,
    person,
    kontaktinfo,
    naermesteleder,
} from 'oppfolgingsdialog-npm';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import sykmeldte from './reducers/sykmeldte';
import sykmeldinger from './reducers/sykmeldinger';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    ledetekster,
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
    toggles,
    sykeforlopsPerioder,
});

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
