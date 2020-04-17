import React from 'react';
import PropTypes from 'prop-types';
import {
    delMedFastlegePt,
    delmednavPt,
    dokumentReducerPt,
    oppfolgingsplanPt,
} from '../../../../proptypes/opproptypes';
import { manglerSamtykke } from '../../../../utils/oppfolgingsplanUtils';
import GodkjentPlan from './GodkjentPlan';
import GodkjentPlanAvbrutt from './GodkjentPlanAvbrutt';
import Samtykke from '../samtykke/Samtykke';
import OppfolgingsdialogPlanInfoboks from './OppfolgingsdialogPlanInfoboks';

const ReleasetPlan = (
    {
        oppfolgingsplan,
        hentPdfurler,
        dokument,
        giSamtykke,
        avbrytDialog,
        rootUrl,
        rootUrlPlaner,
        delMedNavFunc,
        delmednav,
        fastlegeDeling,
        delMedFastlege,
        oppfolgingsplaner,
    }) => {
    if (manglerSamtykke(oppfolgingsplan)) {
        return (<Samtykke
            sendSamtykke={giSamtykke}
            oppfolgingsdialog={oppfolgingsplan}
            rootUrl={rootUrl}
        />);
    } else if (oppfolgingsplan.godkjentPlan && oppfolgingsplan.godkjentPlan.avbruttPlan) {
        return (<GodkjentPlanAvbrutt
            oppfolgingsdialog={oppfolgingsplan}
            oppfolgingsdialoger={oppfolgingsplaner}
            hentPdfurler={hentPdfurler}
            dokument={dokument}
            delMedNavFunc={delMedNavFunc}
            delmednav={delmednav}
            fastlegeDeling={fastlegeDeling}
            delMedFastlege={delMedFastlege}
            rootUrl={rootUrl}
            rootUrlPlaner={rootUrlPlaner}
        />);
    }
    return (
        <div>
            <GodkjentPlan
                oppfolgingsplan={oppfolgingsplan}
                avbrytDialog={avbrytDialog}
                hentPdfurler={hentPdfurler}
                dokument={dokument}
                delMedNavFunc={delMedNavFunc}
                delmednav={delmednav}
                fastlegeDeling={fastlegeDeling}
                delMedFastlege={delMedFastlege}
                rootUrl={rootUrl}
                rootUrlPlaner={rootUrlPlaner}
            />
            <OppfolgingsdialogPlanInfoboks />
        </div>
    );
};

ReleasetPlan.propTypes = {
    delmednav: delmednavPt,
    oppfolgingsplan: oppfolgingsplanPt,
    fastlegeDeling: delMedFastlegePt,
    hentPdfurler: PropTypes.func,
    delMedNavFunc: PropTypes.func,
    giSamtykke: PropTypes.func,
    avbrytDialog: PropTypes.func,
    delMedFastlege: PropTypes.func,
    dokument: dokumentReducerPt,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
    oppfolgingsplaner: PropTypes.arrayOf(oppfolgingsplanPt),
};

export default ReleasetPlan;

