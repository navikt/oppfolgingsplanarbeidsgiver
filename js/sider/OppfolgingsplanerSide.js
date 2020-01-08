import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    sykmeldt as sykmeldtPt,
    brodsmule as brodsmulePt,
    sykmeldteReducerPt,
    sykmeldingerReducerPt,
} from '../shapes';
import {
    forsoektHentetSykmeldte,
    henterEllerHarHentetOppfolgingsdialoger,
    henterEllerHarHentetSykmeldinger,
    oppfolgingsdialogHarBlittOpprettet,
    sykmeldtHarBlittSlettet,
} from '../utils/reducerUtils';
import { populerDialogFraState } from '../utils/stateUtils';
import logger from '../logg/logging';
import {
    finnOppfolgingsplanerPaVirksomhet,
    sykmeldtHarGyldigSykmelding,
} from '../utils/oppfolgingsplanUtils';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import OppfolgingsplanInfoboks from '../components/app/OppfolgingsplanInfoboks';
import history from '../history';

import * as opproptypes from '../proptypes/opproptypes';
import {
    hentOppfolgingsplaner,
    opprettOppfolgingsplan,
} from '../actions/oppfolgingsplan/oppfolgingsplan_actions';
import { kopierOppfolgingsdialog } from '../actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';
import { giSamtykke } from '../actions/oppfolgingsplan/samtykke_actions';
import { hentKontaktinfo } from '../actions/oppfolgingsplan/kontaktinfo_actions';
import { hentNaermesteLeder } from '../actions/oppfolgingsplan/naermesteLeder_actions';
import { bekreftNyNaermesteLeder } from '../actions/oppfolgingsplan/nyNaermesteleder_actions';
import { hentPerson } from '../actions/oppfolgingsplan/person_actions';
import { hentVirksomhet } from '../actions/oppfolgingsplan/virksomhet_actions';
import { sjekkTilgang } from '../actions/oppfolgingsplan/sjekkTilgang_actions';
import { slettSykmeldt } from '../actions/sykmeldt_actions';
import { hentSykmeldinger } from '../actions/sykmeldinger_actions';
import Oppfolgingsdialoger from '../components/oppfolgingsdialog/Oppfolgingsdialoger';
import { getContextRoot } from '../routers/paths';
import { hentSykmeldteBerikelser as hentSykmeldteBerikelserAction } from '../actions/sykmeldte_actions';
import { beregnSkalHenteSykmeldtBerikelse } from '../utils/sykmeldtUtils';

const texts = {
    pageTitle: 'Oppfølgingsplaner',
    brodsmuler: {
        dineSykmeldte: 'Dine sykmeldte',
        oppfolgingsplaner: 'Oppfølgingsplaner',
    },
    infoboksNoAccess: {
        title: 'Du har ikke tilgang til oppfølgingsplanen',
        info: 'Du har ikke tilgang til oppfølgingsplanen for den sykmeldte arbeidstakeren.',
    },
};

export const hentHentingFeiletMapTekst = (hentingFeiletMap) => {
    return `
    sykmeldte: ${hentingFeiletMap.sykmeldte};
    oppfolgingsdialoger: ${hentingFeiletMap.alleOppfolgingsdialogerReducer};
    tilgang: ${hentingFeiletMap.sykmeldinger};
    sykmeldinger: ${hentingFeiletMap.sykmeldinger};
    `;
};

const hentingFeiletMapPt = PropTypes.shape({
    sykmeldte: PropTypes.bool,
    alleOppfolgingsdialogerReducer: PropTypes.bool,
    tilgang: PropTypes.bool,
    sykmeldinger: PropTypes.bool,
});

