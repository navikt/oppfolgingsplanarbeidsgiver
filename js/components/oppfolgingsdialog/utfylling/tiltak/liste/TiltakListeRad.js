import EtikettBase from 'nav-frontend-etiketter';

import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_TILTAK } from '../../../../../konstanter';
import { tiltakPt } from '../../../../../proptypes/opproptypes';
import { toDateMedMaanedNavn } from '../../../../../utils/datoUtils';
import { skalVurdereTiltak } from '../../../../../utils/tiltakUtils';
import TiltakInformasjonKnapper from './TiltakInformasjonKnapper';
import { VarseltrekantImage } from '@/images/imageComponents';

const texts = {
  status: {
    avtalt: 'Avtalt',
    ikkAktuelt: 'Ikke aktuelt',
    foreslatt: 'Foreslått',
  },
};

const TiltakListeRad = ({
  tiltak,
  fnr,
  sendSlett,
  lagreSkjema,
  visLagreSkjema,
  lagreKommentarSkjema,
  visLagreKommentarSkjema,
}) => {
  let etikettType = '';
  let status = '';

  switch (tiltak.status) {
    case STATUS_TILTAK.AVTALT:
      etikettType = 'suksess';
      status = texts.status.avtalt;
      break;
    case STATUS_TILTAK.IKKE_AKTUELT:
      etikettType = 'advarsel';
      status = texts.status.ikkAktuelt;
      break;
    default:
      etikettType = 'fokus';
      status = texts.status.foreslatt;
      break;
  }
  return (
    <div>
      <div className="tiltaktabell__rad__navn">
        <span className="tiltak__rad__navn--tittel">
          {skalVurdereTiltak(tiltak, fnr) && <img alt="" className="tiltaktabell__rad__img" src={VarseltrekantImage} />}
          {tiltak.tiltaknavn}
        </span>
      </div>
      {tiltak.fom && tiltak.tom && tiltak.status !== STATUS_TILTAK.IKKE_AKTUELT && (
        <p className="tiltaktabell__meta">
          {toDateMedMaanedNavn(tiltak.fom)} - {toDateMedMaanedNavn(tiltak.tom)}
        </p>
      )}
      {tiltak.status && (
        <EtikettBase mini type={etikettType}>
          {status}
        </EtikettBase>
      )}
      <TiltakInformasjonKnapper
        element={tiltak}
        fnr={fnr}
        lagreSkjema={lagreSkjema}
        visLagreSkjema={visLagreSkjema}
        sendSlett={sendSlett}
        lagreKommentarSkjema={lagreKommentarSkjema}
        visLagreKommentarSkjema={visLagreKommentarSkjema}
      />
    </div>
  );
};

TiltakListeRad.propTypes = {
  tiltak: tiltakPt,
  fnr: PropTypes.string,
  sendSlett: PropTypes.func,
  lagreSkjema: PropTypes.bool,
  visLagreSkjema: PropTypes.func,
  lagreKommentarSkjema: PropTypes.bool,
  visLagreKommentarSkjema: PropTypes.func,
  rootUrlImg: PropTypes.string,
};

export default TiltakListeRad;
