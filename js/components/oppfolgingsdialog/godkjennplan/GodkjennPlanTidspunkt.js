import React from 'react';
import { getContextRoot } from '../../../routers/paths';
import { gyldighetstidspunktPt } from '../../../proptypes/opproptypes';
import { toDateMedMaanedNavn } from '../../../utils/datoUtils';
import BildeTekstLinje from '../../app/BildeTekstLinje';

const GodkjennPlanTidspunkt = ({ gyldighetstidspunkt }) => {
    const rootUrl = getContextRoot();
    return (gyldighetstidspunkt &&
        <React.Fragment>
            <BildeTekstLinje
                imgUrl={`${rootUrl}/img/svg/calendar.svg`}
                alt="bubble"
                tekst={`Planens varighet: ${toDateMedMaanedNavn(gyldighetstidspunkt.fom)} - ${toDateMedMaanedNavn(gyldighetstidspunkt.tom)}`}
            />
            <BildeTekstLinje
                imgUrl={`${rootUrl}/img/svg/bubble.svg`}
                alt="calendar"
                tekst={`Planen evalueres: ${toDateMedMaanedNavn(gyldighetstidspunkt.evalueres)}`}
            />
        </React.Fragment>
    );
};

GodkjennPlanTidspunkt.propTypes = {
    gyldighetstidspunkt: gyldighetstidspunktPt,
};

export default GodkjennPlanTidspunkt;
