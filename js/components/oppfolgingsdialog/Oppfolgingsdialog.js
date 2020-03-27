import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { sykeforlopsPerioderReducerPt } from '@navikt/digisyfo-npm';
import * as opProptypes from '../../proptypes/opproptypes';
import {
    finnOgHentArbeidsforholdSomMangler,
    finnOgHentKontaktinfoSomMangler,
    finnOgHentNaermesteLedereSomMangler,
    finnOgHentPersonerSomMangler,
    finnOgHentSykeforlopsPerioderSomMangler,
    finnOgHentVirksomheterSomMangler,
} from '../../utils/reducerUtils';
import { getContextRoot } from '../../routers/paths';
import Arbeidsoppgaver from './utfylling/arbeidsoppgaver/Arbeidsoppgaver';
import Tiltak from './utfylling/tiltak/Tiltak';
import SideOverskrift from '../oppfolgingsdialog/SideOverskrift';
import AvbruttGodkjentPlanVarsel from '../oppfolgingsdialog/AvbruttGodkjentPlanVarsel';
import NavigasjonsBunn from '../oppfolgingsdialog/NavigasjonsBunn';
import NavigasjonsTopp from '../oppfolgingsdialog/NavigasjonsTopp';
import Samtykke from '../oppfolgingsdialog/godkjennplan/samtykke/Samtykke';
import Godkjenn from './godkjennplan/Godkjenn';
import Godkjenninger from './godkjennplan/godkjenninger/Godkjenninger';
import ReleasetPlan from './godkjennplan/releasetplan/ReleasetPlan';

const midlertidigTekstFastlegedeling = 'Det er for tiden ikke mulig å dele oppfølgingsplaner med fastlegen på grunn av endringer '
                                     + 'i registre utenfor NAV som ikke er varslet. Vi jobber med å tilpasse våre systemer.';

const MidlertidigAlertStripeFastlegedeling = () => {
    return (<Alertstripe
        className="alertstripe--notifikasjonboks"
        type="info"
        solid>
        {midlertidigTekstFastlegedeling}
    </Alertstripe>);
};

const manglerSamtykke = (oppfolgingsplan) => {
    return oppfolgingsplan.arbeidsgiver.naermesteLeder.samtykke === null;
};

const inneholderGodkjentPlan = (oppfolgingsplan) => {
    return oppfolgingsplan.godkjentPlan;
};

const inneholderGodkjenninger = (oppfolgingsplan) => {
    return oppfolgingsplan && oppfolgingsplan.godkjenninger.length > 0;
};

const inneholderGodkjenningerAvArbeidsgiver = (oppfolgingsplan) => {
    return oppfolgingsplan.godkjenninger.length > 0
        && oppfolgingsplan.godkjenninger[0].godkjent
        && oppfolgingsplan.godkjenninger[0].godkjentAv.fnr === oppfolgingsplan.arbeidsgiver.naermesteLeder.fnr;
};

const skalViseSamtykke = (oppfolgingsplan) => {
    return manglerSamtykke(oppfolgingsplan)
        && (inneholderGodkjentPlan(oppfolgingsplan) || inneholderGodkjenningerAvArbeidsgiver(oppfolgingsplan));
};

export const erAvvistAvArbeidsgiver = (oppfolgingsplan) => {
    return oppfolgingsplan.godkjenninger.length === 1
        && !oppfolgingsplan.godkjenninger[0].godkjent
        && oppfolgingsplan.arbeidsgiver.naermesteLeder.fnr === oppfolgingsplan.godkjenninger[0].godkjentAv.fnr;
};

export const erTvangsgodkjent = (oppfolgingsplan) => {
    return inneholderGodkjentPlan(oppfolgingsplan) && oppfolgingsplan.godkjentPlan.tvungenGodkjenning;
};

class Oppfolgingsdialog extends Component {
    componentDidMount() {
        const {
            oppfolgingsdialog,
            virksomhet,
            person,
            kontaktinfo,
            naermesteleder,
            arbeidsforhold,
            hentVirksomhet,
            hentPerson,
            hentNaermesteLeder,
            hentKontaktinfo,
            hentArbeidsforhold,
            sykeforlopsPerioderReducer,
            hentSykeforlopsPerioder,
        } = this.props;

        this.props.settDialog(oppfolgingsdialog.id);
        finnOgHentVirksomheterSomMangler([oppfolgingsdialog], virksomhet, hentVirksomhet);
        finnOgHentPersonerSomMangler([oppfolgingsdialog], person, hentPerson);
        finnOgHentNaermesteLedereSomMangler([oppfolgingsdialog], naermesteleder, hentNaermesteLeder);
        finnOgHentKontaktinfoSomMangler([oppfolgingsdialog], kontaktinfo, hentKontaktinfo);
        finnOgHentArbeidsforholdSomMangler([oppfolgingsdialog], arbeidsforhold, hentArbeidsforhold);
        finnOgHentSykeforlopsPerioderSomMangler([oppfolgingsdialog], sykeforlopsPerioderReducer, hentSykeforlopsPerioder);
    }

