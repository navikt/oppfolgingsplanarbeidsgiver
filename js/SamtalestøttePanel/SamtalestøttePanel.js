import React from 'react';
import PanelBase from 'nav-frontend-paneler';
import { SamtalestøttePodlet } from '../microfrontends/microfrontends';

const SamtalestøttePanel = () => {
  return (
    <PanelBase>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <SamtalestøttePodlet
        visning="SNAKKEBOBLE"
        prodDomener={['tjenester.nav.no', 'oppfolgingsplanarbeidsgiver.nais.oera.no']}
      />
    </PanelBase>
  );
};

export default SamtalestøttePanel;
