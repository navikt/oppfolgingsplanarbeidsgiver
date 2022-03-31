import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  brodsmule as brodsmulePt,
  dineSykmeldteMedSykmeldinger as dineSykmeldteMedSykmeldingerPt,
  sykmeldt as sykmeldtPt,
} from '../shapes';
import {
  forsoektHentetSykmeldt,
  henterEllerHarHentetOppfolgingsdialoger,
  oppfolgingsdialogHarBlittOpprettet,
} from '@/utils/reducerUtils';
import { populerDialogFraState } from '@/utils/stateUtils';
import { finnGyldigePlanerPaVirksomhet } from '@/utils/oppfolgingsplanUtils';
import { Side } from '@/sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import OppfolgingsplanInfoboks from '../components/app/OppfolgingsplanInfoboks';
import history from '../history';

import * as opproptypes from '../proptypes/opproptypes';
import { hentOppfolgingsplaner, opprettOppfolgingsplan } from '@/actions/oppfolgingsplan/oppfolgingsplan_actions';
import { kopierOppfolgingsdialog } from '@/actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';
import { giSamtykke } from '@/actions/oppfolgingsplan/samtykke_actions';
import { hentKontaktinfo } from '@/actions/oppfolgingsplan/kontaktinfo_actions';
import { hentNaermesteLeder } from '@/actions/oppfolgingsplan/naermesteLeder_actions';
import { hentPerson } from '@/actions/oppfolgingsplan/person_actions';
import { hentVirksomhet } from '@/actions/oppfolgingsplan/virksomhet_actions';
import { sjekkTilgang } from '@/actions/oppfolgingsplan/sjekkTilgang_actions';
import Oppfolgingsdialoger from '../components/oppfolgingsdialog/Oppfolgingsdialoger';
import { getContextRoot } from '@/routers/paths';
import { hentSykmeldt } from '@/actions/sykmeldt_actions';
import { OppfolgingsdialogFeilmeldingAGImage } from '@/images/imageComponents';
import { hentDineSykmeldteMedSykmeldinger } from '@/actions/sykmeldinger/sykmeldinger_actions';
import { isLabs } from '@/utils/urlUtils';

const texts = {
  pageTitle: 'Oppfølgingsplaner - Oversikt',
  brodsmuler: {
    dineSykmeldte: 'Dine sykmeldte',
    oppfolgingsplaner: 'Oppfølgingsplaner',
  },
  infoboksNoAccess: {
    title: 'Du har ikke tilgang til oppfølgingsplanen',
    info: 'Du har ikke tilgang til oppfølgingsplanen for den sykmeldte arbeidstakeren.',
  },
};

export class OppfolgingsplanerSide extends Component {
  constructor(props) {
    super(props);
    this.opprettdialog = this.opprettdialog.bind(this);
    window.sessionStorage.removeItem('startdato');
    window.sessionStorage.removeItem('sluttdato');
    window.sessionStorage.removeItem('evalueringsdato');
  }

  componentDidMount() {
    const { narmestelederId, alleOppfolgingsdialogerReducer, sykmeldtReducer } = this.props;
    if (!henterEllerHarHentetOppfolgingsdialoger(alleOppfolgingsdialogerReducer)) {
      this.props.hentOppfolgingsplaner();
    }
    if (!forsoektHentetSykmeldt(sykmeldtReducer)) {
      this.props.hentSykmeldt(narmestelederId);
    }
    this.props.hentDineSykmeldteMedSykmeldinger();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      narmestelederId,
      alleOppfolgingsdialogerReducer,
      kopierDialogReducer,
      oppfolgingsdialogerReducer,
    } = this.props;
    const { sykmeldt } = nextProps;

    this.props.sjekkTilgang(sykmeldt);

