import React from 'react';
import PropTypes from 'prop-types';
import { delMedFastlegePt, delmednavPt, oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import { manglerSamtykke } from '../../../../utils/oppfolgingsplanUtils';
import GodkjentPlan from './GodkjentPlan';
import GodkjentPlanAvbrutt from './GodkjentPlanAvbrutt';
import Samtykke from '../samtykke/Samtykke';
import OppfolgingsdialogPlanInfoboks from './OppfolgingsdialogPlanInfoboks';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';

const ReleasetPlan = ({
  oppfolgingsplan,
  oppfolgingsplaner,
  giSamtykke,
  avbrytDialog,
  rootUrl,
  rootUrlPlaner,
  delMedNavFunc,
  delmednav,
  fastlegeDeling,
  delMedFastlege,
}) => {
  if (manglerSamtykke(oppfolgingsplan)) {
    return <Samtykke sendSamtykke={giSamtykke} oppfolgingsdialog={oppfolgingsplan} rootUrl={rootUrl} />;
  } else if (oppfolgingsplan.godkjentPlan && oppfolgingsplan.godkjentPlan.avbruttPlan) {
    return (
      <GodkjentPlanAvbrutt
        oppfolgingsdialog={oppfolgingsplan}
        oppfolgingsdialoger={oppfolgingsplaner}
        delMedNavFunc={delMedNavFunc}
        delmednav={delmednav}
        fastlegeDeling={fastlegeDeling}
        delMedFastlege={delMedFastlege}
        rootUrl={rootUrl}
        rootUrlPlaner={rootUrlPlaner}
      />
    );
  }
  return (
    <div>
      <GodkjentPlan
        oppfolgingsplan={oppfolgingsplan}
        avbrytDialog={avbrytDialog}
        delMedNavFunc={delMedNavFunc}
        delmednav={delmednav}
        fastlegeDeling={fastlegeDeling}
        delMedFastlege={delMedFastlege}
        rootUrl={rootUrl}
        rootUrlPlaner={rootUrlPlaner}
      />
      <OppfolgingsdialogPlanInfoboks />
      <TidligereAvbruttePlaner oppfolgingsdialog={oppfolgingsplan} rootUrlPlaner={rootUrlPlaner} />
    </div>
  );
};

ReleasetPlan.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  oppfolgingsplaner: PropTypes.arrayOf(oppfolgingsplanPt),
  giSamtykke: PropTypes.func,
  avbrytDialog: PropTypes.func,
  rootUrl: PropTypes.string,
  rootUrlPlaner: PropTypes.string,
  delMedNavFunc: PropTypes.func,
  delmednav: delmednavPt,
  delMedFastlege: PropTypes.func,
  fastlegeDeling: delMedFastlegePt,
};

export default ReleasetPlan;
