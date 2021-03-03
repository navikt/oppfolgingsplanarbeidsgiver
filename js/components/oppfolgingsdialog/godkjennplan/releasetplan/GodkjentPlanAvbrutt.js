import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import { toDateMedMaanedNavn } from '../../../../utils/datoUtils';
import {
    finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt,
    finnSistEndretAvNavn,
} from '../../../../utils/oppfolgingsplanUtils';
import GodkjentPlanAvbruttTidspunkt from './GodkjentPlanAvbruttTidspunkt';
import GodkjentPlanDelKnapper, { isGodkjentPlanDelKnapperAvailable } from './GodkjentPlanDelKnapper';
import PlanEkspanderbar from '../PlanEkspanderbar';
import {
    delMedFastlegePt,
    delmednavPt,
    oppfolgingsplanPt,
} from '../../../../proptypes/opproptypes';
import GodkjentPlanDeltBekreftelse from './GodkjentPlanDeltBekreftelse';
import { ButtonDownload } from './GodkjentPlanHandlingKnapper';

const texts = {
    linkActivePlan: 'Tilbake til den gjeldende utgave',
    title: 'Tidligere oppfølgingsplan',
};

const textChangeBy = (personName, date) => {
    return `Denne oppfølgingsplanen ble åpnet for endring av ${personName} ${date}`;
};

class GodkjentPlanAvbrutt extends Component {
    render() {
        const {
            oppfolgingsdialog,
            oppfolgingsdialoger,
            delmednav,
            delMedNavFunc,
            fastlegeDeling,
            delMedFastlege,
            rootUrl,
            rootUrlPlaner,
        } = this.props;
        const aktivPlan = finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(oppfolgingsdialoger, oppfolgingsdialog.virksomhet.virksomhetsnummer);
        return (
            <div className="godkjentPlanAvbrutt">
                <div className="godkjentPlanAvbrutt_lenke">
                    { aktivPlan &&
                    <a
                        className="lenke"
                        href={`${rootUrlPlaner}/oppfolgingsplaner/${aktivPlan.id}`}>
                        {texts.linkActivePlan}
                    </a>
                    }
                </div>
                <OppfolgingsplanInnholdboks
                    svgUrl={`${rootUrl}/img/svg/plan-avbrutt.svg`}
                    svgAlt=""
                    tittel={texts.title}
                >
                    <div className="godkjentPlanAvbrutt">
                        <GodkjentPlanAvbruttTidspunkt
                            rootUrl={rootUrl}
                            oppfolgingsdialog={oppfolgingsdialog}
                            gyldighetstidspunkt={oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt}
                        />
                        <GodkjentPlanDeltBekreftelse
                            oppfolgingsplan={oppfolgingsdialog}
                        />
                        <p>
                            {textChangeBy(finnSistEndretAvNavn(oppfolgingsdialog), toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.avbruttPlan.tidspunkt))}
                        </p>
                        <PlanEkspanderbar
                            oppfolgingsplan={oppfolgingsdialog}
                        />
                        {isGodkjentPlanDelKnapperAvailable(oppfolgingsdialog) && <GodkjentPlanDelKnapper
                            className="godkjentPlanAvbruttDelKnapper"
                            oppfolgingsplan={oppfolgingsdialog}
                            delmednav={delmednav}
                            delMedNavFunc={delMedNavFunc}
                            fastlegeDeling={fastlegeDeling}
                            delMedFastlege={delMedFastlege}
                        />
                        }
                        <div className="knapperad knapperad--justervenstre">
                            <ButtonDownload
                                oppfolgingsplan={oppfolgingsdialog}
                            />
                        </div>
                    </div>
                </OppfolgingsplanInnholdboks>
            </div>
        );
    }
}

GodkjentPlanAvbrutt.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
    delmednav: delmednavPt,
    delMedNavFunc: PropTypes.func,
    fastlegeDeling: delMedFastlegePt,
    delMedFastlege: PropTypes.func,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
};

export default GodkjentPlanAvbrutt;
