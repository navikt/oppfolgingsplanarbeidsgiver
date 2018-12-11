import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getLedetekst,
    keyValue,
    hentToggles,
    togglesPt,
} from 'digisyfo-npm';
import {
    loggerOppfolgingsdialog,
    OppfolgingsdialogInfoboks,
    kopierOppfolgingsdialog,
    opprettOppfolgingsdialogAg,
    sjekkTilgangAg as sjekkTilgang,
    hentOppfolgingsdialogerAg as hentOppfolgingsdialoger,
    proptypes as oppfolgingProptypes,
    giSamtykke,
    hentNaermesteLeder,
    hentVirksomhet,
    hentPerson,
    hentKontaktinfo,
    bekreftNyNaermesteLeder,
    henterEllerHarHentetTilgang,
    henterEllerHarHentetOppfolgingsdialoger,
    oppfolgingsdialogHarBlittOpprettet,
    populerDialogFraState,
} from 'oppfolgingsdialog-npm';
import {
    sykmeldt as sykmeldtPt,
    brodsmule as brodsmulePt,
    sykmeldteReducerPt,
    sykmeldingerReducerPt,
} from '../shapes';
import {
    forsoektHentetOppfolgingsdialoger,
    forsoektHentetSykmeldte,
    forsoektHentetTilgang,
    henterEllerHarHentetSykmeldinger,
    henterEllerHarHentetToggles,
    sykmeldtHarBlittSlettet,
} from '../utils/reducerUtils';
import { sykmeldtHarGyldigSykmelding } from '../utils/oppfolgingsdialogUtils';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import history from '../history';
import { slettSykmeldt } from '../actions/sykmeldt_actions';
import { hentSykmeldinger } from '../actions/sykmeldinger_actions';
import Oppfolgingsdialoger from '../components/oppfolgingsdialog/Oppfolgingsdialoger';
import { getContextRoot } from '../routers/paths';
import { hentSykmeldteBerikelser as hentSykmeldteBerikelserAction } from '../actions/sykmeldte_actions';
import { beregnSkalHenteSykmeldtBerikelse } from '../utils/sykmeldtUtils';

export const hentHentingFeiletMapTekst = (hentingFeiletMap) => {
    return `
    ledetekster: ${hentingFeiletMap.ledetekster};
    sykmeldte: ${hentingFeiletMap.sykmeldte};
    oppfolgingsdialoger: ${hentingFeiletMap.alleOppfolgingsdialogerReducer};
    tilgang: ${hentingFeiletMap.sykmeldinger};
    sykmeldinger: ${hentingFeiletMap.sykmeldinger};
    `;
};

const hentingFeiletMapPt = PropTypes.shape({
    ledetekster: PropTypes.bool,
    sykmeldte: PropTypes.bool,
    alleOppfolgingsdialogerReducer: PropTypes.bool,
    tilgang: PropTypes.bool,
    sykmeldinger: PropTypes.bool,
});

