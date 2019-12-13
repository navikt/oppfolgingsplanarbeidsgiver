import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fareknapp } from 'nav-frontend-knapper';
import { Utvidbar } from '@navikt/digisyfo-npm';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import {
    delMedFastlegePt,
    delmednavPt,
    dokumentReducerPt,
    oppfolgingsdialogPt,
} from '../../../../proptypes/opproptypes';
import Lightbox from '../../../Lightbox';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import GodkjentPlanHandlingKnapper from './GodkjentPlanHandlingKnapper';
import GodkjentPlanDelKnapper, { isGodkjentPlanDelKnapperAvailable } from './GodkjentPlanDelKnapper';
import GodkjentPlanDeltBekreftelse from './GodkjentPlanDeltBekreftelse';

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
};

const textBothApprovedOppfolgingsplan = (arbeidstakerName) => {
    return `Denne versjonen av planen er godkjent av ${arbeidstakerName} og deg.`;
};

export const GodkjentPlanUtvidbar = ({ dokument }) => {
    let panel;
    if (dokument.henter) {
        panel = <div className="app-spinner" aria-label="Vent litt mens siden laster" />;
    } else if (dokument.hentingFeilet) {
        panel = (<div className="godkjentPlanPdf__feilmelding">
            {texts.godkjentPlanUtvidbar.requestFeilet}
        </div>);
    } else {
        panel = dokument.data && dokument.data.map((url, idx) => {
            return (<div key={idx} className="godkjentPlanPdf__dokument">
                <img className="godkjentPlanPdf__side" src={url} alt="godkjentplan" type="application/pdf" />
            </div>);
        });
    }
    return (
        <Utvidbar className="utvidbar--oppfolgingsplan" tittel={texts.godkjentPlanUtvidbar.title}>
            <div className="godkjentPlanPdf">
                { panel }
            </div>
        </Utvidbar>
    );
};
GodkjentPlanUtvidbar.propTypes = {
    dokument: dokumentReducerPt,
};
export const AvbrytPlanBekreftelse = ({ oppfolgingsdialog, avbrytDialog }) => {
    return (
        <div className="avbrytPlanBekreftelse">
            <h3 className="panel__tittel">{texts.avbrytPlanBekreftelse.title}</h3>
            <p>{texts.avbrytPlanBekreftelse.info}</p>
            <div className="knapperad">
                <Fareknapp onClick={() => { avbrytDialog(oppfolgingsdialog.id); }}>
                    {texts.avbrytPlanBekreftelse.button}
                </Fareknapp>
            </div>
        </div>
    );
};
AvbrytPlanBekreftelse.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
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
        if ((!this.props.dokument.hentet && !this.props.dokument.henter) || this.props.dokument.id !== this.props.oppfolgingsdialog.id) {
            this.props.hentPdfurler(this.props.oppfolgingsdialog.id, 1);
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
            oppfolgingsdialog,
            avbrytDialog,
            dokument,
            rootUrl,
            rootUrlPlaner,
            delMedNavFunc,
            delmednav,
            fastlegeDeling,
            delMedFastlege,
        } = this.props;
        const godkjentPlan = oppfolgingsdialog.godkjentPlan;

        return (
            <React.Fragment>
                <OppfolgingsplanInnholdboks
                    classnames="godkjentPlanOppfolgingsplanInfoboks"
                    svgUrl={`${rootUrl}/img/svg/plan-godkjent.svg`}
                    svgAlt="godkjent"
                    tittel={texts.godkjentPlan.title}
                >
                    <div>
                        {
                            this.state.visBekreftelse && <Lightbox lukkLightbox={this.lukkBekreftelse}>
                                <AvbrytPlanBekreftelse
                                    oppfolgingsdialog={oppfolgingsdialog}
                                    avbrytDialog={avbrytDialog}
                                />
                            </Lightbox>
                        }

                        { !godkjentPlan.tvungenGodkjenning && <p>{textBothApprovedOppfolgingsplan(oppfolgingsdialog.arbeidstaker.navn)}</p> }

                        <GodkjennPlanTidspunkt
                            rootUrl={rootUrl}
                            gyldighetstidspunkt={oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt}
                        />

                        <GodkjentPlanDeltBekreftelse
                            oppfolgingsplan={oppfolgingsdialog}
                        />

                        <GodkjentPlanUtvidbar
                            dokument={dokument}
                        />
                        {isGodkjentPlanDelKnapperAvailable(oppfolgingsdialog) && <GodkjentPlanDelKnapper
                            oppfolgingsplan={oppfolgingsdialog}
                            delmednav={delmednav}
                            delMedNavFunc={delMedNavFunc}
                            fastlegeDeling={fastlegeDeling}
                            delMedFastlege={delMedFastlege}
                        />
                        }
                    </div>
                </OppfolgingsplanInnholdboks>
                <GodkjentPlanHandlingKnapper
                    oppfolgingsplan={oppfolgingsdialog}
                    apneBekreftelse={this.apneBekreftelse}
                    rootUrlPlaner={rootUrlPlaner}
                />
            </React.Fragment>
        );
    }
}

GodkjentPlan.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
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
