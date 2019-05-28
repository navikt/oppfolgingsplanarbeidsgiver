import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    finnOgHentNaermesteLedereSomMangler,
    finnOgHentVirksomheterSomMangler,
    finnOgHentPersonerSomMangler,
    finnOgHentKontaktinfoSomMangler,
} from 'oppfolgingsdialog-npm';
import {
    sykmeldt as sykmeldtPt,
} from '../../shapes';
import {
    personReducerPt,
    kontaktinfoReducerPt,
    naermestelederReducerPt,
    oppfolgingsdialogPt,
    virksomhetReducerPt,
} from '../../proptypes/opproptypes';
import history from '../../history';
import OppfolgingsdialogerInnhold from './OppfolgingsdialogerInnhold';
import SykmeldtIngenKontaktinformasjon from './SykmeldtIngenKontaktinformasjon';
import AppSpinner from '../AppSpinner';
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';
import { getContextRoot } from '../../routers/paths';

export const AvkreftetLederInfoboks = () => {
    return (<OppfolgingsplanInfoboks
        svgUrl={`${getContextRoot()}/img/svg/ny-naermesteleder-slettet.svg`}
        svgAlt="Leder"
        tittel={getLedetekst('oppfolgingsdialog.arbeidsgiver.avkreftetLederInfoboks.tittel')}
        tekst={getLedetekst('oppfolgingsdialog.arbeidsgiver.avkreftetLederInfoboks.tekst')}
    >
        <div className="knapperad">
            <Hovedknapp className="knapperad__element" onClick={() => { history.push(getContextRoot()); }}>
                {getLedetekst('oppfolgingsdialog.knapp.tilbake-forsiden')}
            </Hovedknapp>
        </div>
    </OppfolgingsplanInfoboks>);
};

const erBrukerReservertMotKontakt = (kontaktinfo, fnr) => {
    return kontaktinfo.data.filter((data) => {
        return data.fnr === fnr && !data.kontaktinfo.skalHaVarsel;
    }).length > 0;
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
        const { kontaktinfo, sykmeldt, slettetSykmeldt } = this.props;
        if (kontaktinfo.henter.includes(sykmeldt.fnr)) {
            return <AppSpinner />;
        }
        if (slettetSykmeldt) {
            return <AvkreftetLederInfoboks />;
        }
        if (erBrukerReservertMotKontakt(kontaktinfo, sykmeldt.fnr) && !this.state.settReservertVarsel) {
            return (<SykmeldtIngenKontaktinformasjon
                meldingSett={() => {
                    this.setState({
                        settReservertVarsel: true,
                    });
                }}
            />);
        }
        return <OppfolgingsdialogerInnhold {...this.props} />;
    }
}

Oppfolgingsdialoger.propTypes = {
    kontaktinfo: kontaktinfoReducerPt,
    naermesteleder: naermestelederReducerPt,
    sykmeldt: sykmeldtPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsdialogPt),
    hentNaermesteLeder: PropTypes.func,
    hentPerson: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentKontaktinfo: PropTypes.func,
    virksomhet: virksomhetReducerPt,
    person: personReducerPt,
    slettetSykmeldt: PropTypes.bool,
};

export default Oppfolgingsdialoger;
