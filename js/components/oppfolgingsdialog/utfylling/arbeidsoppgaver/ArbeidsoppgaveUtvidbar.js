import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { erSynligIViewport } from '@navikt/digisyfo-npm';
import * as opProptypes from '../../../../proptypes/opproptypes';
import ArbeidsoppgaveInformasjon from './ArbeidsoppgaveInformasjon';
import ArbeidsoppgaveUtvidbarOverskrift from './ArbeidsoppgaveUtvidbarOverskrift';

const texts = {
    updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
};

class ArbeidsoppgaveUtvidbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: props.erApen,
            containerClassName: '',
            hindreToggle: false,
            hoyde: !props.erApen ? '0' : 'auto',
            visInnhold: props.erApen,
            harTransisjon: false,
            visSlettingFeilet: false,
        };
        this.setRef = this.setRef.bind(this);
        this.visElementInformasjon = this.visElementInformasjon.bind(this);
        this.scrollTilElement = this.scrollTilElement.bind(this);
        this.erUtvidbarApenStorreEnnSkjerm = this.erUtvidbarApenStorreEnnSkjerm.bind(this);
        this.visFeil = this.visFeil.bind(this);
        this.sendSlett = this.sendSlett.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.element.arbeidsoppgaveId === nextProps.arbeidsoppgaverReducer.feiletOppgaveId) {
            if (((nextProps.arbeidsoppgaverReducer.slettingFeilet && nextProps.arbeidsoppgaverReducer.slettingFeilet !== this.props.arbeidsoppgaverReducer.slettingFeilet))
                && nextProps.arbeidsoppgaverReducer.feiletOppgaveId > 0) {
                if (nextProps.arbeidsoppgaverReducer.slettingFeilet) {
                    this.visElementInformasjon();
                    this.props.visFeilMelding(true);
                    this.visFeil(true);
                    this.apne();
                } else if (!nextProps.arbeidsoppgaverReducer.slettingFeilet) {
                    this.visFeil(false);
                }
            } else if (!nextProps.arbeidsoppgaverReducer.slettingFeilet) {
                this.visFeil(false);
            }
        } else if (!nextProps.arbeidsoppgaverReducer.slettingFeilet) {
            this.visFeil(false);
        }
    }

    onTransitionEnd() {
        if (this.state.harTransisjon) {
            // Forhindrer scrolling til utenforliggnede
            // Utvidbar dersom flere er nøstet inni hverandre
            this.setState({
                harTransisjon: false,
            });
            if (this.state.erApen) {
                this.scrollTilElement(this.utvidbar);
                this.setState({
                    hindreToggle: false,
                });
                this.setAutoHoyde();
            } else {
                this.setState({
                    hindreToggle: false,
                    visInnhold: false,
                });
                if (!erSynligIViewport(this.utvidbar)) {
                    this.scrollTilElement(this.utvidbar);
                }
            }
        }
    }

    setRef(ref) {
        this.setRef = ref;
    }

    setAutoHoyde() {
        /* Fjerner animasjonsklassen slik at Safari ikke
         tegner komponenten på nytt når høyde settes til 'auto': */
        this.setState({
            containerClassName: '',
        });
        // Setter høyde til auto:
        setTimeout(() => {
            this.setState({
                hoyde: 'auto',
                containerClassName: '',
            });
        }, 0);
    }

    visFeil(slettingFeilet) {
        this.setState({
            visSlettingFeilet: slettingFeilet,
        });
    }

    apne() {
        this.setState({
            hoyde: '0',
            hindreToggle: true,
            containerClassName: ' utvidbar__innholdContainer--medAnimasjon',
            visInnhold: true,
            harTransisjon: true,
        });
        setTimeout(() => {
            const hoyde = this.innhold.offsetHeight;
            this.setState({
                erApen: true,
                hoyde,
            });
        }, 0);
    }

    lukk() {
        const hoyde = this.innhold.offsetHeight;
        this.setState({
            hoyde,
            hindreToggle: true,
            harTransisjon: true,
        });
        setTimeout(() => {
            this.setState({
                containerClassName: ' utvidbar__innholdContainer--medAnimasjon',
                hoyde: '0',
                erApen: false,
            });
        }, 0);
    }

    erUtvidbarApenStorreEnnSkjerm(utvidbar) {
        const utvidbarTopp = utvidbar.getBoundingClientRect().top;
        const utvidbarHoyde = this.jstoggle.offsetHeight;
        const sideHoyde = window.innerHeight;
        return (utvidbarTopp + utvidbarHoyde) > sideHoyde;
    }

    scrollTilElement(element) {
        if (this.state.erApen) {
            const utvidbar = findDOMNode(element);
            if (utvidbar && this.erUtvidbarApenStorreEnnSkjerm(utvidbar)) {
                utvidbar.scrollIntoView({ block: 'start', behavior: 'smooth' });
                window.scrollBy(0, -200); // Justere visning.
            }
        }
    }

    toggle(e) {
        e.preventDefault();
        if (!this.state.hindreToggle) {
            /* hindreToggle for å hindre dobbelklikk,
             eller at noen klikker mens animasjonen pågår.
             Dobbelklikk vil skape kluss med logikken. */
            if (this.state.erApen) {
                this.lukk();
            } else {
                this.apne();
            }
        }
    }

    visElementInformasjon() {
        this.setState({
            visInnhold: true,
        });
        this.props.visFeilMelding(false);
    }

    sendSlett(event, id) {
        event.stopPropagation();
        this.props.sendSlett(id);
    }

    render() {
        const {
            element,
            fnr,
            feilMelding,
        } = this.props;
        return (
            (() => {
                return (
                    <article
                        className="arbeidsoppgaverListe__rad arbeidsoppgaverListe__rad--element"
                        ref={(ref) => { this.jstoggle = ref; }}
                        aria-label={element.arbeidsoppgavenavn}>
                        <a
                            href="javscript:void(0)"
                            aria-expanded={this.state.erApen}
                            ref={(ref) => { this.utvidbarToggle = ref; }}
                            role="button"
                            className="utvidbar__toggle"
                            onClick={(event) => { this.toggle(event); }}
                        >
                            <div ref={(ref) => { this.utvidbar = ref; }} className="arbeidsoppgaverListe__utvidbarrad">
                                <ArbeidsoppgaveUtvidbarOverskrift
                                    erApen={this.state.erApen}
                                    fnr={fnr}
                                    sendSlett={this.sendSlett}
                                    arbeidsoppgave={element}
                                />
                            </div>
                        </a>
                        <div
                            style={{ height: this.state.hoyde }}
                            className={`utvidbar__innholdContainer${this.state.containerClassName}`}
                            onTransitionEnd={() => {
                                this.onTransitionEnd();
                            }}
                        >
                            <div ref={(ref) => { this.innhold = ref; }}>
                                { this.state.visInnhold &&
                                <ArbeidsoppgaveInformasjon
                                    element={element}
                                    oppdateringFeilet={this.state.visSlettingFeilet && feilMelding}
                                    varselTekst={texts.updateError}
                                />
                                }
                            </div>
                        </div>
                    </article>
                );
            })()
        );
    }
}

ArbeidsoppgaveUtvidbar.propTypes = {
    element: opProptypes.arbeidsoppgavePt,
    fnr: PropTypes.string,
    sendSlett: PropTypes.func,
    erApen: PropTypes.bool.isRequired,
    visFeilMelding: PropTypes.func,
    feilMelding: PropTypes.bool,
    arbeidsoppgaverReducer: opProptypes.arbeidsoppgaverReducerPt,
};

ArbeidsoppgaveUtvidbar.defaultProps = {
    erApen: false,
    Overskrift: 'H3',
};

export const mapStateToProps = (state) => {
    return {
        arbeidsoppgaverReducer: state.arbeidsoppgaver,
    };
};

const ArbeidsoppgaveUtvidbarContainer = connect(mapStateToProps)(ArbeidsoppgaveUtvidbar);

export default ArbeidsoppgaveUtvidbarContainer;
