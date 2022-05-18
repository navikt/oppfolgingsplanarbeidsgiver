import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { brodsmule as brodsmulePt, sykmeldt as sykmeldtPt } from '../shapes';
import * as opProptypes from '../proptypes/opproptypes';
import {
  forsoektHentetSykmeldt,
  henterEllerHarHentetOppfolgingsdialoger,
  oppfolgingsdialogHarBlittAvbrutt,
} from '../utils/reducerUtils';
import { populerDialogFraState } from '../utils/stateUtils';
import {
  finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt,
  finnOppfolgingsplanerPaVirksomhet,
} from '../utils/oppfolgingsplanUtils';
import { Side } from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import OppfolgingsplanInfoboks from '../components/app/OppfolgingsplanInfoboks';
import { settAktivtSteg } from '../actions/oppfolgingsplan/toggle_actions';
import { hentArbeidsforhold } from '../actions/oppfolgingsplan/arbeidsforhold_actions';
import { hentKontaktinfo } from '../actions/oppfolgingsplan/kontaktinfo_actions';
import { hentNaermesteLeder } from '../actions/oppfolgingsplan/naermesteLeder_actions';
import { hentPerson } from '../actions/oppfolgingsplan/person_actions';
import { hentVirksomhet } from '../actions/oppfolgingsplan/virksomhet_actions';
import { delMedNav as delMedNavFunc } from '../actions/oppfolgingsplan/delmednav_actions';
import { avbrytDialog, dialogAvbruttOgNyOpprettet } from '../actions/oppfolgingsplan/avbrytdialog_actions';
import { delMedFastlege } from '../actions/oppfolgingsplan/delMedFastlege_actions';
import { nullstillGodkjenning } from '../actions/oppfolgingsplan/nullstillGodkjenning_actions';
import { giSamtykke } from '../actions/oppfolgingsplan/samtykke_actions';
import { lagreArbeidsoppgave, slettArbeidsoppgave } from '../actions/oppfolgingsplan/arbeidsoppgave_actions';
import { lagreKommentar, slettKommentar } from '../actions/oppfolgingsplan/kommentar_actions';
import { lagreTiltak, slettTiltak } from '../actions/oppfolgingsplan/tiltak_actions';
import { sjekkTilgang } from '../actions/oppfolgingsplan/sjekkTilgang_actions';
import { settDialog } from '../actions/oppfolgingsplan/sett_actions';
import { avvisPlan, godkjennPlan, hentOppfolgingsplaner } from '../actions/oppfolgingsplan/oppfolgingsplan_actions';
import Oppfolgingsdialog from '../components/oppfolgingsdialog/Oppfolgingsdialog';
import { getContextRoot } from '../routers/paths';
import history from '../history';
import { hentSykmeldt } from '../actions/sykmeldt_actions';
import { OppfolgingsdialogFeilmeldingAGImage } from '@/images/imageComponents';
import { isLabs } from '@/utils/urlUtils';

const pageTitleArbeidsoppgaver = 'Oppfølgingsplan - Arbeidsoppgaver';
const pageTitleTiltak = 'Oppfølgingsplan - Tiltak';
const pageTitleSePlanen = 'Oppfølgingsplan - Se planen';
const pageTitleOppsummering = 'Oppfølgingsplan - Oppsummering';

const texts = {
  pageTitles: [pageTitleArbeidsoppgaver, pageTitleTiltak, pageTitleSePlanen],
  brodsmuler: {
    dineSykmeldte: 'Dine sykmeldte',
    oppfolgingsplaner: 'Oppfølgingsplaner',
    oppfolgingsplan: 'Oppfølgingsplan',
  },
  infoboksNoAccess: {
    title: 'Du har ikke tilgang til oppfølgingsplanen',
    info: 'Du har ikke tilgang til oppfølgingsplanen for den sykmeldte arbeidstakeren.',
  },
};

export class OppfolgingsplanSide extends Component {
  constructor(props) {
    super(props);
    const hashValue = window.sessionStorage.getItem('hash');
    if (hashValue === 'arbeidsoppgaver' && hashValue !== window.location.hash) {
      window.location.hash = hashValue;
      this.props.settAktivtSteg(1);
    }
    this.state = { currentPageTitle: pageTitleOppsummering };
  }

