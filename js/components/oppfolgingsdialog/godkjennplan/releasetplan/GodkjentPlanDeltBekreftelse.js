import React from 'react';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import { toDateMedMaanedNavn } from '../../../../utils/datoUtils';
import BildeTekstLinje from '../../../app/BildeTekstLinje';

const textSharedWithNAV = (date) => {
  return `Planen ble delt med NAV ${date}`;
};

const textSharedWitFastlege = (date) => {
  return `Planen ble delt med fastlegen ${date}`;
};

const GodkjentPlanDeltBekreftelse = ({ oppfolgingsplan }) => {
  return (
    <React.Fragment>
      {oppfolgingsplan.godkjentPlan.deltMedNAV && oppfolgingsplan.godkjentPlan.deltMedNAVTidspunkt && (
        <BildeTekstLinje
          imgUrl={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/nav-logo.svg`}
          imgAlt=""
          tekst={textSharedWithNAV(toDateMedMaanedNavn(oppfolgingsplan.godkjentPlan.deltMedNAVTidspunkt))}
        />
      )}
      {oppfolgingsplan.godkjentPlan.deltMedFastlege && oppfolgingsplan.godkjentPlan.deltMedFastlegeTidspunkt && (
        <BildeTekstLinje
          imgUrl={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/medical-box.svg`}
          imgAlt=""
          tekst={textSharedWitFastlege(toDateMedMaanedNavn(oppfolgingsplan.godkjentPlan.deltMedFastlegeTidspunkt))}
        />
      )}
    </React.Fragment>
  );
};
GodkjentPlanDeltBekreftelse.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
};

export default GodkjentPlanDeltBekreftelse;
