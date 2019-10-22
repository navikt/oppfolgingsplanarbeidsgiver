import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fareknapp } from 'nav-frontend-knapper';
import {
    getLedetekst,
    Utvidbar,
} from 'digisyfo-npm';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import {
    delMedFastlegePt,
    delmednavPt,
    dokumentReducerPt,
    oppfolgingsdialogPt,
} from '../../../../proptypes/opproptypes';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import Lightbox from '../../../Lightbox';
import GodkjentPlanKnapper from './GodkjentPlanKnapper';

export const GodkjentPlanUtvidbar = ({ dokument }) => {
    let panel;
    if (dokument.henter) {
        panel = <div className="app-spinner" aria-label="Vent litt mens siden laster" />;
    } else if (dokument.hentingFeilet) {
        panel = (<div className="godkjentPlanPdf__feilmelding">
            {getLedetekst('oppfolgingsdialog.godkjentplan.utvidbar.feilmelding')}
        </div>);
    } else {
        panel = dokument.data && dokument.data.map((url, idx) => {
            return (<div key={idx} className="godkjentPlanPdf__dokument">
                <img className="godkjentPlanPdf__side" src={url} alt="godkjentplan" type="application/pdf" />
            </div>);
        });
    }
    return (
        <Utvidbar className="utvidbar--oppfolgingsplan" tittel={getLedetekst('oppfolgingsdialog.arbeidsgiver.godkjennplan.godkjent.utvidbar.tittel')}>
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
            <h3 className="panel__tittel">{getLedetekst('oppfolgingsdialog.avbrytPlanBekreftelse.tittel')}</h3>
            <p>{getLedetekst('oppfolgingsdialog.avbrytPlanBekreftelse.tekst')}</p>
            <div className="knapperad">
                <Fareknapp onClick={() => { avbrytDialog(oppfolgingsdialog.id); }}>
                    {getLedetekst('oppfolgingsdialog.avbrytPlanBekreftelse.knapp.tekst')}
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
        const infoboksTittelNokkel = 'oppfolgingsdialog.arbeidsgiver.godkjennplan.godkjent.infoboks.tittel';
        const infoboksTekst = getLedetekst('oppfolgingsdialog.arbeidsgiver.godkjennplan.godkjent.infoboks.tekst', {
            '%ARBEIDSTAKER%': oppfolgingsdialog.arbeidstaker.navn,
        });
        const godkjentPlan = oppfolgingsdialog.godkjentPlan;

        return (
            <OppfolgingsplanInnholdboks
                svgUrl={`${rootUrl}/img/svg/plan-godkjent.svg`}
                svgAlt="godkjent"
                tittel={getLedetekst(infoboksTittelNokkel)}
            >
                <div className="godkjentPlan">
                    {
                        this.state.visBekreftelse && <Lightbox lukkLightbox={this.lukkBekreftelse}>
                            <AvbrytPlanBekreftelse
                                oppfolgingsdialog={oppfolgingsdialog}
                                avbrytDialog={avbrytDialog}
                            />
                        </Lightbox>
                    }

                    { !godkjentPlan.tvungenGodkjenning && <p>{infoboksTekst}</p> }

                    <GodkjennPlanTidspunkt
                        rootUrl={rootUrl}
                        gyldighetstidspunkt={oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt}
                    />
                    <GodkjentPlanUtvidbar
                        dokument={dokument}
                    />
                    <GodkjentPlanKnapper
                        oppfolgingsdialog={oppfolgingsdialog}
                        apneBekreftelse={this.apneBekreftelse}
                        delmednav={delmednav}
                        delMedNavFunc={delMedNavFunc}
                        fastlegeDeling={fastlegeDeling}
                        delMedFastlege={delMedFastlege}
                        rootUrlPlaner={rootUrlPlaner}
                    />
                </div>
            </OppfolgingsplanInnholdboks>
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
