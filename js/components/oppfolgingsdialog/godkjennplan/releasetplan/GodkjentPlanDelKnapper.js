import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { toDateMedMaanedNavn } from '../../../../utils/datoUtils';
import {
    delMedFastlegePt,
    delmednavPt,
    oppfolgingsdialogPt,
} from '../../../../proptypes/opproptypes';
import { hentSyfoapiUrl } from '../../../../gateway-api';
import { API_NAVN } from '../../../../gateway-api/gatewayApi';

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

const textSharedWithNAV = (date) => {
    return `Planen ble delt med NAV ${date}`;
};

const textSharedWitFastlege = (date) => {
    return `Planen ble delt med fastlegen ${date}`;
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

const GodkjentPlanDelKnapper = (
    {
        className,
        oppfolgingsdialog,
        delmednav,
        delMedNavFunc,
        fastlegeDeling,
        delMedFastlege,
    }) => {
    return (<div className={`godkjentPlanDelKnapper ${className}`}>

        { (delingFeiletNav(delmednav) || delingFeiletFastlege(fastlegeDeling)) &&
        <Alertstripe
            className="alertstripe--notifikasjonboks"
            type="advarsel"
            fylt>
            {textSharePlanFailed(delmednav)}
        </Alertstripe>
        }
        { oppfolgingsdialog.godkjentPlan.deltMedNAV && oppfolgingsdialog.godkjentPlan.deltMedNAVTidspunkt && <p>
            {textSharedWithNAV(toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.deltMedNAVTidspunkt))}
        </p>
        }
        { oppfolgingsdialog.godkjentPlan.deltMedFastlege && oppfolgingsdialog.godkjentPlan.deltMedFastlegeTidspunkt && <p>
            {textSharedWitFastlege(toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.deltMedFastlegeTidspunkt))}
        </p>
        }
        <div className="knapperad knapperad--justervenstre">
            <div className="knapperad__element">
                <Hovedknapp
                    mini
                    disabled={fastlegeDeling.sender}
                    onClick={() => {
                        delMedFastlege(oppfolgingsdialog.id, oppfolgingsdialog.arbeidstaker.fnr);
                    }}>
                    {texts.buttonShareWithFastlege}
                </Hovedknapp>
            </div>
            { !oppfolgingsdialog.godkjentPlan.deltMedNAV &&
            <div className="knapperad__element">
                <Knapp
                    mini
                    disabled={delmednav.sender}
                    onClick={() => {
                        delMedNavFunc(oppfolgingsdialog.id, oppfolgingsdialog.arbeidstaker.fnr);
                    }}>
                    {texts.buttonShareWithNAV}
                </Knapp>
            </div>
            }
            <div className="knapperad__element godkjentPlanDelKnapper__lastNed">
                <a
                    href={`${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/dokument/${oppfolgingsdialog.id}/`}
                    download="oppfølgingsplan"
                >
                    {texts.buttonDownload}
                </a>
            </div>
        </div>
    </div>);
};

GodkjentPlanDelKnapper.propTypes = {
    className: PropTypes.string,
    oppfolgingsdialog: oppfolgingsdialogPt,
    delmednav: delmednavPt,
    fastlegeDeling: delMedFastlegePt,
    delMedNavFunc: PropTypes.func,
    delMedFastlege: PropTypes.func,
};

export default GodkjentPlanDelKnapper;
