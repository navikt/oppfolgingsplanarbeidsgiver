import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getLedetekst,
    keyValue,
    hentToggles,
    togglesPt,
    sykeforlopsPerioderReducerPt,
    hentSykeforlopsPerioder,
} from 'digisyfo-npm';
import {
    sykmeldt as sykmeldtPt,
    brodsmule as brodsmulePt,
    sykmeldteReducerPt,
    sykmeldingerReducerPt,
} from '../shapes';
import * as opProptypes from '../proptypes/opproptypes';
import {
    forsoektHentetSykmeldte,
    henterEllerHarHentetOppfolgingsdialoger,
    henterEllerHarHentetSykmeldinger,
    henterEllerHarHentetToggles,
    oppfolgingsdialogHarBlittAvbrutt,
} from '../utils/reducerUtils';
import { populerDialogFraState } from '../utils/stateUtils';
import {
    finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt,
    sykmeldtHarGyldigSykmelding,
} from '../utils/oppfolgingsplanUtils';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import OppfolgingsplanInfoboks from '../components/app/OppfolgingsplanInfoboks';
import { settAktivtSteg } from '../actions/oppfolgingsplan/toggle_actions';
import { hentArbeidsforhold } from '../actions/oppfolgingsplan/arbeidsforhold_actions';
import { hentKontaktinfo } from '../actions/oppfolgingsplan/kontaktinfo_actions';
import { hentNaermesteLeder } from '../actions/oppfolgingsplan/naermesteLeder_actions';
import { hentPdfurler } from '../actions/oppfolgingsplan/dokument_actions';
import { hentPerson } from '../actions/oppfolgingsplan/person_actions';
import { hentVirksomhet } from '../actions/oppfolgingsplan/virksomhet_actions';
import { hentSykmeldinger } from '../actions/sykmeldinger_actions';
import { forespoerRevidering } from '../actions/oppfolgingsplan/forespoerRevidering_actions';
import { delMedNav as delMedNavFunc } from '../actions/oppfolgingsplan/delmednav_actions';
import {
    avbrytDialog,
    dialogAvbruttOgNyOpprettet,
} from '../actions/oppfolgingsplan/avbrytdialog_actions';
import { delMedFastlege } from '../actions/oppfolgingsplan/delMedFastlege_actions';
import { nullstillGodkjenning } from '../actions/oppfolgingsplan/nullstillGodkjenning_actions';
import { giSamtykke } from '../actions/oppfolgingsplan/samtykke_actions';
import { lagreArbeidsoppgave, slettArbeidsoppgave } from '../actions/oppfolgingsplan/arbeidsoppgave_actions';
import { lagreKommentar, slettKommentar } from '../actions/oppfolgingsplan/kommentar_actions';
import { lagreTiltak, slettTiltak } from '../actions/oppfolgingsplan/tiltak_actions';
import { sjekkTilgang } from '../actions/oppfolgingsplan/sjekkTilgang_actions';
import { settDialog } from '../actions/oppfolgingsplan/sett_actions';
import {
    avvisPlan,
    godkjennPlan,
    hentOppfolgingsplaner,
} from '../actions/oppfolgingsplan/oppfolgingsplan_actions';
import Oppfolgingsdialog from '../components/oppfolgingsdialog/Oppfolgingsdialog';
import { getContextRoot } from '../routers/paths';
import history from '../history';
import { hentSykmeldteBerikelser as hentSykmeldteBerikelserAction } from '../actions/sykmeldte_actions';
import { beregnSkalHenteSykmeldtBerikelse } from '../utils/sykmeldtUtils';

export class OppfolgingsplanSide extends Component {
    componentDidMount() {
        const {
            koblingId,
            alleOppfolgingsdialogerReducer,
            sykmeldinger,
            toggles,
        } = this.props;
        if (!henterEllerHarHentetOppfolgingsdialoger(alleOppfolgingsdialogerReducer)) {
            this.props.hentOppfolgingsplaner();
        }
        if (!henterEllerHarHentetSykmeldinger(sykmeldinger)) {
            this.props.hentSykmeldinger(koblingId);
        }
        if (!henterEllerHarHentetToggles(toggles)) {
            this.props.hentToggles();
        }
        this.berikSykmeldt();
    }