export class OppfolgingsdialogerSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            harloggetHentingFeilet: false,
        };
        this.opprettdialog = this.opprettdialog.bind(this);
        window.sessionStorage.removeItem('startdato');
        window.sessionStorage.removeItem('sluttdato');
        window.sessionStorage.removeItem('evalueringsdato');
    }

    componentDidMount() {
        const {
            koblingId,
            alleOppfolgingsdialogerReducer,
            sykmeldinger,
            toggles,
        } = this.props;
        if (!henterEllerHarHentetOppfolgingsdialoger(alleOppfolgingsdialogerReducer)) {
            this.props.hentOppfolgingsdialoger();
        }
        if (!henterEllerHarHentetSykmeldinger(sykmeldinger)) {
            this.props.hentSykmeldinger(koblingId);
        }
        if (!henterEllerHarHentetToggles(toggles)) {
            this.props.hentToggles();
        }
        this.berikSykmeldt();
    }

    componentWillReceiveProps(nextProps) {
        const {
            koblingId,
            alleOppfolgingsdialogerReducer,
            kopierDialogReducer,
            oppfolgingsdialogerReducer,
            sykmeldte,
            tilgang,
        } = this.props;
        const {
            sykmeldt,
        } = nextProps;

        if (sykmeldt && sykmeldt.fnr && !henterEllerHarHentetTilgang(tilgang)) {
            this.props.sjekkTilgang(sykmeldt.fnr);
        }
        if (sykmeldtHarBlittSlettet(sykmeldte, nextProps.sykmeldte)) {
            this.props.hentOppfolgingsdialoger();
        }
        if (oppfolgingsdialogHarBlittOpprettet(oppfolgingsdialogerReducer, nextProps.oppfolgingsdialogerReducer)) {
            this.props.hentOppfolgingsdialoger();
        }
        if (kopierDialogReducer.sender && nextProps.kopierDialogReducer.sendt) {
            this.props.hentOppfolgingsdialoger();
        }
        if (oppfolgingsdialogerReducer.opprettet && !alleOppfolgingsdialogerReducer.hentet && nextProps.alleOppfolgingsdialogerReducer.hentet) {
            history.push(`${getContextRoot()}/${koblingId}/oppfolgingsplaner/${oppfolgingsdialogerReducer.opprettetId}`);
            window.location.hash = 'arbeidsoppgaver';
            window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
        }
        if (kopierDialogReducer.sendt && !oppfolgingsdialogerReducer.hentet && nextProps.oppfolgingsdialogerReducer.hentet) {
            history.push(`${getContextRoot()}/${koblingId}/oppfolgingsplaner/${kopierDialogReducer.data}`);
        }
        this.berikSykmeldt();
    }

    berikSykmeldt() {
        const {
            skalHenteSykmeldtBerikelse,
            hentSykmeldteBerikelser,
            koblingId,
        } = this.props;
        if (skalHenteSykmeldtBerikelse) {
            hentSykmeldteBerikelser([koblingId]);
        }
    }

    opprettdialog() {
        const { sykmeldt } = this.props;
        if (sykmeldt && sykmeldt.orgnummer) {
            this.props.opprettOppfolgingsdialogAg({
                virksomhetsnummer: sykmeldt.orgnummer,
                sykmeldtFnr: sykmeldt.fnr,
            }, sykmeldt.fnr);
        }
    }

    render() {
        const {
            brodsmuler,
            harSykmeldtGyldigSykmelding,
            henter,
            hentingFeilet,
            tilgang,
            hentet,
            sender,
            sendingFeilet,
            sykmeldt,
            hentingFeiletMap,
            loggError,
        } = this.props;
        return (
            <Side
                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')}
                brodsmuler={brodsmuler}
                laster={(henter || sender || !hentet) && !(sendingFeilet || hentingFeilet)}>
                {
                    (() => {
                        if (henter || sender) {
                            return <AppSpinner />;
                        } else if (hentingFeilet || sendingFeilet) {
                            if (!this.state.harloggetHentingFeilet) {
                                loggError(`Henting eller sending feilet, hentingfeiletMap: ${hentHentingFeiletMapTekst(hentingFeiletMap)}`);
                                this.setState({
                                    harloggetHentingFeilet: true,
                                });
                            }
                            return (<Feilmelding />);
                        } else if (!tilgang.data.harTilgang || !sykmeldt || !harSykmeldtGyldigSykmelding) {
                            return (<OppfolgingsdialogInfoboks
                                svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialogFeilmeldingAG.svg`}
                                svgAlt="OppfølgingsdialogFeilmelding"
                                tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                                tekst={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.naermesteleder.tekst')}
                            />);
                        }
                        return (<Oppfolgingsdialoger
                            {...this.props}
                            opprettOppfolgingsdialog={this.opprettdialog}
                        />);
                    })()
                }
            </Side>
        );
    }
}

OppfolgingsdialogerSide.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    kopierDialogReducer: oppfolgingProptypes.kopierDialogReducerPt,
    oppfolgingsdialogerReducer: oppfolgingProptypes.oppfolgingsdialogerAgPt,
    alleOppfolgingsdialogerReducer: oppfolgingProptypes.alleOppfolgingsdialogerAgPt,
    naermesteleder: oppfolgingProptypes.naermestelederReducerPt,
    person: oppfolgingProptypes.personReducerPt,
    sykmeldinger: sykmeldingerReducerPt,
    sykmeldte: sykmeldteReducerPt,
    tilgang: oppfolgingProptypes.tilgangReducerPt,
    virksomhet: oppfolgingProptypes.virksomhetReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    koblingId: PropTypes.string,
    ledetekster: keyValue,
    sykmeldt: sykmeldtPt,
    toggles: togglesPt,
    bekreftetNyNaermesteLeder: PropTypes.bool,
    harSykmeldtGyldigSykmelding: PropTypes.bool,
    slettetSykmeldt: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    bekreftNyNaermesteLeder: PropTypes.func,
    giSamtykke: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
    hentPerson: PropTypes.func,
    hentSykmeldinger: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentToggles: PropTypes.func,
    kopierOppfolgingsdialog: PropTypes.func,
    opprettOppfolgingsdialogAg: PropTypes.func,
    sjekkTilgang: PropTypes.func,
    slettSykmeldt: PropTypes.func,
    hentingFeiletMap: hentingFeiletMapPt,
    loggError: PropTypes.func,
    skalHenteSykmeldtBerikelse: PropTypes.bool,
    hentSykmeldteBerikelser: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const koblingId = ownProps.params.koblingId;
    const sykmeldt = state.sykmeldte.data && state.sykmeldte.data.filter((s) => {
        return `${s.koblingId}` === koblingId;
    })[0];
    let tilgang = { data: {} };
    const alleOppfolgingsdialogerReducer = state.oppfolgingsdialoger;
    let oppfolgingsdialogerReducer = {};
    let oppfolgingsdialoger = [];
    if (sykmeldt && sykmeldt.fnr) {
        tilgang = state.tilgang[sykmeldt.fnr] || tilgang;
        oppfolgingsdialogerReducer = state.oppfolgingsdialoger[sykmeldt.fnr] || {};
        oppfolgingsdialoger = oppfolgingsdialogerReducer.data ?
            oppfolgingsdialogerReducer.data.map((oppfolgingsdialog) => {
                return populerDialogFraState(oppfolgingsdialog, state);
            }) : [];
    }
    const sykmeldinger = state.sykmeldinger[koblingId] || {};
    const harSykmeldtGyldigSykmelding = sykmeldinger.data && sykmeldtHarGyldigSykmelding(sykmeldinger.data);
    const harForsoektHentetOppfolgingsdialoger = forsoektHentetOppfolgingsdialoger(alleOppfolgingsdialogerReducer);
    const harForsoektHentetTilgang = forsoektHentetTilgang(tilgang);
    const harForsoektHentetAlt = harForsoektHentetOppfolgingsdialoger
        && forsoektHentetSykmeldte(state.sykmeldte)
        && sykmeldinger.hentet;
    const erSykmeldteHentet = state.sykmeldte.hentet && !state.sykmeldte.hentingFeilet;
    const hentingFeiletMap = {
        ledetekster: state.ledetekster.hentingFeilet,
        sykmeldte: state.sykmeldte.hentingFeilet,
        alleOppfolgingsdialogerReducer: alleOppfolgingsdialogerReducer.hentingFeilet,
        tilgang: tilgang.hentingFeilet,
        sykmeldinger: sykmeldinger.hentingFeilet,
    };
    const loggError = loggerOppfolgingsdialog.error;

    return {
        henter: state.ledetekster.henter
        || state.sykmeldte.henter
        || alleOppfolgingsdialogerReducer.henter
        || tilgang.henter
        || sykmeldinger.henter
        || !harForsoektHentetAlt
        || (erSykmeldteHentet && sykmeldt && !harForsoektHentetTilgang)
        || (state.sykmeldte.henterBerikelser.length > 0 && !state.sykmeldte.hentingFeilet),
        hentingFeilet: state.ledetekster.hentingFeilet
        || state.sykmeldte.hentingFeilet
        || alleOppfolgingsdialogerReducer.hentingFeilet
        || tilgang.hentingFeilet
        || sykmeldinger.hentingFeilet,
        hentet: state.ledetekster.hentet
        || state.sykmeldte.hentet
        || harForsoektHentetOppfolgingsdialoger
        || tilgang.hentet
        || oppfolgingsdialogerReducer.opprettet
        || state.sykmeldte.slettet,
        sender: oppfolgingsdialogerReducer.oppretter
        || state.kopierDialogReducer.sender
        || state.sykmeldte.sletter,
        sendingFeilet: oppfolgingsdialogerReducer.opprettingFeilet
        || state.kopierDialogReducer.sendingFeilet
        || state.sykmeldte.slettingFeilet,
        naermesteleder: state.naermesteleder,
        person: state.person,
        kopierDialogReducer: state.kopierDialogReducer,
        alleOppfolgingsdialogerReducer,
        oppfolgingsdialogerReducer,
        sykmeldte: state.sykmeldte,
        sykmeldinger,
        tilgang,
        toggles: state.toggles,
        virksomhet: state.virksomhet,
        bekreftetNyNaermesteLeder: state.nyNaermesteLeder.bekreftet,
        koblingId: ownProps.params.koblingId,
        ledetekster: state.ledetekster.data,
        oppfolgingsdialoger,
        sykmeldt,
        kontaktinfo: state.kontaktinfo,
        harSykmeldtGyldigSykmelding,
        slettetSykmeldt: state.sykmeldte.slettet,
        hentingFeiletMap,
        loggError,
        skalHenteSykmeldtBerikelse: beregnSkalHenteSykmeldtBerikelse(sykmeldt, state),
        brodsmuler: [{
            tittel: getLedetekst('sykefravaerarbeidsgiver.dinesykmeldte.sidetittel'),
            sti: '/sykefravaerarbeidsgiver',
            erKlikkbar: true,
        }, {
            tittel: sykmeldt ? sykmeldt.navn : '',
            sti: sykmeldt ? `/sykefravaerarbeidsgiver/${sykmeldt.koblingId}` : '',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel.arbeidsgiver'),
        }],
    };
}

const OppfolgingsdialogerContainer = connect(mapStateToProps, {
    hentOppfolgingsdialoger,
    kopierOppfolgingsdialog,
    opprettOppfolgingsdialogAg,
    sjekkTilgang,
    giSamtykke,
    bekreftNyNaermesteLeder,
    slettSykmeldt,
    hentNaermesteLeder,
    hentVirksomhet,
    hentPerson,
    hentKontaktinfo,
    hentSykmeldinger,
    hentToggles,
    hentSykmeldteBerikelser: hentSykmeldteBerikelserAction,
})(OppfolgingsdialogerSide);

export default OppfolgingsdialogerContainer;