    if (oppfolgingsdialogHarBlittOpprettet(oppfolgingsdialogerReducer, nextProps.oppfolgingsdialogerReducer)) {
      window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
      this.props.hentOppfolgingsplaner();
    }
    if (kopierDialogReducer.sender && nextProps.kopierDialogReducer.sendt) {
      window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
      this.props.hentOppfolgingsplaner();
    }
    if (
      oppfolgingsdialogerReducer.opprettet &&
      !alleOppfolgingsdialogerReducer.hentet &&
      nextProps.alleOppfolgingsdialogerReducer.hentet
    ) {
      history.push(
        `${getContextRoot()}/${narmestelederId}/oppfolgingsplaner/${oppfolgingsdialogerReducer.opprettetId}`
      );
    }
    if (
      kopierDialogReducer.sendt &&
      !alleOppfolgingsdialogerReducer.hentet &&
      nextProps.alleOppfolgingsdialogerReducer.hentet
    ) {
      history.push(`${getContextRoot()}/${narmestelederId}/oppfolgingsplaner/${kopierDialogReducer.data}`);
    }
  }

  opprettdialog() {
    const { sykmeldt } = this.props;
    if (sykmeldt && sykmeldt.orgnummer) {
      this.props.opprettOppfolgingsdialogAg(
        {
          virksomhetsnummer: sykmeldt.orgnummer,
          sykmeldtFnr: sykmeldt.fnr,
        },
        sykmeldt.fnr
      );
    }
  }

  render() {
    const { brodsmuler, henter, hentingFeilet, tilgang, hentet, sender, sendingFeilet, sykmeldt } = this.props;
    return (
      <Side
        tittel={texts.pageTitle}
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
          return <Oppfolgingsdialoger {...this.props} opprettOppfolgingsdialog={this.opprettdialog} />;
        })()}
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
  sykmeldtReducer: opproptypes.sykmeldtReducerPt,
  dineSykmeldteMedSykmeldingerReducer: opproptypes.dineSykmeldteMedSykmeldingerReducerPt,
  oppfolgingsdialogerReducer: opproptypes.oppfolgingsdialogerAgPt,
  alleOppfolgingsdialogerReducer: opproptypes.alleOppfolgingsdialogerAgPt,
  naermesteleder: opproptypes.naermestelederReducerPt,
  person: opproptypes.personReducerPt,
  tilgang: opproptypes.tilgangReducerPt,
  virksomhet: opproptypes.virksomhetReducerPt,
  oppfolgingsdialoger: PropTypes.arrayOf(opproptypes.oppfolgingsplanPt),
  narmestelederId: PropTypes.string,
  sykmeldt: sykmeldtPt,
  dineSykmeldteMedSykmeldinger: PropTypes.arrayOf(dineSykmeldteMedSykmeldingerPt),
  brodsmuler: PropTypes.arrayOf(brodsmulePt),
  giSamtykke: PropTypes.func,
  hentNaermesteLeder: PropTypes.func,
  hentOppfolgingsplaner: PropTypes.func,
  hentSykmeldt: PropTypes.func,
  hentDineSykmeldteMedSykmeldinger: PropTypes.func,
  hentPerson: PropTypes.func,
  hentVirksomhet: PropTypes.func,
  kopierOppfolgingsdialog: PropTypes.func,
  opprettOppfolgingsdialogAg: PropTypes.func,
  sjekkTilgang: PropTypes.func,
};

const populatePlanerPaVirksomhetKnyttetTilGyldigSykmelding = (data, orgnummer, dineSykmeldteMedSykmeldinger, state) => {
  const planerPaVirksomhetKnyttetTilGyldigSykmelding = finnGyldigePlanerPaVirksomhet(
    data,
    orgnummer,
    dineSykmeldteMedSykmeldinger
  );

  return planerPaVirksomhetKnyttetTilGyldigSykmelding.map((oppfolgingsdialog) => {
    return populerDialogFraState(oppfolgingsdialog, state);
  });
};

