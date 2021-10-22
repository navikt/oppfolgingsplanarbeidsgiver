import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import { toDateMedMaanedNavn } from '../../../../utils/datoUtils';
import BildeTekstLinje from '../../../app/BildeTekstLinje';
import { CalendarImage } from '@/images/imageComponents';

const textOppfolgingsplanDuration = (dateFrom, dateTo) => {
  return `Planens varighet: ${dateFrom} – ${dateTo}`;
};

const GodkjentPlanAvbruttTidspunkt = ({ oppfolgingsdialog }) => {
  return (
    <div className="blokk godkjentPlanAvbruttTidspunkt">
      <BildeTekstLinje
        imgUrl={CalendarImage}
        imgAlt=""
        tekst={textOppfolgingsplanDuration(
          toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom),
          toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.avbruttPlan.tidspunkt)
        )}
      />
    </div>
  );
};

GodkjentPlanAvbruttTidspunkt.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  rootUrl: PropTypes.string,
};

export default GodkjentPlanAvbruttTidspunkt;
