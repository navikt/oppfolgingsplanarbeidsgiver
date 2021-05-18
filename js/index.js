import 'whatwg-fetch';
import 'babel-polyfill';
import { render } from 'react-dom';
import { setPerformOnHttpCalls } from '@navikt/digisyfo-npm';
import * as Sentry from '@sentry/browser';
import { Provider } from 'react-redux';
import React from 'react';
import AppRouter from './routers/AppRouter';
import history from './history';
import store from './store';
import { hentSykmeldte } from './actions/sykmeldte_actions';
import '../styles/styles.less';
import { forlengInnloggetSesjon, sjekkInnloggingssesjon } from './timeout/timeout_actions';

Sentry.init({
  dsn: 'https://0a85ce6fefed42a49d44a727614d6b97@sentry.gc.nav.no/25',
  environment: window.location.hostname,
});

store.dispatch(hentSykmeldte());
store.dispatch(forlengInnloggetSesjon());

setPerformOnHttpCalls(() => {
  store.dispatch(forlengInnloggetSesjon());
});

setInterval(() => {
  store.dispatch(sjekkInnloggingssesjon());
}, 5000);

render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById('maincontent')
);

export { history, store };
