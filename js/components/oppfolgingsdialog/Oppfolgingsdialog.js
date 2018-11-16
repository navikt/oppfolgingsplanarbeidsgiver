import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue, togglesPt, sykeforlopsPerioderReducerPt } from 'digisyfo-npm';
import {
    SideOverskrift,
    NavigasjonsTopp,
    NavigasjonsBunn,
    BRUKERTYPE,
    Godkjenn,
    Godkjenninger,
    ReleasetPlan,
    Samtykke,
    AvbruttGodkjentPlanVarsel,
    finnOgHentVirksomheterSomMangler,
    finnOgHentNaermesteLedereSomMangler,
    finnOgHentKontaktinfoSomMangler,
    finnOgHentPersonerSomMangler,
    finnOgHentArbeidsforholdSomMangler,
    finnOgHentSykeforlopsPerioderSomMangler,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';
import Arbeidsoppgaver from './utfylling/Arbeidsoppgaver';
import Tiltak from './utfylling/Tiltak';

const manglerSamtykke = (oppfolgingsdialog) => {
    return oppfolgingsdialog.arbeidsgiver.naermesteLeder.samtykke === null;
};

const inneholderGodkjentPlan = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjentPlan;
};

const inneholderGodkjenninger = (oppfolgingsdialog) => {
    return oppfolgingsdialog && oppfolgingsdialog.godkjenninger.length > 0;
};

const inneholderGodkjenningerAvArbeidsgiver = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.length > 0
        && oppfolgingsdialog.godkjenninger[0].godkjent
        && oppfolgingsdialog.godkjenninger[0].godkjentAv.fnr === oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr;
};

const skalViseSamtykke = (oppfolgingsdialog) => {
    return manglerSamtykke(oppfolgingsdialog)
        && (inneholderGodkjentPlan(oppfolgingsdialog) || inneholderGodkjenningerAvArbeidsgiver(oppfolgingsdialog));
};

export const erAvvistAvArbeidsgiver = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.length === 1
        && !oppfolgingsdialog.godkjenninger[0].godkjent
        && oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr === oppfolgingsdialog.godkjenninger[0].godkjentAv.fnr;
};

export const erTvangsgodkjent = (oppfolgingsdialog) => {
    return inneholderGodkjentPlan(oppfolgingsdialog) && oppfolgingsdialog.godkjentPlan.tvungenGodkjenning;
};

