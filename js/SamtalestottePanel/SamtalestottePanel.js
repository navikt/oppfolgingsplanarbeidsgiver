import React from 'react';
import PanelBase from 'nav-frontend-paneler';
import { SamtalestottePodlet } from '../microfrontends/microfrontends';

const SamtalestottePanel = (orgnummer) => {
  return (
    <PanelBase>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <SamtalestottePodlet
        visning="SNAKKEBOBLE"
        prodDomener={['www.nav.no', 'oppfolgingsplanarbeidsgiver.nais.oera.no']}
        orgnr={orgnummer.orgnummer}
      />
    </PanelBase>
  );
};

export default SamtalestottePanel;
