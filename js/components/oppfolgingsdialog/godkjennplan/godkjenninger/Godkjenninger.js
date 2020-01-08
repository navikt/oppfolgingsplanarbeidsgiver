import React from 'react';
import PropTypes from 'prop-types';
import MottattGodkjenninger from './MottattGodkjenninger';
import GodkjennPlanSendt from './GodkjennPlanSendt';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';

const harMottattGodkjenninger = (oppfolgingsplan) => {
    const godkjenninger = oppfolgingsplan.godkjenninger;
    const aktoer = oppfolgingsplan.arbeidsgiver.naermesteLeder;
    return godkjenninger.length > 0 && godkjenninger[0].godkjentAv.fnr && godkjenninger[0].godkjentAv.fnr !== aktoer.fnr;
};

const Godkjenninger = (
    {
        oppfolgingsplan,
        godkjennPlan,
        nullstillGodkjenning,
        avvisDialog,
        rootUrlPlaner,
    }) => {
    if (harMottattGodkjenninger(oppfolgingsplan)) {
        return (<MottattGodkjenninger
            oppfolgingsplan={oppfolgingsplan}
            godkjennPlan={godkjennPlan}
            nullstillGodkjenning={nullstillGodkjenning}
            avvisDialog={avvisDialog}
        />);
    }
    return (<GodkjennPlanSendt
        oppfolgingsplan={oppfolgingsplan}
        nullstillGodkjenning={nullstillGodkjenning}
        rootUrlPlaner={rootUrlPlaner}
    />);
};


Godkjenninger.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    avvisDialog: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    godkjennPlan: PropTypes.func,
    rootUrlPlaner: PropTypes.string,
};

export default Godkjenninger;