export class OppfolgingsplanerSide extends Component {
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
        } = this.props;
        if (!henterEllerHarHentetOppfolgingsdialoger(alleOppfolgingsdialogerReducer)) {
            this.props.hentOppfolgingsplaner();
        }
        if (!henterEllerHarHentetSykmeldinger(sykmeldinger)) {
            this.props.hentSykmeldinger(koblingId);
        }
        this.berikSykmeldt();
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        const {
            koblingId,
            alleOppfolgingsdialogerReducer,
            kopierDialogReducer,
            oppfolgingsdialogerReducer,
            sykmeldte,
        } = this.props;
        const {
            sykmeldt,
        } = nextProps;

        this.props.sjekkTilgang(sykmeldt);

        if (sykmeldtHarBlittSlettet(sykmeldte, nextProps.sykmeldte)) {
            this.props.hentOppfolgingsplaner();
        }
        if (oppfolgingsdialogHarBlittOpprettet(oppfolgingsdialogerReducer, nextProps.oppfolgingsdialogerReducer)) {
            this.props.hentOppfolgingsplaner();
        }
        if (kopierDialogReducer.sender && nextProps.kopierDialogReducer.sendt) {
            this.props.hentOppfolgingsplaner();
        }
        if (oppfolgingsdialogerReducer.opprettet && !alleOppfolgingsdialogerReducer.hentet && nextProps.alleOppfolgingsdialogerReducer.hentet) {
            history.push(`${getContextRoot()}/${koblingId}/oppfolgingsplaner/${oppfolgingsdialogerReducer.opprettetId}`);
            window.location.hash = 'arbeidsoppgaver';
            window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
        }
        if (kopierDialogReducer.sendt && !alleOppfolgingsdialogerReducer.hentet && nextProps.alleOppfolgingsdialogerReducer.hentet) {
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
                tittel={texts.pageTitle}
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
                            return (<OppfolgingsplanInfoboks
                                svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialogFeilmeldingAG.svg`}
                                svgAlt="OppfølgingsdialogFeilmelding"
                                tittel={texts.infoboksNoAccess.title}
                                tekst={texts.infoboksNoAccess.info}
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

OppfolgingsplanerSide.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    kopierDialogReducer: opproptypes.kopierDialogReducerPt,
    oppfolgingsdialogerReducer: opproptypes.oppfolgingsdialogerAgPt,
    alleOppfolgingsdialogerReducer: opproptypes.alleOppfolgingsdialogerAgPt,
    naermesteleder: opproptypes.naermestelederReducerPt,
    person: opproptypes.personReducerPt,
    sykmeldinger: sykmeldingerReducerPt,
    sykmeldte: sykmeldteReducerPt,
    tilgang: opproptypes.tilgangReducerPt,
    virksomhet: opproptypes.virksomhetReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(opproptypes.oppfolgingsplanPt),
    koblingId: PropTypes.string,
    sykmeldt: sykmeldtPt,
    bekreftetNyNaermesteLeder: PropTypes.bool,
    harSykmeldtGyldigSykmelding: PropTypes.bool,
    slettetSykmeldt: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    bekreftNyNaermesteLeder: PropTypes.func,
    giSamtykke: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentOppfolgingsplaner: PropTypes.func,
    hentPerson: PropTypes.func,
    hentSykmeldinger: PropTypes.func,
    hentVirksomhet: PropTypes.func,
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
            finnOppfolgingsplanerPaVirksomhet(oppfolgingsdialogerReducer.data, sykmeldt.orgnummer)
                .map((oppfolgingsdialog) => {
                    return populerDialogFraState(oppfolgingsdialog, state);
                }) : [];
    }
    const sykmeldinger = state.sykmeldinger[koblingId] || {};
    const harSykmeldtGyldigSykmelding = sykmeldinger.data && sykmeldtHarGyldigSykmelding(sykmeldinger.data);
    const harForsoektHentetOppfolgingsdialoger = alleOppfolgingsdialogerReducer.hentingForsokt;
    const harForsoektHentetAlt = harForsoektHentetOppfolgingsdialoger
        && forsoektHentetSykmeldte(state.sykmeldte)
        && sykmeldinger.hentet;
    const erSykmeldteHentet = state.sykmeldte.hentet && !state.sykmeldte.hentingFeilet;
    const hentingFeiletMap = {
        sykmeldte: state.sykmeldte.hentingFeilet,
        alleOppfolgingsdialogerReducer: alleOppfolgingsdialogerReducer.hentingFeilet,
        tilgang: tilgang.hentingFeilet,
        sykmeldinger: sykmeldinger.hentingFeilet,
    };
    const loggError = logger.error;

    return {
        henter: state.sykmeldte.henter
        || alleOppfolgingsdialogerReducer.henter
        || tilgang.henter
        || sykmeldinger.henter
        || !harForsoektHentetAlt
        || (erSykmeldteHentet && sykmeldt && !tilgang.hentingForsokt)
        || (state.sykmeldte.henterBerikelser.length > 0 && !state.sykmeldte.hentingFeilet),
        hentingFeilet: state.sykmeldte.hentingFeilet
        || alleOppfolgingsdialogerReducer.hentingFeilet
        || tilgang.hentingFeilet
        || sykmeldinger.hentingFeilet,
        hentet: state.sykmeldte.hentet
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
        virksomhet: state.virksomhet,
        bekreftetNyNaermesteLeder: state.nyNaermesteLeder.bekreftet,
        koblingId: ownProps.params.koblingId,
        oppfolgingsdialoger,
        sykmeldt,
        kontaktinfo: state.kontaktinfo,
        harSykmeldtGyldigSykmelding,
        slettetSykmeldt: state.sykmeldte.slettet,
        hentingFeiletMap,
        loggError,
        skalHenteSykmeldtBerikelse: beregnSkalHenteSykmeldtBerikelse(sykmeldt, state),
        brodsmuler: [{
            tittel: texts.brodsmuler.dineSykmeldte,
            sti: '/sykefravaerarbeidsgiver',
            erKlikkbar: true,
        }, {
            tittel: sykmeldt ? sykmeldt.navn : '',
            sti: sykmeldt ? `/sykefravaerarbeidsgiver/${sykmeldt.koblingId}` : '',
            erKlikkbar: true,
        }, {
            tittel: texts.brodsmuler.oppfolgingsplaner,
        }],
    };
}

const OppfolgingsdialogerContainer = connect(mapStateToProps, {
    hentOppfolgingsplaner,
    kopierOppfolgingsdialog,
    opprettOppfolgingsdialogAg: opprettOppfolgingsplan,
    sjekkTilgang,
    giSamtykke,
    bekreftNyNaermesteLeder,
    slettSykmeldt,
    hentNaermesteLeder,
    hentVirksomhet,
    hentPerson,
    hentKontaktinfo,
    hentSykmeldinger,
    hentSykmeldteBerikelser: hentSykmeldteBerikelserAction,
})(OppfolgingsplanerSide);

export default OppfolgingsdialogerContainer;
