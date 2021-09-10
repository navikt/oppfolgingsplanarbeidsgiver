import React from 'react';

import NavFrontendSpinner from 'nav-frontend-spinner';
import { AsyncNavspa } from '@navikt/navspa';
import { createAssetManifestParser, getMiljø } from './assetManifestUtils';

/*
type PodletProps = {
  visning: string | undefined;
}; */
const SAMTALESTØTTE_MIKROFONTEND = 'samtalestotte-podlet';
const SAMTALESTØTTE_MIKROFRONTEND_PATH = '/' + SAMTALESTØTTE_MIKROFONTEND;
const LasterInn = () => (
  <div className="microfrontends__laster-inn">
    <NavFrontendSpinner />
  </div>
);

const getMikrofrontendConfig = () => {
  const miljø = getMiljø();

  switch (miljø) {
    case 'dev-sbs':
      return {
        appBaseUrl: 'https://arbeidsgiver-gcp.dev.nav.no' + SAMTALESTØTTE_MIKROFRONTEND_PATH,
      };

    case 'local':
      return {
        appBaseUrl: 'http://localhost:3001' + SAMTALESTØTTE_MIKROFRONTEND_PATH,
      };

    default:
      return { appBaseUrl: SAMTALESTØTTE_MIKROFRONTEND_PATH };
  }
};

const samtalestottePodletConfig = {
  appName: SAMTALESTØTTE_MIKROFONTEND,
  appBaseUrl: getMikrofrontendConfig().appBaseUrl,
  assetManifestParser: createAssetManifestParser(getMikrofrontendConfig()),
  loader: <LasterInn />,
};

export const SamtalestøttePodlet = AsyncNavspa.importer(samtalestottePodletConfig);
