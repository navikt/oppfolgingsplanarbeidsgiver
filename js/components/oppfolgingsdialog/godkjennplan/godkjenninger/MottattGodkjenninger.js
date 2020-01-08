import React from 'react';
import PropTypes from 'prop-types';
import GodkjennPlanMottatt from './GodkjennPlanMottatt';
import GodkjennPlanAvslaatt from './GodkjennPlanAvslaatt';
import GodkjennPlanAvslaattOgGodkjent from './GodkjennPlanAvslaattOgGodkjent';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';

const harMangeGodkjenninger = (godkjenninger) => {
    return godkjenninger.length > 1;
};

const MottattGodkjenninger = (
    {
        oppfolgingsdialog,
        godkjennPlan,
        nullstillGodkjenning,
        avvisDialog,
        rootUrlPlaner,
    }) => {
    if (harMangeGodkjenninger(oppfolgingsdialog.godkjenninger)) {
        return (<GodkjennPlanAvslaattOgGodkjent
            avvisDialog={avvisDialog}
            godkjennPlan={godkjennPlan}
            oppfolgingsdialog={oppfolgingsdialog}
        />);
    }

    const godkjenning = oppfolgingsdialog.godkjenninger[0];
    if (godkjenning.godkjent) {
        return (<GodkjennPlanMottatt
            avvisDialog={avvisDialog}
            godkjennPlan={godkjennPlan}
            oppfolgingsdialog={oppfolgingsdialog}
            rootUrlPlaner={rootUrlPlaner}
        />);
    }
    return (<GodkjennPlanAvslaatt
        nullstillGodkjenning={nullstillGodkjenning}
        oppfolgingsdialog={oppfolgingsdialog}
    />);
};

MottattGodkjenninger.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    godkjennPlan: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    avvisDialog: PropTypes.func,
    rootUrlPlaner: PropTypes.string,
};

export default MottattGodkjenninger;
