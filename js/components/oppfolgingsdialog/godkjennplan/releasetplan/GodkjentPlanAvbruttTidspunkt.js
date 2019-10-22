import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';
import { toDateMedMaanedNavn } from '../../../../utils/datoUtils';
import BildeTekstLinje from '../../../app/BildeTekstLinje';

const GodkjentPlanAvbruttTidspunkt = ({ oppfolgingsdialog, rootUrl }) => {
    return (
        <div className="blokk godkjentPlanAvbruttTidspunkt">
            <BildeTekstLinje
                imgUrl={`${rootUrl}/img/svg/calendar.svg`}
                alt="bubble"
                tekst={getLedetekst('oppfolgingsdialog.godkjentPlanAvbruttTidspunkt.varighet', {
                    '%FOM%': toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom),
                    '%AVBRUTT%': toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.avbruttPlan.tidspunkt),
                })}
            />
        </div>
    );
};

GodkjentPlanAvbruttTidspunkt.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    rootUrl: PropTypes.string,
};

export default GodkjentPlanAvbruttTidspunkt;