export function mapStateToProps(state, ownProps) {
  const narmestelederId = ownProps.params.narmestelederId;
  const sykmeldt = state.sykmeldt.data;
  const dineSykmeldteMedSykmeldinger = state.dineSykmeldteMedSykmeldinger.data;
  let tilgang = { data: {} };
  const alleOppfolgingsdialogerReducer = state.oppfolgingsdialoger;
  let oppfolgingsdialogerReducer = {};
  let oppfolgingsdialoger = [];
  if (sykmeldt && sykmeldt.fnr && dineSykmeldteMedSykmeldinger) {
    tilgang = state.tilgang[sykmeldt.fnr] || tilgang;
    oppfolgingsdialogerReducer = state.oppfolgingsdialoger[sykmeldt.fnr] || {};

    oppfolgingsdialoger = oppfolgingsdialogerReducer.data
      ? populatePlanerPaVirksomhetKnyttetTilGyldigSykmelding(
          oppfolgingsdialogerReducer.data,
          sykmeldt.orgnummer,
          dineSykmeldteMedSykmeldinger,
          state
        )
      : [];
  }
  const harForsoektHentetOppfolgingsdialoger = alleOppfolgingsdialogerReducer.hentingForsokt;
  const harForsoektHentetAlt = harForsoektHentetOppfolgingsdialoger && forsoektHentetSykmeldt(state.sykmeldt);
  const erSykmeldtHentet = state.sykmeldt.hentet && !state.sykmeldt.hentingFeilet;
  return {
    henter:
      state.sykmeldt.henter ||
      state.dineSykmeldteMedSykmeldinger.henter ||
      alleOppfolgingsdialogerReducer.henter ||
      tilgang.henter ||
      !harForsoektHentetAlt ||
      (erSykmeldtHentet && sykmeldt && !tilgang.hentingForsokt),
    hentingFeilet:
      state.sykmeldt.hentingFeilet ||
      state.dineSykmeldteMedSykmeldinger.hentingFeilet ||
      alleOppfolgingsdialogerReducer.hentingFeilet ||
      tilgang.hentingFeilet,
    hentet:
      state.sykmeldt.hentet ||
      state.dineSykmeldteMedSykmeldinger.hentet ||
      harForsoektHentetOppfolgingsdialoger ||
      tilgang.hentet ||
      oppfolgingsdialogerReducer.opprettet,
    sender: oppfolgingsdialogerReducer.oppretter || state.kopierDialogReducer.sender,
    sendingFeilet: oppfolgingsdialogerReducer.opprettingFeilet || state.kopierDialogReducer.sendingFeilet,
    naermesteleder: state.naermesteleder,
    person: state.person,
    kopierDialogReducer: state.kopierDialogReducer,
    alleOppfolgingsdialogerReducer,
    oppfolgingsdialogerReducer,
    tilgang,
    virksomhet: state.virksomhet,
    narmestelederId,
    oppfolgingsdialoger,
    sykmeldt,
    dineSykmeldteMedSykmeldinger: dineSykmeldteMedSykmeldinger,
    sykmeldtReducer: state.sykmeldt,
    dineSykmeldteMedSykmeldingerReducer: state.dineSykmeldteMedSykmeldinger,
    kontaktinfo: state.kontaktinfo,
    brodsmuler: [
      {
        tittel: texts.brodsmuler.dineSykmeldte,
        sti: isLabs()
          ? 'https://sykefravaerarbeidsgiver.labs.nais.io/sykefravaerarbeidsgiver/'
          : '/sykefravaerarbeidsgiver',
        erKlikkbar: true,
      },
      {
        tittel: sykmeldt ? sykmeldt.navn : '',
        sti: isLabs()
          ? 'https://sykefravaerarbeidsgiver.labs.nais.io/sykefravaerarbeidsgiver/6f460a78-fef9-48b0-ac69-3585b7d9367c'
          : sykmeldt
          ? `/sykefravaerarbeidsgiver/${sykmeldt.narmestelederId}`
          : '',
        erKlikkbar: true,
      },
      {
        tittel: texts.brodsmuler.oppfolgingsplaner,
      },
    ],
  };
}

const OppfolgingsdialogerContainer = connect(mapStateToProps, {
  hentOppfolgingsplaner,
  kopierOppfolgingsdialog,
  opprettOppfolgingsdialogAg: opprettOppfolgingsplan,
  sjekkTilgang,
  giSamtykke,
  hentNaermesteLeder,
  hentVirksomhet,
  hentPerson,
  hentKontaktinfo,
  hentSykmeldt,
  hentDineSykmeldteMedSykmeldinger,
})(OppfolgingsplanerSide);

export default OppfolgingsdialogerContainer;
