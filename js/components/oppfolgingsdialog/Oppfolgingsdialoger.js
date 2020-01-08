import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    sykmeldt as sykmeldtPt,
} from '../../shapes';
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
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';
import { getContextRoot, getDineSykmeldteRoot } from '../../routers/paths';

const texts = {
    avkreftetLederInfoboks: {
        title: 'Takk for beskjeden!',
        info: 'Bedriften din vil nå få beskjed om at de må melde inn en ny leder.',
        buttonBack: 'Tilbake til forsiden',
    },
};

export const AvkreftetLederInfoboks = () => {
    return (<OppfolgingsplanInfoboks
        svgUrl={`${getContextRoot()}/img/svg/ny-naermesteleder-slettet.svg`}
        svgAlt="Leder"
        tittel={texts.avkreftetLederInfoboks.title}
        tekst={texts.avkreftetLederInfoboks.info}
    >
        <div className="knapperad">
            <a className="knapp knapp--hoved knapperad__element" href={getDineSykmeldteRoot()}>
                {texts.avkreftetLederInfoboks.buttonBack}
            </a>
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
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
    hentNaermesteLeder: PropTypes.func,
    hentPerson: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentKontaktinfo: PropTypes.func,
    virksomhet: virksomhetReducerPt,
    person: personReducerPt,
    slettetSykmeldt: PropTypes.bool,
};

export default Oppfolgingsdialoger;
