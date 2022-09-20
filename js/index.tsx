import '@navikt/dinesykmeldte-sidemeny/dist/style.css';
import '../styles/styles.less';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import 'core-js/stable';
import 'whatwg-fetch';
import 'regenerator-runtime/runtime';
import * as Sentry from '@sentry/browser';
import AppRouter from './routers/AppRouter';
import history from './history';
import store from './store';
import { forlengInnloggetSesjon, sjekkInnloggingssesjon } from './timeout/timeout_actions';

Sentry.init({
  dsn: 'https://0a85ce6fefed42a49d44a727614d6b97@sentry.gc.nav.no/25',
  environment: window.location.hostname,
});

store.dispatch(forlengInnloggetSesjon());

setInterval(() => {
  store.dispatch(sjekkInnloggingssesjon());
}, 5000);

render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById('maincontent')
);

export { history };
