import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sykmeldt as sykmeldtPt } from '../../shapes';
import {
  personReducerPt,
  kontaktinfoReducerPt,
  naermestelederReducerPt,
  oppfolgingsplanPt,
  virksomhetReducerPt,
} from '../../proptypes/opproptypes';
import {
  finnOgHentKontaktinfoSomMangler,
  finnOgHentNaermesteLedereSomMangler,
  finnOgHentPersonerSomMangler,
  finnOgHentVirksomheterSomMangler,
} from '../../utils/reducerUtils';
import OppfolgingsdialogerInnhold from './OppfolgingsdialogerInnhold';
import SykmeldtIngenKontaktinformasjon from './SykmeldtIngenKontaktinformasjon';
import AppSpinner from '../AppSpinner';

const erBrukerReservertMotKontakt = (kontaktinfo, fnr) => {
  return (
    kontaktinfo.data.filter((data) => {
      return data.fnr === fnr && !data.kontaktinfo.skalHaVarsel;
    }).length > 0
  );
};

class Oppfolgingsdialoger extends Component {
  constructor() {
    super();
    this.state = {
      settReservertVarsel: false,
    };
  }
  componentDidMount() {
    const {
      naermesteleder,
      oppfolgingsdialoger,
      virksomhet,
      person,
      kontaktinfo,
      hentNaermesteLeder,
      hentVirksomhet,
      hentPerson,
      hentKontaktinfo,
      sykmeldt,
    } = this.props;
    finnOgHentVirksomheterSomMangler(oppfolgingsdialoger, virksomhet, hentVirksomhet);
    finnOgHentPersonerSomMangler(oppfolgingsdialoger, person, hentPerson);
    finnOgHentNaermesteLedereSomMangler(oppfolgingsdialoger, naermesteleder, hentNaermesteLeder);
    finnOgHentKontaktinfoSomMangler(oppfolgingsdialoger, kontaktinfo, hentKontaktinfo);

    hentKontaktinfo(sykmeldt.fnr);
  }
  render() {
    const { kontaktinfo, sykmeldt } = this.props;
    if (kontaktinfo.henter.includes(sykmeldt.fnr)) {
      return <AppSpinner />;
    }
    if (erBrukerReservertMotKontakt(kontaktinfo, sykmeldt.fnr) && !this.state.settReservertVarsel) {
      return (
        <SykmeldtIngenKontaktinformasjon
          meldingSett={() => {
            this.setState({
              settReservertVarsel: true,
            });
          }}
        />
      );
    }
    return <OppfolgingsdialogerInnhold {...this.props} />;
  }
}

Oppfolgingsdialoger.propTypes = {
  kontaktinfo: kontaktinfoReducerPt,
  naermesteleder: naermestelederReducerPt,
  sykmeldt: sykmeldtPt,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  hentNaermesteLeder: PropTypes.func,
  hentPerson: PropTypes.func,
  hentVirksomhet: PropTypes.func,
  hentKontaktinfo: PropTypes.func,
  virksomhet: virksomhetReducerPt,
  person: personReducerPt,
};

export default Oppfolgingsdialoger;
