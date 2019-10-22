import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { getLedetekst } from 'digisyfo-npm';
import { toDateMedMaanedNavn } from '../../../../utils/datoUtils';
import {
    delMedFastlegePt,
    delmednavPt,
    oppfolgingsdialogPt,
} from '../../../../proptypes/opproptypes';
import { hentSyfoapiUrl } from '../../../../gateway-api';
import { API_NAVN } from '../../../../gateway-api/gatewayApi';

export const delingFeiletNav = (delmednav) => {
    return delmednav.sendingFeilet;
};

export const delingFeiletFastlege = (fastlegeDeling) => {
    return fastlegeDeling.sendingFeilet;
};

export const hentLedetekstDeltPlanFeilet = (delmednav) => {
    if (delingFeiletNav(delmednav)) {
        return 'oppfolgingsdialog.godkjentPlan.delingFeilet';
    }
    return 'oppfolgingsdialog.godkjentPlan.delingFeiletFastlegeArbeidsgiver';
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
            {getLedetekst(hentLedetekstDeltPlanFeilet(delmednav))}
        </Alertstripe>
        }
        { oppfolgingsdialog.godkjentPlan.deltMedNAV && <p>
            {getLedetekst('oppfolgingsdialog.godkjentPlan.deling.delt-med-nav.tekst', {
                '%TIDSPUNKT%': oppfolgingsdialog.godkjentPlan.deltMedNAVTidspunkt && toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.deltMedNAVTidspunkt),
            })}
        </p>
        }
        { oppfolgingsdialog.godkjentPlan.deltMedFastlege && <p>
            {getLedetekst('oppfolgingsdialog.godkjentPlan.deling.delt-med-fastlege.tekst', {
                '%TIDSPUNKT%': oppfolgingsdialog.godkjentPlan.deltMedFastlegeTidspunkt && toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.deltMedFastlegeTidspunkt),
            })}
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
                    {getLedetekst('oppfolgingsdialog.knapp.del-plan-fastlege')}
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
                    {getLedetekst('oppfolgingsdialog.knapp.del-plan-nav')}
                </Knapp>
            </div>
            }
            <div className="knapperad__element godkjentPlanDelKnapper__lastNed">
                <a
                    href={`${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/dokument/${oppfolgingsdialog.id}/`}
                    download="oppfølgingsplan"
                >
                    {getLedetekst('oppfolgingsdialog.knapp.last-ned')}
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