    componentDidUpdate() {
        if (window.location.hash === '' && window.sessionStorage.getItem('hash')) {
            window.location.hash = window.sessionStorage.getItem('hash');
        }

        if (window.location.hash === '#arbeidsoppgaver' && this.props.navigasjontoggles.steg !== 1) {
            this.props.settAktivtSteg(1);
        }

        if (window.location.hash === '#tiltak' && this.props.navigasjontoggles.steg !== 2) {
            this.props.settAktivtSteg(2);
        }

        if (window.location.hash === '#godkjenn' && this.props.navigasjontoggles.steg !== 3) {
            this.props.settAktivtSteg(3);
        }
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        const {
            avbrytdialogReducer,
            alleOppfolgingsdialogerReducer,
            koblingId,
        } = this.props;
        const {
            sykmeldt,
        } = nextProps;

        this.props.sjekkTilgang(sykmeldt);

        if (oppfolgingsdialogHarBlittAvbrutt(avbrytdialogReducer, nextProps.avbrytdialogReducer)) {
            this.props.hentOppfolgingsplaner();
        }
        if (avbrytdialogReducer.sendt && alleOppfolgingsdialogerReducer.henter && nextProps.alleOppfolgingsdialogerReducer.hentet) {
            const nyOpprettetDialog = finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(nextProps.oppfolgingsdialoger, nextProps.oppfolgingsdialog.virksomhet.virksomhetsnummer);
            if (nyOpprettetDialog) {
                this.props.dialogAvbruttOgNyOpprettet(nyOpprettetDialog.id);
                history.push(`${getContextRoot()}/${koblingId}/oppfolgingsplaner/${nyOpprettetDialog.id}`);
                window.location.hash = 'arbeidsoppgaver';
                window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
            }
        }
        this.berikSykmeldt();
    }

    berikSykmeldt() {
        const {
            skalHenteBerikelse,
            hentSykmeldteBerikelser,
            koblingId,
        } = this.props;
        if (skalHenteBerikelse) {
            hentSykmeldteBerikelser([koblingId]);
        }
    }

