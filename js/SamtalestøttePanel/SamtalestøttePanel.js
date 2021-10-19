import React from 'react';
import PanelBase from 'nav-frontend-paneler';
import { SamtalestøttePodlet } from '../microfrontends/microfrontends';

const SamtalestøttePanel = (orgnummer) => {
  return (
    <PanelBase>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <SamtalestøttePodlet
        visning="SNAKKEBOBLE"
        prodDomener={['tjenester.nav.no', 'oppfolgingsplanarbeidsgiver.nais.oera.no']}
        orgnr={orgnummer.orgnummer}
      />
    </PanelBase>
  );
};

export default SamtalestøttePanel;
