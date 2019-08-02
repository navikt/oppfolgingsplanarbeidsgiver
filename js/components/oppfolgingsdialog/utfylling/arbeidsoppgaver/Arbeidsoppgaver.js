import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
    getLedetekst,
    keyValue,
    scrollTo,
} from 'digisyfo-npm';
import {
    ArbeidsoppgaverListe,
    LagreArbeidsoppgaveSkjemaAG,
} from 'oppfolgingsdialog-npm';
import { sorterArbeidsoppgaverEtterOpprettet } from '../../../../utils/arbeidsoppgaveUtils';
import { captitalizeFirstLetter } from '../../../../utils/tekstUtils';
import * as opProptypes from '../../../../proptypes/opproptypes';
import { getContextRoot } from '../../../../routers/paths';
import { isEmpty } from '../../../../utils/oppfolgingsplanUtils';
import OppfolgingsplanInfoboks from '../../../app/OppfolgingsplanInfoboks';
import LeggTilElementKnapper from '../LeggTilElementKnapper';
import ArbeidsoppgaverInfoboks from './ArbeidsoppgaverInfoboks';
import { BRUKERTYPE } from '../../../../konstanter';

class Arbeidsoppgaver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visArbeidsoppgaveSkjema: false,
            nyArbeidsoppgave: false,
            oppdatertArbeidsoppgave: false,
            lagreNyOppgaveFeilet: false,
            varselTekst: '',
            oppdateringFeilet: false,
        };
        window.location.hash = 'arbeidsoppgaver';
        window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
        this.sendLagreArbeidsoppgave = this.sendLagreArbeidsoppgave.bind(this);
        this.sendSlettArbeidsoppgave = this.sendSlettArbeidsoppgave.bind(this);
        this.toggleArbeidsoppgaveSkjema = this.toggleArbeidsoppgaveSkjema.bind(this);
        this.scrollToForm = this.scrollToForm.bind(this);
        this.visOppdateringFeilet = this.visOppdateringFeilet.bind(this);
        this.skjulSkjema = this.skjulSkjema.bind(this);
    }

    componentDidMount() {
        if (this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visArbeidsoppgaveSkjema && this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.arbeidsoppgaver.feiletOppgaveId
            && nextProps.arbeidsoppgaver.lagringFeilet
            && this.props.arbeidsoppgaver.lagringFeilet !== nextProps.arbeidsoppgaver.lagringFeilet) {
            this.setState({
                lagreNyOppgaveFeilet: true,
                visArbeidsoppgaveSkjema: true,
                varselTekst: getLedetekst('oppfolgingsdialog.oppdatering.feilmelding', this.props.ledetekster),
            });
        }
    }

    visOppdateringFeilet(feilet) {
        this.setState({
            oppdateringFeilet: feilet,
            lagreNyOppgaveFeilet: false,
        });
    }

    sendLagreArbeidsoppgave(values) {
        const { oppfolgingsdialog } = this.props;
        if (!values.arbeidsoppgaveId) {
            this.state.nyArbeidsoppgave = true;
        } else {
            this.state.oppdatertArbeidsoppgave = true;
        }
        const nyeValues = Object.assign({}, values, {
            arbeidsoppgavenavn: captitalizeFirstLetter(values.arbeidsoppgavenavn),
        });
        this.props.lagreArbeidsoppgave(oppfolgingsdialog.id, nyeValues, oppfolgingsdialog.arbeidstaker.fnr);
        this.setState({
            visArbeidsoppgaveSkjema: false,
        });
    }

    sendSlettArbeidsoppgave(arbeidsoppgaveId) {
        const { oppfolgingsdialog } = this.props;
        this.props.slettArbeidsoppgave(oppfolgingsdialog.id, arbeidsoppgaveId, oppfolgingsdialog.arbeidstaker.fnr);
    }

    toggleArbeidsoppgaveSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
        });
    }

    scrollToForm() {
        const form = findDOMNode(this.lagreSkjema);
        scrollTo(form, 300);
    }

    skjulSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: false,
            lagreNyOppgaveFeilet: false,
        });
    }

    render() {
        const {
            ledetekster,
            oppfolgingsdialog,
            arbeidsoppgaver,
        } = this.props;
        return (
            (() => {
                return isEmpty(oppfolgingsdialog.arbeidsoppgaveListe) ?
                    <div>
                        { this.state.visArbeidsoppgaveSkjema && <ArbeidsoppgaverInfoboks
                            tittel={getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.tittel.arbeidsgiver')}
                            visSkjema={this.state.visArbeidsoppgaveSkjema}
                            toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                        >
                            { oppfolgingsdialog.arbeidstaker.stillinger.length > 0 &&
                            <div>
                                { oppfolgingsdialog.arbeidstaker.stillinger.map((stilling, idx) => {
                                    return (<p key={idx}>
                                        {getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.arbeidsgiver.stilling', {
                                            '%YRKE%': stilling.yrke.toLowerCase(),
                                            '%PROSENT%': stilling.prosent,
                                        })}
                                    </p>);
                                })
                                }
                            </div>
                            }
                        </ArbeidsoppgaverInfoboks>
                        }
                        {
                            !this.state.visArbeidsoppgaveSkjema ?
                                <OppfolgingsplanInfoboks
                                    svgUrl={`${getContextRoot()}/img/svg/arbeidsoppgave-onboarding.svg`}
                                    svgAlt="nyArbeidsoppgave"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidsgiver.onboarding.arbeidsoppgave.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidsgiver.onboarding.arbeidsoppgave.tekst')}
                                >
                                    <LeggTilElementKnapper
                                        ledetekster={ledetekster}
                                        visSkjema={this.state.visArbeidsoppgaveSkjema}
                                        toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                                    />
                                </OppfolgingsplanInfoboks> :
                                <LagreArbeidsoppgaveSkjemaAG
                                    ledetekster={ledetekster}
                                    toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                                    varselTekst={this.state.varselTekst}
                                    oppdateringFeilet={this.state.lagreNyOppgaveFeilet}
                                    arbeidsoppgaverReducer={arbeidsoppgaver}
                                    avbryt={this.skjulSkjema}
                                    onSubmit={this.sendLagreArbeidsoppgave}
                                    rootUrlImg={getContextRoot()}
                                />
                        }

                    </div>
                    :
                    <div>
                        <ArbeidsoppgaverInfoboks
                            tittel={getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.tittel.arbeidsgiver')}
                            visSkjema={this.state.visArbeidsoppgaveSkjema}
                            toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                        >
                            { oppfolgingsdialog.arbeidstaker.stillinger.length > 0 &&
                            <div>
                                { oppfolgingsdialog.arbeidstaker.stillinger.map((stilling, idx) => {
                                    return (<p key={idx}>
                                        {getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.arbeidsgiver.stilling', {
                                            '%YRKE%': stilling.yrke.toLowerCase(),
                                            '%PROSENT%': stilling.prosent,
                                        })}
                                    </p>);
                                })
                                }
                            </div>
                            }
                        </ArbeidsoppgaverInfoboks>
                        {
                            this.state.visArbeidsoppgaveSkjema &&
                            <LagreArbeidsoppgaveSkjemaAG
                                ledetekster={ledetekster}
                                onSubmit={this.sendLagreArbeidsoppgave}
                                avbryt={this.skjulSkjema}
                                ref={(lagreSkjema) => {
                                    this.lagreSkjema = lagreSkjema;
                                }}
                                varselTekst={this.state.varselTekst}
                                oppdateringFeilet={this.state.lagreNyOppgaveFeilet}
                                arbeidsoppgaverReducer={arbeidsoppgaver}
                                rootUrlImg={getContextRoot()}
                            />
                        }
                        <ArbeidsoppgaverListe
                            ledetekster={ledetekster}
                            liste={sorterArbeidsoppgaverEtterOpprettet(oppfolgingsdialog.arbeidsoppgaveListe)}
                            sendLagre={this.sendLagreArbeidsoppgave}
                            sendSlett={this.sendSlettArbeidsoppgave}
                            fnr={oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr}
                            brukerType={BRUKERTYPE.ARBEIDSGIVER}
                            rootUrlImg={`${getContextRoot()}`}
                            visFeilMelding={this.visOppdateringFeilet}
                            feilMelding={this.state.oppdateringFeilet}
                        />
                    </div>;
            })()
        );
    }
}

Arbeidsoppgaver.propTypes = {
    ledetekster: keyValue,
    arbeidsoppgaver: opProptypes.arbeidsoppgaverReducerPt,
    oppfolgingsdialog: opProptypes.oppfolgingsdialogPt,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
};

export default Arbeidsoppgaver;
