import React from 'react';
import PropTypes from 'prop-types';
import {
    delMedFastlegePt,
    delmednavPt,
    dokumentReducerPt,
    oppfolgingsdialogPt,
} from '../../../../proptypes/opproptypes';
import GodkjentPlan from './GodkjentPlan';
import GodkjentPlanAvbrutt from './GodkjentPlanAvbrutt';
import Samtykke from '../samtykke/Samtykke';
import OppfolgingsdialogPlanInfoboks from './OppfolgingsdialogPlanInfoboks';

const manglerSamtykke = (oppfolgingsdialog) => {
    return oppfolgingsdialog.arbeidsgiver.samtykke === null;
};

const ReleasetPlan = (
    {
        oppfolgingsdialog,
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
        oppfolgingsdialoger,
    }) => {
    if (manglerSamtykke(oppfolgingsdialog)) {
        return (<Samtykke
            sendSamtykke={giSamtykke}
            oppfolgingsdialog={oppfolgingsdialog}
            rootUrl={rootUrl}
        />);
    } else if (oppfolgingsdialog.godkjentPlan && oppfolgingsdialog.godkjentPlan.avbruttPlan) {
        return (<GodkjentPlanAvbrutt
            oppfolgingsdialog={oppfolgingsdialog}
            oppfolgingsdialoger={oppfolgingsdialoger}
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
                oppfolgingsdialog={oppfolgingsdialog}
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
    oppfolgingsdialog: oppfolgingsdialogPt,
    fastlegeDeling: delMedFastlegePt,
    hentPdfurler: PropTypes.func,
    delMedNavFunc: PropTypes.func,
    giSamtykke: PropTypes.func,
    avbrytDialog: PropTypes.func,
    delMedFastlege: PropTypes.func,
    dokument: dokumentReducerPt,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsdialogPt),
};

export default ReleasetPlan;

