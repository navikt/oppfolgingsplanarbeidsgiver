import React from 'react';

import NavFrontendSpinner from 'nav-frontend-spinner';
import { AsyncNavspa } from '@navikt/navspa';
import { createAssetManifestParser, getMiljø } from './assetManifestUtils';

const SAMTALESTØTTE_MIKROFRONTEND = 'samtalestotte-podlet';
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
        appBaseUrl: `https://arbeidsgiver-gcp.dev.nav.no/${SAMTALESTØTTE_MIKROFRONTEND}`,
        isSameDomain: false,
      };

    case 'local':
      return {
        appBaseUrl: `http://localhost:3001/${SAMTALESTØTTE_MIKROFRONTEND}`,
        isSameDomain: false,
      };

    default:
      return {
        appBaseUrl: `https://arbeidsgiver.nav.no/${SAMTALESTØTTE_MIKROFRONTEND}`,
        isSameDomain: false,
      };
  }
};

const samtalestottePodletConfig = {
  appName: SAMTALESTØTTE_MIKROFRONTEND,
  appBaseUrl: getMikrofrontendConfig().appBaseUrl,
  assetManifestParser: createAssetManifestParser(getMikrofrontendConfig()),
  loader: <LasterInn />,
};

export const SamtalestøttePodlet = AsyncNavspa.importer(samtalestottePodletConfig);
