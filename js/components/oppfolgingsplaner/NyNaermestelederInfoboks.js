import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fareknapp, Hovedknapp } from 'nav-frontend-knapper';
import {
    getLedetekst,
    getHtmlLedetekst,
} from 'digisyfo-npm';
import { oppfolgingsdialogPt } from '../../proptypes/opproptypes';
import Lightbox from '../Lightbox';
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';
import { getContextRoot } from '../../routers/paths';

export const AvkreftNyNaermestelederBekreftelse = (
    {
        oppfolgingsdialog,
        fjernNaermesteLederKobling,
        lukk,
    }) => {
    const tittel = getLedetekst('oppfolgingsdialog.nyNaermestelederInfoboks.arbeidsgiver.bekreftelse.tittel');
    const tekst = getHtmlLedetekst('oppfolgingsdialog.nyNaermestelederInfoboks.arbeidsgiver.bekreftelse.tekst', {
        '%SYKMELDT%': oppfolgingsdialog.arbeidstaker.navn,
    });
    return (<Lightbox lukkLightbox={lukk}>
        <div>
            <h3>{tittel}</h3>
            <p dangerouslySetInnerHTML={tekst} />
            <div className="knapperad" onClick={fjernNaermesteLederKobling} role="button" tabIndex={0}>
                <Fareknapp>
                    {getLedetekst('oppfolgingsdialog.knapp.sikker')}
                </Fareknapp>
            </div>
        </div>
    </Lightbox>);
};
AvkreftNyNaermestelederBekreftelse.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    fjernNaermesteLederKobling: PropTypes.func,
    lukk: PropTypes.func,
};

class NyNaermestelederInfoboks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visBekreftelse: false,
        };
        this.apneBekreftelse = this.apneBekreftelse.bind(this);
        this.lukkBekreftelse = this.lukkBekreftelse.bind(this);
        this.fjernNaermesteLederKobling = this.fjernNaermesteLederKobling.bind(this);
    }

    apneBekreftelse() {
        this.setState({ visBekreftelse: true });
    }

    lukkBekreftelse() {
        this.setState({ visBekreftelse: false });
    }

    fjernNaermesteLederKobling() {
        const oppfolgingsdialog = this.props.oppfolgingsdialog;
        this.props.avkreftNyNaermesteleder(
            oppfolgingsdialog.arbeidstaker.fnr,
            oppfolgingsdialog.virksomhet.virksomhetsnummer,
        );
    }

    render() {
        const { oppfolgingsdialog, bekreftNyNaermesteLeder } = this.props;
        const tittel = getLedetekst('oppfolgingsdialog.nyNaermestelederInfoboks.arbeidsgiver.tittel', {
            '%SYKMELDT%': oppfolgingsdialog.arbeidstaker.navn,
        });
        const tekst = getHtmlLedetekst('oppfolgingsdialog.nyNaermestelederInfoboks.arbeidsgiver.tekst', {
            '%SYKMELDT%': oppfolgingsdialog.arbeidstaker.navn,
        });
        const bekreftKnappTekst = getLedetekst('oppfolgingsdialog.knapp.start-oppfolgingen');
        return (<div className="nyNaermestelederInfoboks">
            { this.state.visBekreftelse &&
            <AvkreftNyNaermestelederBekreftelse
                oppfolgingsdialog={oppfolgingsdialog}
                fjernNaermesteLederKobling={this.fjernNaermesteLederKobling}
                lukk={this.lukkBekreftelse}
            />
            }
            <OppfolgingsplanInfoboks
                tittel={tittel}
                svgUrl={`${getContextRoot()}/img/svg/ny-naermesteleder.svg`}
                svgAlt="Ny nærmeste leder"
            >
                <p dangerouslySetInnerHTML={tekst} />
                <div className="knapperad">
                    <div className="knapperad__element">
                        <Hovedknapp onClick={() => { bekreftNyNaermesteLeder(); }}>
                            {bekreftKnappTekst}
                        </Hovedknapp>
                    </div>
                    <div className="knapperad__element">
                        <button
                            className="lenke"
                            onClick={() => { this.apneBekreftelse(); }}>
                            {getLedetekst('oppfolgingsdialog.knapp.meld-feil')}
                        </button>
                    </div>
                </div>
            </OppfolgingsplanInfoboks>
        </div>);
    }
}

NyNaermestelederInfoboks.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    avkreftNyNaermesteleder: PropTypes.func,
    bekreftNyNaermesteLeder: PropTypes.func,
};

export default NyNaermestelederInfoboks;