  componentDidMount() {
    const { narmestelederId, alleOppfolgingsdialogerReducer, sykmeldtReducer } = this.props;
    if (!henterEllerHarHentetOppfolgingsdialoger(alleOppfolgingsdialogerReducer)) {
      this.props.hentOppfolgingsplaner();
    }
    if (!forsoektHentetSykmeldt(sykmeldtReducer)) {
      this.props.hentSykmeldt(narmestelederId);
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { avbrytdialogReducer, alleOppfolgingsdialogerReducer, narmestelederId } = this.props;
    const { sykmeldt } = nextProps;

    this.props.sjekkTilgang(sykmeldt);

    if (oppfolgingsdialogHarBlittAvbrutt(avbrytdialogReducer, nextProps.avbrytdialogReducer)) {
      this.props.hentOppfolgingsplaner();
    }
    if (
      avbrytdialogReducer.sendt &&
      alleOppfolgingsdialogerReducer.henter &&
      nextProps.alleOppfolgingsdialogerReducer.hentet
    ) {
      const nyOpprettetDialog = finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(
        nextProps.oppfolgingsdialoger,
        nextProps.oppfolgingsdialog.virksomhet.virksomhetsnummer
      );
      if (nyOpprettetDialog) {
        this.props.dialogAvbruttOgNyOpprettet(nyOpprettetDialog.id);
        history.push(`${getContextRoot()}/${narmestelederId}/oppfolgingsplaner/${nyOpprettetDialog.id}`);
        window.location.hash = 'arbeidsoppgaver';
        window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
      }
    }
  }

  componentDidUpdate() {
    const navigasjonSteg = this.props.navigasjontoggles.steg;
    const utfyllingssideHashes = ['#arbeidsoppgaver', '#tiltak', '#godkjenn'];

    if (window.location.hash === '' && window.sessionStorage.getItem('hash')) {
      window.location.hash = window.sessionStorage.getItem('hash');
    }

    if (window.location.hash === '#arbeidsoppgaver' && navigasjonSteg !== 1) {
      this.props.settAktivtSteg(1);
    }

    if (window.location.hash === '#tiltak' && navigasjonSteg !== 2) {
      this.props.settAktivtSteg(2);
    }

    if (window.location.hash === '#godkjenn' && navigasjonSteg !== 3) {
      this.props.settAktivtSteg(3);
    }

    if (utfyllingssideHashes.includes(window.location.hash)) {
      const selectedPageTitle = texts.pageTitles[navigasjonSteg - 1];
      this.setPageTitle(selectedPageTitle);
    } else {
      this.setPageTitle(pageTitleOppsummering);
    }
  }

  setPageTitle(title) {
    if (this.state.currentPageTitle !== title) {
      this.setState({ currentPageTitle: title });
    }
  }

  render() {
    const {
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
        tittel={this.state.currentPageTitle}
        brodsmuler={brodsmuler}
        laster={(henter || sender || !hentet) && !(sendingFeilet || hentingFeilet)}
      >
        {(() => {
          if (henter || sender) {
            return <AppSpinner />;
          } else if (hentingFeilet || sendingFeilet) {
            return <Feilmelding />;
          } else if (!tilgang.data.harTilgang || !sykmeldt) {
            return (
              <OppfolgingsplanInfoboks
                svgUrl={OppfolgingsdialogFeilmeldingAGImage}
                svgAlt=""
                tittel={texts.infoboksNoAccess.title}
                tekst={texts.infoboksNoAccess.info}
              />
            );
          }
          return <Oppfolgingsdialog {...this.props} steg={navigasjontoggles.steg} />;
        })()}
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
  arbeidsforhold: opProptypes.arbeidsforholdReducerPt,
  arbeidsoppgaver: opProptypes.arbeidsoppgaverReducerPt,
  avbrytdialogReducer: opProptypes.avbrytdialogReducerPt,
  kontaktinfo: opProptypes.kontaktinfoReducerPt,
  navigasjontoggles: opProptypes.navigasjonstogglesReducerPt,
  alleOppfolgingsdialogerReducer: opProptypes.alleOppfolgingsdialogerAgPt,
  oppfolgingsdialogerReducer: opProptypes.oppfolgingsdialogerAgPt,
  sykmeldtReducer: opProptypes.sykmeldtReducerPt,
  naermesteleder: opProptypes.naermestelederReducerPt,
  tilgang: opProptypes.tilgangReducerPt,
  tiltak: opProptypes.tiltakReducerPt,
  person: opProptypes.personReducerPt,
  virksomhet: opProptypes.virksomhetReducerPt,
  narmestelederId: PropTypes.string,
  oppfolgingsdialog: opProptypes.oppfolgingsplanPt,
  oppfolgingsdialoger: PropTypes.arrayOf(opProptypes.oppfolgingsplanPt),
  params: PropTypes.shape({
    narmestelederId: PropTypes.string,
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
  hentArbeidsforhold: PropTypes.func,
  godkjennDialogAg: PropTypes.func,
  hentKontaktinfo: PropTypes.func,
  hentOppfolgingsplaner: PropTypes.func,
  hentSykmeldt: PropTypes.func,
  hentPerson: PropTypes.func,
  hentNaermesteLeder: PropTypes.func,
  hentVirksomhet: PropTypes.func,
  nullstillGodkjenning: PropTypes.func,
  settAktivtSteg: PropTypes.func,
  settDialog: PropTypes.func,
  sjekkTilgang: PropTypes.func,
  oppfolgingsplanId: PropTypes.string,
  alleInputFormer: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
  const narmestelederId = ownProps.params.narmestelederId;
  const id = ownProps.params.oppfolgingsplanId;
  const sykmeldt = state.sykmeldt.data;
  let tilgang = { data: {} };
  const alleOppfolgingsdialogerReducer = state.oppfolgingsdialoger;
  let oppfolgingsdialogerReducer = {};
  let oppfolgingsdialoger = [];
  let oppfolgingsdialog = {};
  if (sykmeldt && sykmeldt.fnr) {
    tilgang = state.tilgang[sykmeldt.fnr] || tilgang;
    oppfolgingsdialogerReducer = state.oppfolgingsdialoger[sykmeldt.fnr] || {};
    oppfolgingsdialoger = oppfolgingsdialogerReducer.data || [];
    oppfolgingsdialog = finnOppfolgingsplanerPaVirksomhet(oppfolgingsdialoger, sykmeldt.orgnummer).filter((dialog) => {
      return `${dialog.id}` === id;
    })[0];
    oppfolgingsdialog = oppfolgingsdialog ? populerDialogFraState(oppfolgingsdialog, state) : {};
  }
  const harForsoektHentetOppfolgingsdialoger = alleOppfolgingsdialogerReducer.hentingForsokt;
  const harForsoektHentetAlt = harForsoektHentetOppfolgingsdialoger && forsoektHentetSykmeldt(state.sykmeldt);
  const erSykmeldtHentet = state.sykmeldt.hentet && !state.sykmeldt.hentingFeilet;
  return {
    henter:
      state.sykmeldt.henter ||
      alleOppfolgingsdialogerReducer.henter ||
      tilgang.henter ||
      !harForsoektHentetAlt ||
      (erSykmeldtHentet && sykmeldt && !tilgang.hentingForsokt),
    hentingFeilet:
      state.sykmeldt.hentingFeilet || alleOppfolgingsdialogerReducer.hentingFeilet || tilgang.hentingFeilet,
    hentet:
      oppfolgingsdialogerReducer.hentet ||
      state.tilgang.hentet ||
      harForsoektHentetOppfolgingsdialoger ||
      oppfolgingsdialogerReducer.avvist ||
      oppfolgingsdialogerReducer.godkjent ||
      state.avbrytdialogReducer.sendt ||
      state.nullstill.sendt,
    oppfolgingsdialogerHentet: oppfolgingsdialogerReducer.hentet,
    oppfolgingsdialogerHenter: oppfolgingsdialogerReducer.henter,
    oppfolgingsdialogAvbrutt: state.avbrytdialogReducer.sendt,
    sjekkTilgangHentet: state.tilgang.hentet,
    sjekkTilgangHenter: state.tilgang.henter,
    sender:
      oppfolgingsdialogerReducer.avviser ||
      oppfolgingsdialogerReducer.godkjenner ||
      state.avbrytdialogReducer.sender ||
      state.nullstill.sender ||
      state.samtykke.sender,
    sendingFeilet:
      oppfolgingsdialogerReducer.avvisFeilet ||
      oppfolgingsdialogerReducer.godkjenningFeilet ||
      state.avbrytdialogReducer.sendingFeilet ||
      state.nullstill.sendingFeilet ||
      state.samtykke.sendingFeilet,
    arbeidsoppgaver: state.arbeidsoppgaver,
    avbrytdialogReducer: state.avbrytdialogReducer,
    sykmeldtReducer: state.sykmeldt,
    delmednav: state.delmednav,
    fastlegeDeling: state.fastlegeDeling,
    arbeidsforhold: state.arbeidsforhold,
    kontaktinfo: state.kontaktinfo,
    navigasjontoggles: state.navigasjontoggles,
    naermesteleder: state.naermesteleder,
    alleOppfolgingsdialogerReducer,
    oppfolgingsdialogerReducer,
    person: state.person,
    tilgang,
    tiltak: state.tiltak,
    virksomhet: state.virksomhet,
    narmestelederId,
    oppfolgingsdialog,
    oppfolgingsdialoger,
    sykmeldt,
    brodsmuler: [
      {
        tittel: texts.brodsmuler.dineSykmeldte,
        sti: isLabs() ? 'https://dinesykmeldte.labs.nais.io/arbeidsgiver/sykmeldte' : '/arbeidsgiver/sykmeldte',
        erKlikkbar: true,
      },
      {
        tittel: sykmeldt ? sykmeldt.navn : '',
        sti: isLabs()
          ? 'https://dinesykmeldte.labs.nais.io/arbeidsgiver/sykmeldte/6f460a78-fef9-48b0-ac69-3585b7d9367c'
          : sykmeldt
          ? `/arbeidsgiver/sykmeldte/${sykmeldt.narmestelederId}`
          : '',
        erKlikkbar: true,
      },
      {
        tittel: texts.brodsmuler.oppfolgingsplaner,
        sti: sykmeldt ? `/${sykmeldt.narmestelederId}/oppfolgingsplaner` : '',
        erKlikkbar: true,
      },
      {
        tittel: texts.brodsmuler.oppfolgingsplan,
      },
    ],
    alleInputFormer: state.form,
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
  delMedFastlege,
  delMedNavFunc,
  hentVirksomhet,
  hentPerson,
  hentKontaktinfo,
  hentNaermesteLeder,
  hentSykmeldt,
})(OppfolgingsplanSide);

export default OppfolgingsdialogContainer;
