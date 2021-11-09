import React from 'react';
import { gyldighetstidspunktPt } from '../../../proptypes/opproptypes';
import { toDateMedMaanedNavn } from '../../../utils/datoUtils';
import BildeTekstLinje from '../../app/BildeTekstLinje';
import { BubbleImage, CalendarImage } from '@/images/imageComponents';

const GodkjennPlanTidspunkt = ({ gyldighetstidspunkt }) => {
  return (
    gyldighetstidspunkt && (
      <React.Fragment>
        <BildeTekstLinje
          imgUrl={CalendarImage}
          imgAlt=""
          tekst={`Planens varighet: ${toDateMedMaanedNavn(gyldighetstidspunkt.fom)} - ${toDateMedMaanedNavn(
            gyldighetstidspunkt.tom
          )}`}
        />
        <BildeTekstLinje
          imgUrl={BubbleImage}
          imgAlt=""
          tekst={`Planen evalueres: ${toDateMedMaanedNavn(gyldighetstidspunkt.evalueres)}`}
        />
      </React.Fragment>
    )
  );
};

GodkjennPlanTidspunkt.propTypes = {
  gyldighetstidspunkt: gyldighetstidspunktPt,
};

export default GodkjennPlanTidspunkt;
