import React from 'react';
import { SideMenu, RootPages } from '@navikt/dinesykmeldte-sidemeny';
import { Sykmeldt } from '@/shapes/types';

export const ArbeidsgiverSideMenu = ({ sykmeldt }: Props): JSX.Element | null => {
  if (!!sykmeldt?.navn && sykmeldt?.narmestelederId) {
    return (
      <SideMenu
        sykmeldtName={sykmeldt.navn}
        sykmeldtId={sykmeldt.narmestelederId}
        activePage={RootPages.Oppfolgingsplaner}
        routes={{
          Soknader: 0,
          Sykmeldinger: 0,
          Meldinger: false,
          Dialogmoter: 0,
          Oppfolgingsplaner: 0,
          DineSykmeldte: 0,
        }}
      />
    );
  }

  return null;
};

interface Props {
  sykmeldt?: Sykmeldt;
}
