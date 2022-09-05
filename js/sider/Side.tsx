import React, { ReactNode } from 'react';
import DocumentTitle from 'react-document-title';
import Brodsmuler from '@/components/Brodsmuler';
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { People } from "@navikt/ds-icons";
import { Sykmeldt } from "@/shapes/types";
import {ArbeidsgiverSideMenu} from "@/components/menu/ArbeidsgiverSideMenu";
import { addSpaceAfterEverySixthCharacter } from "@/utils/tekstUtils";
import AppSpinner from '../components/AppSpinner';
import TimeoutBox from '../timeout/TimeoutBox';

interface SideProps {
  tittel: string;
  brodsmuler: never;
  laster: boolean;
  withAGNavigation?: boolean;
  withAGHeader?: boolean;
  sykmeldt?: Sykmeldt;
  children: ReactNode;
}

export const Side = ({ tittel, brodsmuler, laster, withAGNavigation, withAGHeader, sykmeldt, children }: SideProps) => {
  const sykmeldtName = sykmeldt?.navn ?? "";
  const sykmeldtFnr = sykmeldt?.fnr ?? "";

  const hasValidSykmeldtNameAndFnr =
      !!sykmeldtName && !!sykmeldtFnr && !!sykmeldt?.narmestelederId;
  const showAGHeader = withAGHeader && hasValidSykmeldtNameAndFnr;
  const showAGNavigation = withAGNavigation && hasValidSykmeldtNameAndFnr;

  const sykmeldtNameAndFnr = hasValidSykmeldtNameAndFnr
      ? { navn: sykmeldtName, fnr: sykmeldtFnr }
      : null;

  const agHeader = {
    Icon: People,
    title: sykmeldtName,
    subtitle:  `Fødselsnr: ${addSpaceAfterEverySixthCharacter(
        sykmeldtFnr
    )}`,
  }

  return (
    <DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
      <div aria-busy={laster}>
        <TimeoutBox />
        {laster && (
          <div className="side__spinner">
            <AppSpinner />
          </div>
        )}
          <Brodsmuler brodsmuler={brodsmuler} />
          <PageContainer
              sykmeldt={sykmeldtNameAndFnr}
              header={showAGHeader ? agHeader : false}
              navigation={showAGNavigation && <ArbeidsgiverSideMenu sykmeldt={sykmeldt} />}
          >
          {children}
          </PageContainer>
      </div>
    </DocumentTitle>
  );
};
