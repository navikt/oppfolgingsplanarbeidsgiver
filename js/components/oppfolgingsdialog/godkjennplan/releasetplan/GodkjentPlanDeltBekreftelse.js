import React from 'react';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';
import { toDateMedMaanedNavn } from '../../../../utils/datoUtils';

const textSharedWithNAV = (date) => {
    return `Planen ble delt med NAV ${date}`;
};

const textSharedWitFastlege = (date) => {
    return `Planen ble delt med fastlegen ${date}`;
};

const GodkjentPlanDeltBekreftelse = ({ oppfolgingsplan }) => {
    return (
        <React.Fragment>
            { oppfolgingsplan.godkjentPlan.deltMedNAV && oppfolgingsplan.godkjentPlan.deltMedNAVTidspunkt && <p>
                {textSharedWithNAV(toDateMedMaanedNavn(oppfolgingsplan.godkjentPlan.deltMedNAVTidspunkt))}
            </p>
            }
            { oppfolgingsplan.godkjentPlan.deltMedFastlege && oppfolgingsplan.godkjentPlan.deltMedFastlegeTidspunkt && <p>
                {textSharedWitFastlege(toDateMedMaanedNavn(oppfolgingsplan.godkjentPlan.deltMedFastlegeTidspunkt))}
            </p>
            }
        </React.Fragment>
    );
};
GodkjentPlanDeltBekreftelse.propTypes = {
    oppfolgingsplan: oppfolgingsdialogPt,
};

export default GodkjentPlanDeltBekreftelse;