    render() {
        const {
            harSykmeldtGyldigSykmelding,
            navigasjontoggles,
            brodsmuler,
            henter,
            hentingFeilet,
            hentet,
            sender,
            sendingFeilet,
            tilgang,
            sykmeldt,
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
                            return <Feilmelding />;
                        } else if (!tilgang.data.harTilgang || !sykmeldt || !harSykmeldtGyldigSykmelding) {
                            return (<OppfolgingsplanInfoboks
                                svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialogFeilmeldingAG.svg`}
                                svgAlt="OppfølgingsdialogFeilmelding"
                                tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                                tekst={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.naermesteleder.tekst')}
                            />);
                        }
                        return (<Oppfolgingsdialog
                            {...this.props}
                            steg={navigasjontoggles.steg}
                        />);
                    })()
                }
            </Side>
        );
    }
}

OppfolgingsplanSide.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    toggles: togglesPt,
    arbeidsforhold: opProptypes.arbeidsforholdReducerPt,
    arbeidsoppgaver: opProptypes.arbeidsoppgaverReducerPt,
    avbrytdialogReducer: opProptypes.avbrytdialogReducerPt,
    dokument: opProptypes.dokumentReducerPt,
    forespoerselRevidering: opProptypes.forespoerselRevideringPt,
    kontaktinfo: opProptypes.kontaktinfoReducerPt,
    navigasjontoggles: opProptypes.navigasjonstogglesReducerPt,
    alleOppfolgingsdialogerReducer: opProptypes.alleOppfolgingsdialogerAgPt,
    oppfolgingsdialogerReducer: opProptypes.oppfolgingsdialogerAgPt,
    naermesteleder: opProptypes.naermestelederReducerPt,
    sykmeldinger: sykmeldingerReducerPt,
    sykmeldte: sykmeldteReducerPt,
    tilgang: opProptypes.tilgangReducerPt,
    tiltak: opProptypes.tiltakReducerPt,
    person: opProptypes.personReducerPt,
    virksomhet: opProptypes.virksomhetReducerPt,
    sykeforlopsPerioder: sykeforlopsPerioderReducerPt,
    koblingId: PropTypes.string,
    harSykmeldtGyldigSykmelding: PropTypes.bool,
    ledetekster: keyValue,
    oppfolgingsdialog: opProptypes.oppfolgingsdialogPt,
    oppfolgingsdialoger: PropTypes.arrayOf(opProptypes.oppfolgingsdialogPt),
    params: PropTypes.shape({
        koblingId: PropTypes.string,
    }),
    sykmeldt: sykmeldtPt,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    lagreKommentar: PropTypes.func,
    slettKommentar: PropTypes.func,
    avbrytDialog: PropTypes.func,
    dialogAvbruttOgNyOpprettet: PropTypes.func,
    delMedFastlege: PropTypes.func,
    delMedNavFunc: PropTypes.func,
    forespoerRevidering: PropTypes.func,
    hentArbeidsforhold: PropTypes.func,
    godkjennDialogAg: PropTypes.func,
    hentKontaktinfo: PropTypes.func,
    hentOppfolgingsplaner: PropTypes.func,
    hentPdfurler: PropTypes.func,
    hentPerson: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentToggles: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    settDialog: PropTypes.func,
    sjekkTilgang: PropTypes.func,
    oppfolgingsplanId: PropTypes.string,
    hentSykmeldinger: PropTypes.func,
    hentSykeforlopsPerioder: PropTypes.func,
    skalHenteBerikelse: PropTypes.bool,
    hentSykmeldteBerikelser: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const koblingId = ownProps.params.koblingId;
    const id = ownProps.params.oppfolgingsplanId;
    const sykmeldt = state.sykmeldte.data && state.sykmeldte.data.filter((s) => {
        return `${s.koblingId}` === koblingId;
    })[0];
    let tilgang = { data: {} };
    const alleOppfolgingsdialogerReducer = state.oppfolgingsdialoger;
    let oppfolgingsdialogerReducer = {};
    let oppfolgingsdialoger = [];
    let oppfolgingsdialog = {};
    if (sykmeldt && sykmeldt.fnr) {
        tilgang = state.tilgang[sykmeldt.fnr] || tilgang;
        oppfolgingsdialogerReducer = state.oppfolgingsdialoger[sykmeldt.fnr] || {};
        oppfolgingsdialoger = oppfolgingsdialogerReducer.data || [];
        oppfolgingsdialog = oppfolgingsdialoger
            .filter((dialog) => { return `${dialog.id}` === id; })[0];
        oppfolgingsdialog = oppfolgingsdialog ?
            populerDialogFraState(oppfolgingsdialog, state) : {};
    }
    const sykmeldinger = state.sykmeldinger[koblingId] || {};
    const harSykmeldtGyldigSykmelding = sykmeldinger.data && sykmeldtHarGyldigSykmelding(sykmeldinger.data);
    const harForsoektHentetOppfolgingsdialoger = alleOppfolgingsdialogerReducer.hentingForsokt;
    const harForsoektHentetAlt = harForsoektHentetOppfolgingsdialoger
        && forsoektHentetSykmeldte(state.sykmeldte)
        && sykmeldinger.hentet;
    const erSykmeldteHentet = state.sykmeldte.hentet && !state.sykmeldte.hentingFeilet;
    const skalHenteBerikelse = beregnSkalHenteSykmeldtBerikelse(sykmeldt, state);

    return {
        henter: state.ledetekster.henter
        || state.sykmeldte.henter
        || alleOppfolgingsdialogerReducer.henter
        || tilgang.henter
        || sykmeldinger.henter
        || !harForsoektHentetAlt
        || (erSykmeldteHentet && sykmeldt && !tilgang.hentingForsokt)
        || (state.sykmeldte.henterBerikelser.length > 0 && !state.sykmeldte.hentingFeilet),
        hentingFeilet: state.ledetekster.hentingFeilet
        || state.sykmeldte.hentingFeilet
        || alleOppfolgingsdialogerReducer.hentingFeilet
        || tilgang.hentingFeilet
        || sykmeldinger.hentingFeilet,
        hentet: oppfolgingsdialogerReducer.hentet
        || state.ledetekster.hentet
        || state.tilgang.hentet
        || harForsoektHentetOppfolgingsdialoger
        || oppfolgingsdialogerReducer.avvist
        || oppfolgingsdialogerReducer.godkjent
        || state.avbrytdialogReducer.sendt
        || state.nullstill.sendt,
        oppfolgingsdialogerHentet: oppfolgingsdialogerReducer.hentet,
        oppfolgingsdialogerHenter: oppfolgingsdialogerReducer.henter,
        oppfolgingsdialogAvbrutt: state.avbrytdialogReducer.sendt,
        sjekkTilgangHentet: state.tilgang.hentet,
        sykmeldinger,
        sjekkTilgangHenter: state.tilgang.henter,
        sender: oppfolgingsdialogerReducer.avviser
        || oppfolgingsdialogerReducer.godkjenner
        || state.avbrytdialogReducer.sender
        || state.nullstill.sender
        || state.samtykke.sender,
        sendingFeilet: oppfolgingsdialogerReducer.avvisFeilet
        || oppfolgingsdialogerReducer.godkjenningFeilet
        || state.avbrytdialogReducer.sendingFeilet
        || state.nullstill.sendingFeilet
        || state.samtykke.sendingFeilet,
        arbeidsoppgaver: state.arbeidsoppgaver,
        avbrytdialogReducer: state.avbrytdialogReducer,
        dokument: state.dokument,
        delmednav: state.delmednav,
        fastlegeDeling: state.fastlegeDeling,
        forespoerselRevidering: state.forespoerselRevidering,
        arbeidsforhold: state.arbeidsforhold,
        kontaktinfo: state.kontaktinfo,
        navigasjontoggles: state.navigasjontoggles,
        naermesteleder: state.naermesteleder,
        alleOppfolgingsdialogerReducer,
        oppfolgingsdialogerReducer,
        sykeforlopsPerioderReducer: state.sykeforlopsPerioder,
        person: state.person,
        sykmeldte: state.sykmeldte,
        toggles: state.toggles,
        tilgang,
        tiltak: state.tiltak,
        virksomhet: state.virksomhet,
        koblingId: ownProps.params.koblingId,
        ledetekster: state.ledetekster.data,
        oppfolgingsdialog,
        oppfolgingsdialoger,
        sykmeldt,
        harSykmeldtGyldigSykmelding,
        skalHenteBerikelse,
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
            sti: sykmeldt ? `/${sykmeldt.koblingId}/oppfolgingsplaner` : '',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialog.sidetittel.arbeidsgiver'),
        }],
    };
}

const OppfolgingsdialogContainer = connect(mapStateToProps, {
    hentOppfolgingsplaner,
    sjekkTilgang,
    godkjennDialogAg: godkjennPlan,
    avvisDialogAg: avvisPlan,
    nullstillGodkjenning,
    settAktivtSteg,
    settDialog,
    hentPdfurler,
    giSamtykke,
    slettArbeidsoppgave,
    lagreArbeidsoppgave,
    slettTiltak,
    lagreTiltak,
    lagreKommentar,
    slettKommentar,
    avbrytDialog,
    dialogAvbruttOgNyOpprettet,
    hentArbeidsforhold,
    hentToggles,
    delMedFastlege,
    delMedNavFunc,
    forespoerRevidering,
    hentVirksomhet,
    hentPerson,
    hentKontaktinfo,
    hentSykmeldinger,
    hentNaermesteLeder,
    hentSykeforlopsPerioder,
    hentSykmeldteBerikelser: hentSykmeldteBerikelserAction,
})(OppfolgingsplanSide);

export default OppfolgingsdialogContainer;
