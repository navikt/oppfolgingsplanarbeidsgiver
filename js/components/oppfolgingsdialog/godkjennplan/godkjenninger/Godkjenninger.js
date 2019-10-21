import React from 'react';
import PropTypes from 'prop-types';
import MottattGodkjenninger from './MottattGodkjenninger';
import GodkjennPlanSendt from './GodkjennPlanSendt';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';
import { getContextRoot } from '../../../../routers/paths';

const harMottattGodkjenninger = (oppfolgingsdialog) => {
    const godkjenninger = oppfolgingsdialog.godkjenninger;
    const aktoer = oppfolgingsdialog.arbeidsgiver.naermesteLeder;
    return godkjenninger.length > 0 && godkjenninger[0].godkjentAv.fnr && godkjenninger[0].godkjentAv.fnr !== aktoer.fnr;
};

const Godkjenninger = ({ oppfolgingsdialog, godkjennPlan, nullstillGodkjenning, avvisDialog, rootUrlPlaner }) => {
    if (harMottattGodkjenninger(oppfolgingsdialog)) {
        return (<MottattGodkjenninger
            oppfolgingsdialog={oppfolgingsdialog}
            godkjennPlan={godkjennPlan}
            nullstillGodkjenning={nullstillGodkjenning}
            avvisDialog={avvisDialog}
            rootUrl={getContextRoot()}
        />);
    }
    return (<GodkjennPlanSendt
        oppfolgingsdialog={oppfolgingsdialog}
        nullstillGodkjenning={nullstillGodkjenning}
        rootUrl={getContextRoot()}
        rootUrlPlaner={rootUrlPlaner}
    />);
};


Godkjenninger.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    avvisDialog: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    godkjennPlan: PropTypes.func,
    rootUrlPlaner: PropTypes.string,
};

export default Godkjenninger;