class Oppfolgingsdialog extends Component {
    componentWillMount() {
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
            ledetekster,
            settAktivtSteg,
            avvisDialogAg,
            avbrytDialog,
            dokument,
            godkjennDialogAg,
            hentPdfurler,
            giSamtykke,
            navigasjontoggles,
            toggleAvvisPlan,
            nullstillGodkjenning,
            lagreTiltak,
            slettTiltak,
            lagreArbeidsoppgave,
            slettArbeidsoppgave,
            lagreKommentar,
            slettKommentar,
            koblingId,
            toggles,
            delMedNavFunc,
            delmednav,
            fastlegeDeling,
            delMedFastlege,
            forespoerselRevidering,
            forespoerRevidering,
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
                ledetekster={ledetekster}
                rootUrl={`${getContextRoot()}`}
            />);
        } else if (inneholderGodkjenninger(oppfolgingsdialog) && !erAvvistAvArbeidsgiver(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<Godkjenninger
                avvisDialog={avvisDialogAg}
                oppfolgingsdialog={oppfolgingsdialog}
                godkjennPlan={godkjennDialogAg}
                ledetekster={ledetekster}
                toggleAvvisPlan={toggleAvvisPlan}
                nullstillGodkjenning={nullstillGodkjenning}
                brukerType={BRUKERTYPE.ARBEIDSGIVER}
                rootUrl={`${getContextRoot()}`}
                rootUrlPlaner={`${getContextRoot()}/${koblingId}`}
                koblingId={koblingId}
            />);
        } else if (inneholderGodkjentPlan(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<ReleasetPlan
                ledetekster={ledetekster}
                toggles={toggles}
                oppfolgingsdialog={oppfolgingsdialog}
                hentPdfurler={hentPdfurler}
                dokument={dokument}
                giSamtykke={giSamtykke}
                avbrytDialog={avbrytDialog}
                brukerType={BRUKERTYPE.ARBEIDSGIVER}
                rootUrl={`${getContextRoot()}`}
                rootUrlPlaner={`${getContextRoot()}/${koblingId}`}
                delMedNavFunc={delMedNavFunc}
                delmednav={delmednav}
                fastlegeDeling={fastlegeDeling}
                delMedFastlege={delMedFastlege}
                oppfolgingsdialoger={oppfolgingsdialoger}
            />);
        } else {
            (() => {
                if (navigasjontoggles.steg === 1) {
                    panel = (<Arbeidsoppgaver
                        arbeidsoppgaver={arbeidsoppgaver}
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        lagreArbeidsoppgave={lagreArbeidsoppgave}
                        slettArbeidsoppgave={slettArbeidsoppgave}
                    />);
                } else if (navigasjontoggles.steg === 2) {
                    panel = (<Tiltak
                        tiltak={tiltak}
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        lagreTiltak={lagreTiltak}
                        slettTiltak={slettTiltak}
                        lagreKommentar={lagreKommentar}
                        slettKommentar={slettKommentar}
                    />);
                } else {
                    panel = (<Godkjenn
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        forespoerselRevidering={forespoerselRevidering}
                        forespoerRevidering={forespoerRevidering}
                        godkjennPlan={godkjennDialogAg}
                        brukerType={BRUKERTYPE.ARBEIDSGIVER}
                        settAktivtSteg={settAktivtSteg}
                        rootUrl={`${getContextRoot()}`}
                    />);
                }
            })();
        }
        return (
            <div className="oppfolgingsdialog">
                { oppfolgingsdialogAvbruttOgNyOpprettet &&
                <AvbruttGodkjentPlanVarsel
                    tekst={getLedetekst('oppfolgingdialog.avbruttGodkjentPlanVarsel.opprettet-plan')}
                    rootUrl={`${getContextRoot()}`}
                />
                }
                <SideOverskrift tittel={oppfolgingsdialog.arbeidstaker.navn} />
                { !disableNavigation && <NavigasjonsTopp
                    ledetekster={ledetekster}
                    disabled={disableNavigation}
                    settAktivtSteg={settAktivtSteg}
                    steg={navigasjontoggles.steg}
                />
                }
                <div id="oppfolgingsdialogpanel">
                    { panel }
                </div>
                <NavigasjonsBunn
                    ledetekster={ledetekster}
                    disabled={disableNavigation}
                    settAktivtSteg={settAktivtSteg}
                    steg={navigasjontoggles.steg}
                    rootUrlPlaner={`${getContextRoot()}/${koblingId}`}
                />
            </div>
        );
    }
}

Oppfolgingsdialog.propTypes = {
    arbeidsforhold: oppfolgingProptypes.arbeidsforholdReducerPt,
    avbrytdialogReducer: oppfolgingProptypes.avbrytdialogReducerPt,
    arbeidsoppgaver: oppfolgingProptypes.arbeidsoppgaverReducerPt,
    dokument: oppfolgingProptypes.dokumentReducerPt,
    delmednav: oppfolgingProptypes.delmednavPt,
    fastlegeDeling: oppfolgingProptypes.delMedFastlegePt,
    forespoerselRevidering: oppfolgingProptypes.forespoerselRevideringPt,
    kontaktinfo: oppfolgingProptypes.kontaktinfoReducerPt,
    naermesteleder: oppfolgingProptypes.naermestelederReducerPt,
    navigasjontoggles: oppfolgingProptypes.navigasjonstogglesReducerPt,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    koblingId: PropTypes.string,
    ledetekster: keyValue,
    person: oppfolgingProptypes.personReducerPt,
    tiltak: oppfolgingProptypes.tiltakReducerPt,
    toggles: togglesPt,
    virksomhet: oppfolgingProptypes.virksomhetReducerPt,
    sykeforlopsPerioderReducer: sykeforlopsPerioderReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
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
    forespoerRevidering: PropTypes.func,
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
    toggleAvvisPlan: PropTypes.func,
    hentSykeforlopsPerioder: PropTypes.func,
};

export default Oppfolgingsdialog;
