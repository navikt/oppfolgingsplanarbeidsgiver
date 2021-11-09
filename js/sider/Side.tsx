import React, { ReactNode } from 'react';
import AppSpinner from '../components/AppSpinner';
import TimeoutBox from '../timeout/TimeoutBox';
import DocumentTitle from 'react-document-title';
import Brodsmuler from '@/components/Brodsmuler';

interface SideProps {
  tittel: string;
  brodsmuler: never;
  laster: boolean;
  children: ReactNode;
}

export const Side = ({ tittel, brodsmuler, laster, children }: SideProps) => {
  return (
    <DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
      <div aria-busy={laster}>
        <TimeoutBox />
        {laster && (
          <div className="side__spinner">
            <AppSpinner />
          </div>
        )}
        <div className={'side__innhold side__innhold--begrenset js-begrensning'}>
          <Brodsmuler brodsmuler={brodsmuler} />
          {children}
        </div>
      </div>
    </DocumentTitle>
  );
};
