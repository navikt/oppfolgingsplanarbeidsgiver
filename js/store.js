import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import arbeidsoppgaver from './reducers/arbeidsoppgaver';
import arbeidsforhold from './reducers/arbeidsforhold';
import avbrytdialogReducer from './reducers/avbrytdialog';
import delmednav from './reducers/delmednav';
import fastlegeDeling from './reducers/fastlegeDeling';
import kommentar from './reducers/kommentar';
import kontaktinfo from './reducers/kontaktinfo';
import kopierDialogReducer from './reducers/kopierOppfolgingsdialog';
import oppfolgingsdialoger from './reducers/oppfolgingsplaner';
import navigasjontoggles from './reducers/navigasjontoggles';
import naermesteleder from './reducers/naermesteleder';
import nullstill from './reducers/nullstillGodkjenning';
import person from './reducers/person';
import samtykke from './reducers/samtykke';
import tilgang from './reducers/tilgang';
import tiltak from './reducers/tiltak';
import timeout from './timeout/timeout';
import virksomhet from './reducers/virksomhet';

import sykmeldt from './reducers/sykmeldt';
import rootSaga from './sagas';
import dineSykmeldteMedSykmeldinger from '@/reducers/dineSykmeldteMedSykmeldinger';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  oppfolgingsdialoger,
  arbeidsoppgaver,
  arbeidsforhold,
  avbrytdialogReducer,
  kopierDialogReducer,
  navigasjontoggles,
  nullstill,
  tilgang,
  samtykke,
  kommentar,
  sykmeldt,
  dineSykmeldteMedSykmeldinger: dineSykmeldteMedSykmeldinger,
  tiltak,
  delmednav,
  fastlegeDeling,
  virksomhet,
  person,
  naermesteleder,
  kontaktinfo,
  timeout,
  form: formReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
