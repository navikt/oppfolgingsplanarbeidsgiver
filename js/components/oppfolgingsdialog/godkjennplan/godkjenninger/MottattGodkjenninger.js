import React from 'react';
import PropTypes from 'prop-types';
import GodkjennPlanMottatt from './GodkjennPlanMottatt';
import GodkjennPlanAvslaatt from './GodkjennPlanAvslaatt';
import GodkjennPlanAvslaattOgGodkjent from './GodkjennPlanAvslaattOgGodkjent';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';

const harMangeGodkjenninger = (godkjenninger) => {
    return godkjenninger.length > 1;
};

const MottattGodkjenninger = (
    {
        oppfolgingsplan,
        godkjennPlan,
        nullstillGodkjenning,
        avvisDialog,
        rootUrlPlaner,
    }) => {
    if (harMangeGodkjenninger(oppfolgingsplan.godkjenninger)) {
        return (<GodkjennPlanAvslaattOgGodkjent
            avvisDialog={avvisDialog}
            godkjennPlan={godkjennPlan}
            oppfolgingsplan={oppfolgingsplan}
        />);
    }

    const godkjenning = oppfolgingsplan.godkjenninger[0];
    if (godkjenning.godkjent) {
        return (<GodkjennPlanMottatt
            avvisDialog={avvisDialog}
            godkjennPlan={godkjennPlan}
            oppfolgingsplan={oppfolgingsplan}
            rootUrlPlaner={rootUrlPlaner}
        />);
    }
    return (<GodkjennPlanAvslaatt
        nullstillGodkjenning={nullstillGodkjenning}
        oppfolgingsplan={oppfolgingsplan}
    />);
};

MottattGodkjenninger.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    godkjennPlan: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    avvisDialog: PropTypes.func,
    rootUrlPlaner: PropTypes.string,
};

export default MottattGodkjenninger;
