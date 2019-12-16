import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Utvidbar } from '@navikt/digisyfo-npm';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import { toDateMedMaanedNavn } from '../../../../utils/datoUtils';
import {
    finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt,
    finnSistEndretAvNavn,
} from '../../../../utils/oppfolgingsplanUtils';
import GodkjentPlanAvbruttTidspunkt from './GodkjentPlanAvbruttTidspunkt';
import GodkjentPlanDelKnapper, { isGodkjentPlanDelKnapperAvailable } from './GodkjentPlanDelKnapper';
import {
    delMedFastlegePt,
    delmednavPt,
    dokumentReducerPt,
    oppfolgingsdialogPt,
} from '../../../../proptypes/opproptypes';
import GodkjentPlanDeltBekreftelse from './GodkjentPlanDeltBekreftelse';
import { ButtonDownload } from './GodkjentPlanHandlingKnapper';

const texts = {
    godkjentPlanAvbrutt: {
        linkActivePlan: 'Tilbake til den gjeldende utgave',
        title: 'Tidligere oppfølgingsplan',
    },
    godkjentPlanUtvidbar: {
        getDokumentFailed: 'Beklager, vi kunne ikke hente dokumentet på dette tidspunktet. Prøv igjen senere!',
        utvidbarTitle: 'Se planen',
    },
};

const textChangeBy = (personName, date) => {
    return `Denne oppfølgingsplanen ble åpnet for endring av ${personName} ${date}`;
};

export const GodkjentPlanUtvidbar = ({ dokument }) => {
    let panel;

    if (dokument.henter) {
        panel = <div className="app-spinner" aria-label="Vent litt mens siden laster" />;
    } else if (dokument.hentingFeilet) {
        panel = (<div className="godkjentPlanPdf__feilmelding">
            {texts.godkjentPlanUtvidbar.getDokumentFailed}
        </div>);
    } else {
        panel = dokument.data && dokument.data.map((url, idx) => {
            return (<div key={idx} className="godkjentPlanPdf__dokument">
                <img className="godkjentPlanPdf__side" src={url} alt="godkjentplan" type="application/pdf" />
            </div>);
        });
    }
    return (
        <Utvidbar className="utvidbar--oppfolgingsplan" tittel={texts.godkjentPlanUtvidbar.utvidbarTitle}>
            <div className="godkjentPlanPdf">
                { panel }
            </div>
        </Utvidbar>
    );
};
GodkjentPlanUtvidbar.propTypes = {
    dokument: dokumentReducerPt,
};

class GodkjentPlanAvbrutt extends Component {
    componentWillMount() {
        if ((!this.props.dokument.hentet && !this.props.dokument.henter) || this.props.dokument.id !== this.props.oppfolgingsdialog.id) {
            this.props.hentPdfurler(this.props.oppfolgingsdialog.id, 1);
        }
    }

    render() {
        const {
            oppfolgingsdialog,
            oppfolgingsdialoger,
            dokument,
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
                        {texts.godkjentPlanAvbrutt.linkActivePlan}
                    </a>
                    }
                </div>
                <OppfolgingsplanInnholdboks
                    svgUrl={`${rootUrl}/img/svg/plan-avbrutt.svg`}
                    svgAlt="avbrutt"
                    tittel={texts.godkjentPlanAvbrutt.title}
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
                        <GodkjentPlanUtvidbar
                            dokument={dokument}
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
    oppfolgingsdialog: oppfolgingsdialogPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsdialogPt),
    delmednav: delmednavPt,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
    dokument: dokumentReducerPt,
    delMedNavFunc: PropTypes.func,
    fastlegeDeling: delMedFastlegePt,
    delMedFastlege: PropTypes.func,
    hentPdfurler: PropTypes.func,
};

export default GodkjentPlanAvbrutt;
