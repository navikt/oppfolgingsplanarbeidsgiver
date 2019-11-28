import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fareknapp, Hovedknapp } from 'nav-frontend-knapper';
import { oppfolgingsdialogPt } from '../../proptypes/opproptypes';
import Lightbox from '../Lightbox';
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';
import { getContextRoot } from '../../routers/paths';

const texts = {
    avkreftNyNaermestelederBekreftelse: {
        title: 'Jeg er ikke denne personens leder',
        buttonConfirm: 'Ja, jeg er sikker',
    },
    nyNaermestelederInfoboks: {
        buttonConfirm: 'Start oppfølgingen',
        buttonWrongLeader: 'Meld feil',
    },
};

const TextWrongLeader = ({ oppfolgingsplan }) => {
    return (
        <React.Fragment>
            Er du sikker på at du vil fjerne din status som nærmeste leder for <b>{oppfolgingsplan.arbeidstaker.navn}</b>?
        </React.Fragment>
    );
};

TextWrongLeader.propTypes = {
    oppfolgingsplan: oppfolgingsdialogPt,
};

const textTitle = (sykmeldtName) => {
    return `Velkommen til oppfølgingen av ${sykmeldtName}`;
};

const textInfo = (sykmeldtName) => {
    return `
        Som ny leder med personalansvar vil du kunne se oppfølgingsplaner som ${sykmeldtName} har laget sammen med sin forrige leder.
        Du vil kunne fortsette på de planene som fortsatt gjelder, og det du gjør vil da bli merket med ditt navn.
    `;
};

export const AvkreftNyNaermestelederBekreftelse = (
    {
        oppfolgingsdialog,
        fjernNaermesteLederKobling,
        lukk,
    }) => {
    return (<Lightbox lukkLightbox={lukk}>
        <div>
            <h3>{texts.avkreftNyNaermestelederBekreftelse.title}</h3>
            <p>
                <TextWrongLeader
                    oppfolgingsplan={oppfolgingsdialog}
                />
            </p>
            <div className="knapperad" onClick={fjernNaermesteLederKobling} role="button" tabIndex={0}>
                <Fareknapp>
                    {texts.avkreftNyNaermestelederBekreftelse.buttonConfirm}
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
        return (<div className="nyNaermestelederInfoboks">
            { this.state.visBekreftelse &&
            <AvkreftNyNaermestelederBekreftelse
                oppfolgingsdialog={oppfolgingsdialog}
                fjernNaermesteLederKobling={this.fjernNaermesteLederKobling}
                lukk={this.lukkBekreftelse}
            />
            }
            <OppfolgingsplanInfoboks
                tittel={textTitle(oppfolgingsdialog.arbeidstaker.navn)}
                svgUrl={`${getContextRoot()}/img/svg/ny-naermesteleder.svg`}
                svgAlt="Ny nærmeste leder"
            >
                <p>
                    {textInfo(oppfolgingsdialog.arbeidstaker.navn)}
                </p>
                <div className="knapperad">
                    <div className="knapperad__element">
                        <Hovedknapp onClick={() => { bekreftNyNaermesteLeder(); }}>
                            {texts.nyNaermestelederInfoboks.buttonConfirm}
                        </Hovedknapp>
                    </div>
                    <div className="knapperad__element">
                        <button
                            className="lenke"
                            onClick={() => { this.apneBekreftelse(); }}>
                            {texts.nyNaermestelederInfoboks.buttonWrongLeader}
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