    render() {
        const {
            arbeidsoppgaver,
            tiltak,
            oppfolgingsdialog,
            settAktivtSteg,
            avvisDialogAg,
            avbrytDialog,
            dokument,
            godkjennDialogAg,
            hentPdfurler,
            giSamtykke,
            navigasjontoggles,
            nullstillGodkjenning,
            lagreTiltak,
            slettTiltak,
            lagreArbeidsoppgave,
            slettArbeidsoppgave,
            lagreKommentar,
            slettKommentar,
            koblingId,
            delMedNavFunc,
            delmednav,
            fastlegeDeling,
            delMedFastlege,
            oppfolgingsdialoger,
        } = this.props;
        const oppfolgingsdialogAvbruttOgNyOpprettet = this.props.avbrytdialogReducer.sendt
            && (this.props.avbrytdialogReducer.nyPlanId === oppfolgingsdialog.id)
            && !(inneholderGodkjenninger(oppfolgingsdialog) || erTvangsgodkjent(oppfolgingsdialog));
        let panel;
        let disableNavigation = false;
        if (skalViseSamtykke(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<Samtykke
                sendSamtykke={giSamtykke}
                oppfolgingsdialog={oppfolgingsdialog}
            />);
        } else if (inneholderGodkjenninger(oppfolgingsdialog) && !erAvvistAvArbeidsgiver(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<Godkjenninger
                avvisDialog={avvisDialogAg}
                oppfolgingsplan={oppfolgingsdialog}
                godkjennPlan={godkjennDialogAg}
                nullstillGodkjenning={nullstillGodkjenning}
                rootUrlPlaner={`${getContextRoot()}/${koblingId}`}
            />);
        } else if (inneholderGodkjentPlan(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<ReleasetPlan
                oppfolgingsplan={oppfolgingsdialog}
                hentPdfurler={hentPdfurler}
                dokument={dokument}
                giSamtykke={giSamtykke}
                avbrytDialog={avbrytDialog}
                rootUrl={`${getContextRoot()}`}
                rootUrlPlaner={`${getContextRoot()}/${koblingId}`}
                delMedNavFunc={delMedNavFunc}
                delmednav={delmednav}
                fastlegeDeling={fastlegeDeling}
                delMedFastlege={delMedFastlege}
                oppfolgingsplaner={oppfolgingsdialoger}
            />);
        } else {
            (() => {
                if (navigasjontoggles.steg === 1) {
                    panel = (<Arbeidsoppgaver
                        arbeidsoppgaver={arbeidsoppgaver}
                        oppfolgingsdialog={oppfolgingsdialog}
                        lagreArbeidsoppgave={lagreArbeidsoppgave}
                        slettArbeidsoppgave={slettArbeidsoppgave}
                    />);
                } else if (navigasjontoggles.steg === 2) {
                    panel = (<Tiltak
                        tiltak={tiltak}
                        oppfolgingsdialog={oppfolgingsdialog}
                        lagreTiltak={lagreTiltak}
                        slettTiltak={slettTiltak}
                        lagreKommentar={lagreKommentar}
                        slettKommentar={slettKommentar}
                    />);
                } else {
                    panel = (<Godkjenn
                        oppfolgingsplan={oppfolgingsdialog}
                        godkjennPlan={godkjennDialogAg}
                        settAktivtSteg={settAktivtSteg}
                        rootUrl={`${getContextRoot()}`}
                    />);
                }
            })();
        }
        return (
            <div className="oppfolgingsdialog">
                { oppfolgingsdialogAvbruttOgNyOpprettet && <AvbruttGodkjentPlanVarsel /> }
                <MidlertidigAlertStripeFastlegedeling />
                <SideOverskrift tittel={oppfolgingsdialog.arbeidstaker.navn} />
                { !disableNavigation && <NavigasjonsTopp
                    disabled={disableNavigation}
                    settAktivtSteg={settAktivtSteg}
                    steg={navigasjontoggles.steg}
                />
                }
                <div id="oppfolgingsdialogpanel">
                    { panel }
                </div>
                <NavigasjonsBunn
                    disabled={disableNavigation}
                    settAktivtSteg={settAktivtSteg}
                    steg={navigasjontoggles.steg}
                    koblingId={koblingId}
                />
            </div>
        );
    }
}

Oppfolgingsdialog.propTypes = {
    arbeidsforhold: opProptypes.arbeidsforholdReducerPt,
    avbrytdialogReducer: opProptypes.avbrytdialogReducerPt,
    arbeidsoppgaver: opProptypes.arbeidsoppgaverReducerPt,
    dokument: opProptypes.dokumentReducerPt,
    delmednav: opProptypes.delmednavPt,
    fastlegeDeling: opProptypes.delMedFastlegePt,
    kontaktinfo: opProptypes.kontaktinfoReducerPt,
    naermesteleder: opProptypes.naermestelederReducerPt,
    navigasjontoggles: opProptypes.navigasjonstogglesReducerPt,
    oppfolgingsdialog: opProptypes.oppfolgingsplanPt,
    koblingId: PropTypes.string,
    person: opProptypes.personReducerPt,
    tiltak: opProptypes.tiltakReducerPt,
    virksomhet: opProptypes.virksomhetReducerPt,
    sykeforlopsPerioderReducer: sykeforlopsPerioderReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(opProptypes.oppfolgingsplanPt),
    lagreKommentar: PropTypes.func,
    slettKommentar: PropTypes.func,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    avbrytDialog: PropTypes.func,
    avvisDialogAg: PropTypes.func,
    delMedFastlege: PropTypes.func,
    delMedNavFunc: PropTypes.func,
    giSamtykke: PropTypes.func,
    godkjennDialogAg: PropTypes.func,
    hentPerson: PropTypes.func,
    hentArbeidsforhold: PropTypes.func,
    hentKontaktinfo: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentPdfurler: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    settDialog: PropTypes.func,
    hentSykeforlopsPerioder: PropTypes.func,
};

export default Oppfolgingsdialog;
