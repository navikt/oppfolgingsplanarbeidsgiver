import React from 'react';
import { AsyncNavspa } from '@navikt/navspa';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { createAssetManifestParser } from './assetManifestUtils';
import { isHeroku } from '../utils/urlUtils';

const LasterInn = () => (
  <div className="microfrontends__laster-inn">
    <NavFrontendSpinner />
  </div>
);

const getMikrofrontendConfig = () => {
  if (isHeroku()) {
    return {
      appBaseUrl: `https://arbeidsgiver.labs.nais.io/samtalestotte-podlet`,
    };
  }

  return {
    appBaseUrl: `${window.location.origin}/oppfolgingsplanarbeidsgiver/api/samtalestotte-podlet`,
  };
};

export const SamtalestottePodlet = AsyncNavspa.importer({
  appName: 'samtalestotte-podlet',
  appBaseUrl: getMikrofrontendConfig().appBaseUrl,
  assetManifestParser: createAssetManifestParser(getMikrofrontendConfig()),
  loader: <LasterInn />,
});
