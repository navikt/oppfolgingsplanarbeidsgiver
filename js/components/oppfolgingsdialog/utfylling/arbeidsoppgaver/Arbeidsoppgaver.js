import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { scrollTo } from '@navikt/digisyfo-npm';
import { sorterArbeidsoppgaverEtterOpprettet } from '../../../../utils/arbeidsoppgaveUtils';
import { capitalizeFirstLetter } from '../../../../utils/tekstUtils';
import * as opProptypes from '../../../../proptypes/opproptypes';
import { getContextRoot } from '../../../../routers/paths';
import { isEmpty } from '../../../../utils/oppfolgingsplanUtils';
import OppfolgingsplanInfoboks from '../../../app/OppfolgingsplanInfoboks';
import LeggTilElementKnapper from '../LeggTilElementKnapper';
import ArbeidsoppgaverListe from './ArbeidsoppgaverListe';
import ArbeidsoppgaverInfoboks from './ArbeidsoppgaverInfoboks';
import LagreArbeidsoppgaveSkjema from './LagreArbeidsoppgaveSkjema';
import StegTittel from "../StegTittel";
import ObligatoriskeFelterInfotekst from "../ObligatoriskeFelterInfotekst";

const texts = {
    tittel: 'Arbeidsoppgaver',
    updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
    infoboks: {
        title: 'Hva er arbeidsoppgavene?',
        info: `
            Både du og arbeidstakeren kan legge inn oppgaver, men det er bare arbeidstakeren som kan ta stilling til om det er mulig å gjøre noen av dem underveis i sykefraværet.
        `,
    },
    arbeidsoppgaverInfoboksStilling: {
        title: 'Legg til arbeidsoppgaver',
    },
};

const textStilling = (stilling) => {
    return `Den sykmeldte jobber som  ${stilling.yrke.toLowerCase()} ${stilling.prosent} %`;
};

export const ArbeidsoppgaverInfoboksStilling = (
    {
        oppfolgingsplan,
        visArbeidsoppgaveSkjema,
        toggleArbeidsoppgaveSkjema,
    }) => {
    return (
        <ArbeidsoppgaverInfoboks
            tittel={texts.arbeidsoppgaverInfoboksStilling.title}
            visSkjema={visArbeidsoppgaveSkjema}
            toggleSkjema={toggleArbeidsoppgaveSkjema}
        >
            { oppfolgingsplan.arbeidstaker.stillinger.length > 0 &&
            <div>
                { oppfolgingsplan.arbeidstaker.stillinger.map((stilling, idx) => {
                    return (<p key={idx}>
                        {textStilling(stilling)}
                    </p>);
                })
                }
            </div>
            }
        </ArbeidsoppgaverInfoboks>);
};

ArbeidsoppgaverInfoboksStilling.propTypes = {
    oppfolgingsplan: opProptypes.oppfolgingsplanPt,
    visArbeidsoppgaveSkjema: PropTypes.bool,
    toggleArbeidsoppgaveSkjema: PropTypes.func,
};

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
        this.formRef = React.createRef();
    }

    componentDidMount() {
        if (this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        } else {
            window.scrollTo(0, this.formRef.current.offsetTop);
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
                varselTekst: texts.updateError,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visArbeidsoppgaveSkjema && this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
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
            arbeidsoppgavenavn: capitalizeFirstLetter(values.arbeidsoppgavenavn),
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
            oppfolgingsdialog,
            arbeidsoppgaver,
        } = this.props;
        return (
            (() => {
                return (
                    <div>
                        <StegTittel tittel={texts.tittel}/>
                        <ObligatoriskeFelterInfotekst/>
                        {isEmpty(oppfolgingsdialog.arbeidsoppgaveListe) ?
                            <div ref={this.formRef}>
                                {this.state.visArbeidsoppgaveSkjema &&
                                <ArbeidsoppgaverInfoboksStilling
                                    oppfolgingsplan={oppfolgingsdialog}
                                    visArbeidsoppgaveSkjema={this.state.visArbeidsoppgaveSkjema}
                                    toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                                />
                                }
                                {
                                    !this.state.visArbeidsoppgaveSkjema ?
                                        <OppfolgingsplanInfoboks
                                            svgUrl={`${getContextRoot()}/img/svg/arbeidsoppgave-onboarding.svg`}
                                            svgAlt="nyArbeidsoppgave"
                                            tittel={texts.infoboks.title}
                                            tekst={texts.infoboks.info}
                                        >
                                            <LeggTilElementKnapper
                                                visSkjema={this.state.visArbeidsoppgaveSkjema}
                                                toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                                            />
                                        </OppfolgingsplanInfoboks> :
                                        <LagreArbeidsoppgaveSkjema
                                            toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                                            varselTekst={this.state.varselTekst}
                                            oppdateringFeilet={this.state.lagreNyOppgaveFeilet}
                                            arbeidsoppgaverReducer={arbeidsoppgaver}
                                            avbryt={this.skjulSkjema}
                                            onSubmit={this.sendLagreArbeidsoppgave}
                                        />
                                }

                            </div>
                            :
                            <div ref={this.formRef}>
                                <ArbeidsoppgaverInfoboksStilling
                                    oppfolgingsplan={oppfolgingsdialog}
                                    visArbeidsoppgaveSkjema={this.state.visArbeidsoppgaveSkjema}
                                    toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                                />
                                {
                                    this.state.visArbeidsoppgaveSkjema &&
                                    <LagreArbeidsoppgaveSkjema
                                        onSubmit={this.sendLagreArbeidsoppgave}
                                        avbryt={this.skjulSkjema}
                                        ref={(lagreSkjema) => {
                                            this.lagreSkjema = lagreSkjema;
                                        }}
                                        varselTekst={this.state.varselTekst}
                                        oppdateringFeilet={this.state.lagreNyOppgaveFeilet}
                                        arbeidsoppgaverReducer={arbeidsoppgaver}
                                    />
                                }
                                <ArbeidsoppgaverListe
                                    liste={sorterArbeidsoppgaverEtterOpprettet(oppfolgingsdialog.arbeidsoppgaveListe)}
                                    sendSlett={this.sendSlettArbeidsoppgave}
                                    fnr={oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr}
                                    visFeilMelding={this.visOppdateringFeilet}
                                    feilMelding={this.state.oppdateringFeilet}
                                />
                            </div>}
                    </div>
                )
            })()
        );
    }
}

Arbeidsoppgaver.propTypes = {
    arbeidsoppgaver: opProptypes.arbeidsoppgaverReducerPt,
    oppfolgingsdialog: opProptypes.oppfolgingsplanPt,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
};

export default Arbeidsoppgaver;
