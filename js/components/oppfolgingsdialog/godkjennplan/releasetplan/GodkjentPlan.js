import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fareknapp } from 'nav-frontend-knapper';
import { textBothApprovedOppfolgingsplan } from '../../../../utils/tekstUtils';
import {
    delMedFastlegePt,
    delmednavPt,
    oppfolgingsplanPt,
} from '../../../../proptypes/opproptypes';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import Lightbox from '../../../Lightbox';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import GodkjentPlanHandlingKnapper from './GodkjentPlanHandlingKnapper';
import GodkjentPlanDelKnapper, { isGodkjentPlanDelKnapperAvailable } from './GodkjentPlanDelKnapper';
import GodkjentPlanDeltBekreftelse from './GodkjentPlanDeltBekreftelse';
import BildeTekstLinje from '../../../app/BildeTekstLinje';
import TextForcedApprovedOppfolgingsplan from './TextForcedApprovedOppfolgingsplan';
import PlanEkspanderbar from '../PlanEkspanderbar';

const texts = {
    godkjentPlan: {
        title: 'Oppfølgingsplanen',
    },
    godkjentPlanUtvidbar: {
        title: 'Se planen',
        requestFeilet: 'Beklager, vi kunne ikke hente dokumentet på dette tidspunktet. Prøv igjen senere!',
    },
    avbrytPlanBekreftelse: {
        title: 'Ønsker du å endre planen?',
        info: 'Hvis du endrer planen, må du sende den til godkjenning hos den andre. Etter godkjenning blir den en gjeldende plan.',
        button: 'Gjør endringer',
    },
    tvungenGodkjenning: 'Du har ferdigstilt planen uten godkjenning fra',
};

const tvungenGodkjenningText = (arbeidstakerNavn) => {
    return `${texts.tvungenGodkjenning} ${arbeidstakerNavn}`;
};

export const AvbrytPlanBekreftelse = ({ oppfolgingsplan, avbrytDialog }) => {
    return (
        <div className="avbrytPlanBekreftelse">
            <h3 className="panel__tittel">{texts.avbrytPlanBekreftelse.title}</h3>
            <p>{texts.avbrytPlanBekreftelse.info}</p>
            <div className="knapperad">
                <Fareknapp onClick={() => { avbrytDialog(oppfolgingsplan.id); }}>
                    {texts.avbrytPlanBekreftelse.button}
                </Fareknapp>
            </div>
        </div>
    );
};
AvbrytPlanBekreftelse.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    avbrytDialog: PropTypes.func,
};

class GodkjentPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visBekreftelse: false,
        };
        this.apneBekreftelse = this.apneBekreftelse.bind(this);
        this.lukkBekreftelse = this.lukkBekreftelse.bind(this);
    }

    apneBekreftelse() {
        this.setState({ visBekreftelse: true });
    }

    lukkBekreftelse() {
        this.setState({ visBekreftelse: false });
    }

    render() {
        const {
            oppfolgingsplan,
            avbrytDialog,
            rootUrl,
            rootUrlPlaner,
            delMedNavFunc,
            delmednav,
            fastlegeDeling,
            delMedFastlege,
        } = this.props;
        const godkjentPlan = oppfolgingsplan.godkjentPlan;
        const arbeidstakerNavn = oppfolgingsplan.arbeidstaker.navn;

        return (
            <React.Fragment>
                <OppfolgingsplanInnholdboks
                    classnames="godkjentPlanOppfolgingsplanInfoboks"
                    svgUrl={`${rootUrl}/img/svg/hake-groenn--lys.svg`}
                    svgAlt=""
                    tittel={texts.godkjentPlan.title}
                    mediumIcon
                >
                    <div>
                        {
                            this.state.visBekreftelse && <Lightbox lukkLightbox={this.lukkBekreftelse}>
                                <AvbrytPlanBekreftelse
                                    oppfolgingsplan={oppfolgingsplan}
                                    avbrytDialog={avbrytDialog}
                                />
                            </Lightbox>
                        }

                        { !godkjentPlan.tvungenGodkjenning && <p>{textBothApprovedOppfolgingsplan(arbeidstakerNavn)}</p> }
                        { godkjentPlan.tvungenGodkjenning &&
                            <TextForcedApprovedOppfolgingsplan
                                rootUrl={rootUrl}
                                text={tvungenGodkjenningText(arbeidstakerNavn)}
                            />
                        }
                        <GodkjennPlanTidspunkt
                            gyldighetstidspunkt={oppfolgingsplan.godkjentPlan.gyldighetstidspunkt}
                        />

                        <GodkjentPlanDeltBekreftelse
                            oppfolgingsplan={oppfolgingsplan}
                        />

                        <PlanEkspanderbar
                            oppfolgingsplan={oppfolgingsplan}
                        />
                        {isGodkjentPlanDelKnapperAvailable(oppfolgingsplan) && <GodkjentPlanDelKnapper
                            oppfolgingsplan={oppfolgingsplan}
                            delmednav={delmednav}
                            delMedNavFunc={delMedNavFunc}
                            fastlegeDeling={fastlegeDeling}
                            delMedFastlege={delMedFastlege}
                        />
                        }
                    </div>
                </OppfolgingsplanInnholdboks>
                <GodkjentPlanHandlingKnapper
                    oppfolgingsplan={oppfolgingsplan}
                    apneBekreftelse={this.apneBekreftelse}
                    rootUrlPlaner={rootUrlPlaner}
                />
            </React.Fragment>
        );
    }
}

GodkjentPlan.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    delmednav: delmednavPt,
    delMedNavFunc: PropTypes.func,
    fastlegeDeling: delMedFastlegePt,
    delMedFastlege: PropTypes.func,
    avbrytDialog: PropTypes.func,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
};

export default GodkjentPlan;
