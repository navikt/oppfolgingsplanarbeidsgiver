import React from 'react';
import { AsyncNavspa } from '@navikt/navspa';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { getMiljo } from '../utils/urlUtils';

const SAMTALESTOTTE_MIKROFRONTEND = 'samtalestotte-podlet';

const LasterInn = () => (
  <div className="microfrontends__laster-inn">
    <NavFrontendSpinner />
  </div>
);

const getMikrofrontendConfig = () => {
  const env = getMiljo();

  switch (env) {
    case 'dev-gcp':
      return {
        appBaseUrl: `https://arbeidsgiver-gcp.dev.nav.no/${SAMTALESTOTTE_MIKROFRONTEND}`,
      };

    case 'local':
      return {
        appBaseUrl: `http://localhost:3001/${SAMTALESTOTTE_MIKROFRONTEND}`,
      };

    case 'heroku':
      return {
        appBaseUrl: `https://arbeidsgiver.labs.nais.io/${SAMTALESTOTTE_MIKROFRONTEND}`,
      };

    default:
      return {
        appBaseUrl: `https://arbeidsgiver.nav.no/${SAMTALESTOTTE_MIKROFRONTEND}`,
      };
  }
};

export const SamtalestottePodlet = AsyncNavspa.importer({
  appName: SAMTALESTOTTE_MIKROFRONTEND,
  appBaseUrl: getMikrofrontendConfig().appBaseUrl,
  loader: <LasterInn />,
});
