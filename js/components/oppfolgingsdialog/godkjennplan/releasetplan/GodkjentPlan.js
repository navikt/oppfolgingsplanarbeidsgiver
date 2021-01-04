import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fareknapp } from 'nav-frontend-knapper';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import {
    delMedFastlegePt,
    delmednavPt,
    dokumentReducerPt,
    oppfolgingsplanPt,
} from '../../../../proptypes/opproptypes';
import Lightbox from '../../../Lightbox';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import GodkjentPlanHandlingKnapper from './GodkjentPlanHandlingKnapper';
import GodkjentPlanDelKnapper, { isGodkjentPlanDelKnapperAvailable } from './GodkjentPlanDelKnapper';
import GodkjentPlanDeltBekreftelse from './GodkjentPlanDeltBekreftelse';
import BildeTekstLinje from '../../../app/BildeTekstLinje';
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
    tvungenGodkjenning: {
        info: 'Du har ferdigstilt planen uten godkjenning fra',
    },
};

const textBothApprovedOppfolgingsplan = (arbeidstakerName) => {
    return `Denne versjonen av planen er godkjent av ${arbeidstakerName} og deg.`;
};

export const TextForcedApprovedOppfolgingsplan = ({ rootUrl, oppfolgingsplan }) => {
    return (
        <BildeTekstLinje
            imgUrl={`${rootUrl}/img/svg/report-problem-circle.svg`}
            imgAlt=""
            tekst={`${texts.tvungenGodkjenning.info} ${oppfolgingsplan.arbeidstaker.navn}`}
        />
    );
};
TextForcedApprovedOppfolgingsplan.propTypes = {
    rootUrl: PropTypes.string,
    oppfolgingsplan: oppfolgingsplanPt,
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

    componentWillMount() {
        if ((!this.props.dokument.hentet && !this.props.dokument.henter) || this.props.dokument.id !== this.props.oppfolgingsplan.id) {
            this.props.hentPdfurler(this.props.oppfolgingsplan.id, 1);
        }
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

        return (
            <React.Fragment>
                <OppfolgingsplanInnholdboks
                    classnames="godkjentPlanOppfolgingsplanInfoboks"
                    svgUrl={`${rootUrl}/img/svg/hake-groenn--lys.svg`}
                    svgAlt="godkjent"
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

                        { !godkjentPlan.tvungenGodkjenning && <p>{textBothApprovedOppfolgingsplan(oppfolgingsplan.arbeidstaker.navn)}</p> }
                        { godkjentPlan.tvungenGodkjenning &&
                            <TextForcedApprovedOppfolgingsplan
                                rootUrl={rootUrl}
                                oppfolgingsplan={oppfolgingsplan}
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
    fastlegeDeling: delMedFastlegePt,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
    dokument: dokumentReducerPt,
    delMedNavFunc: PropTypes.func,
    delMedFastlege: PropTypes.func,
    hentPdfurler: PropTypes.func,
    avbrytDialog: PropTypes.func,
};

export default GodkjentPlan;
