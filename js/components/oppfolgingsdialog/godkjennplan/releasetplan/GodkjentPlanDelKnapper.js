import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import {
    delMedFastlegePt,
    delmednavPt,
    oppfolgingsplanPt,
} from '../../../../proptypes/opproptypes';

const texts = {
    shareWithNAVError: 'Noe gikk feil da du prøvde å dele planen. Prøv igjen om litt.',
    shareWithFastlegeError: `
        Du får dessverre ikke delt denne planen med legen herfra. Det kan hende legen ikke kan ta imot elektroniske meldinger.
        I dette tilfellet må dere laste ned og skrive ut planen slik at dere får delt den med legen manuelt.   
    `,
    buttonShareWithNAV: 'Del med NAV',
    buttonShareWithFastlege: 'Del med fastlegen',
    buttonDownload: 'Last ned',
};

export const delingFeiletNav = (delmednav) => {
    return delmednav.sendingFeilet;
};

export const delingFeiletFastlege = (fastlegeDeling) => {
    return fastlegeDeling.sendingFeilet;
};

export const textSharePlanFailed = (delmednav) => {
    if (delingFeiletNav(delmednav)) {
        return texts.shareWithNAVError;
    }
    return texts.shareWithFastlegeError;
};

export const isGodkjentPlanDelKnapperAvailable = (oppfolgingsplan) => {
    return !(oppfolgingsplan.godkjentPlan.deltMedFastlege && oppfolgingsplan.godkjentPlan.deltMedNAV);
};

const GodkjentPlanDelKnapper = (
    {
        className = '',
        oppfolgingsplan,
        delmednav,
        delMedNavFunc,
        fastlegeDeling,
        delMedFastlege,
    }) => {
    return (<div className={`godkjentPlanDelKnapper ${className}`}>
        <div className="knapperad knapperad--justervenstre">
            {!oppfolgingsplan.godkjentPlan.deltMedFastlege &&
            <div className="knapperad__element">
                <Knapp
                    mini
                    disabled={fastlegeDeling.sender}
                    onClick={() => {
                        delMedFastlege(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
                    }}>
                    {texts.buttonShareWithFastlege}
                </Knapp>
            </div>
            }
            { !oppfolgingsplan.godkjentPlan.deltMedNAV &&
            <div className="knapperad__element">
                <Knapp
                    mini
                    disabled={delmednav.sender}
                    onClick={() => {
                        delMedNavFunc(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
                    }}>
                    {texts.buttonShareWithNAV}
                </Knapp>
            </div>
            }
        </div>
        { (delingFeiletNav(delmednav) || delingFeiletFastlege(fastlegeDeling)) &&
        <Alertstripe
            className="alertstripe--notifikasjonboks"
            type="advarsel"
            fylt>
            {textSharePlanFailed(delmednav)}
        </Alertstripe>
        }
    </div>);
};

GodkjentPlanDelKnapper.propTypes = {
    className: PropTypes.string,
    oppfolgingsplan: oppfolgingsplanPt,
    delmednav: delmednavPt,
    fastlegeDeling: delMedFastlegePt,
    delMedNavFunc: PropTypes.func,
    delMedFastlege: PropTypes.func,
};

export default GodkjentPlanDelKnapper;
