import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { erSynligIViewport } from '@navikt/digisyfo-npm';
import {
    kommentarReducerPt,
    tiltakPt,
    tiltakReducerPt,
} from '../../../../../proptypes/opproptypes';
import TiltakSkjema from '../TiltakSkjema';
import TiltakListeRad from './TiltakListeRad';
import TiltakInformasjon from './TiltakInformasjon';
import TiltakVarselFeil from '../TiltakVarselFeil';

const texts = {
    updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
};

const TiltakVarselFeilStyled = styled.div`
    padding: 0 1em;
`;

class TiltakUtvidbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: props.erApen,
            containerClassName: '',
            hindreToggle: false,
            hoyde: !props.erApen ? '0' : 'auto',
            visInnhold: props.erApen,
            harTransisjon: false,
            visLagreSkjema: false,
            visVurderingSkjema: false,
            visLagringFeilet: false,
            visSlettingFeilet: false,
            lagreKommentarSkjema: false,
            visLagringKommentarFeilet: false,
            varselTekst: '',
        };
        this.setRef = this.setRef.bind(this);
        this.visLagreSkjema = this.visLagreSkjema.bind(this);
        this.visElementInformasjon = this.visElementInformasjon.bind(this);
        this.scrollTilElement = this.scrollTilElement.bind(this);
        this.erUtvidbarApenStorreEnnSkjerm = this.erUtvidbarApenStorreEnnSkjerm.bind(this);
        this.visFeil = this.visFeil.bind(this);
        this.sendSlett = this.sendSlett.bind(this);
        this.sendLagre = this.sendLagre.bind(this);
        this.visLagreKommentarSkjema = this.visLagreKommentarSkjema.bind(this);
        this.skjulLagreKommentarSkjema = this.skjulLagreKommentarSkjema.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.element.tiltakId === nextProps.kommentarReducer.tiltakId &&
            this.props.kommentarReducer.lagrer && nextProps.kommentarReducer.lagret) {
            this.skjulLagreKommentarSkjema();
        }
        if (this.props.element.tiltakId === nextProps.tiltakReducer.feiletTiltakId) {
            if (((nextProps.tiltakReducer.lagringFeilet && nextProps.tiltakReducer.lagringFeilet !== this.props.tiltakReducer.lagringFeilet) ||
                (nextProps.tiltakReducer.slettingFeilet && nextProps.tiltakReducer.slettingFeilet !== this.props.tiltakReducer.slettingFeilet))
                && nextProps.tiltakReducer.feiletTiltakId > 0) {
                if (nextProps.tiltakReducer.slettingFeilet) {
                    this.visElementInformasjon();
                    this.props.visFeilMelding(true);
                    this.visFeil(false, true, texts.updateError);
                    this.apne();
                } else if (nextProps.tiltakReducer.lagringFeilet) {
                    this.props.visFeilMelding(true);
                    this.visFeil(true, false, texts.updateError);
                    this.setState({
                        lagreKommentarSkjema: false,
                        visLagreSkjema: true,
                    });
                    if (!this.state.erApen) {
                        this.apne();
                    }
                } else if (!nextProps.tiltakReducer.lagringFeilet && !nextProps.tiltakReducer.slettingFeilet) {
                    this.visFeil(false, false, '');
                }
            }
        } else if (!nextProps.tiltakReducer.lagringFeilet && !nextProps.tiltakReducer.slettingFeilet) {
            this.visFeil(false, false, '');
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

    visFeil(lagringFeilet, slettingFeilet, tekst) {
        this.setState({
            visLagringFeilet: lagringFeilet,
            visSlettingFeilet: slettingFeilet,
            varselTekst: tekst,
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

    visLagreSkjema(event) {
        event.stopPropagation();
        this.setState({
            lagreKommentarSkjema: false,
            visLagreSkjema: true,
        });
        this.props.visFeilMelding(false);
        if (!this.state.erApen) {
            this.apne();
        }
    }

    visElementInformasjon() {
        this.setState({
            visLagreSkjema: false,
            lagreKommentarSkjema: false,
        });
        this.props.visFeilMelding(false);
    }

    visLagreKommentarSkjema(event) {
        event.stopPropagation();
        this.setState({
            visLagreSkjema: false,
            lagreKommentarSkjema: true,
        });
        if (!this.state.erApen) {
            this.apne();
        }
    }

    skjulLagreKommentarSkjema() {
        this.setState({
            visInnhold: true,
            lagreKommentarSkjema: false,
        });
        this.props.visFeilMelding(false);
    }

    sendSlett(event, id) {
        event.stopPropagation();
        this.props.sendSlett(id);
        this.lukk();
    }

    sendLagre(nyeVerdier) {
        this.props.sendLagre(nyeVerdier);
        this.setState({
            visLagreSkjema: false,
        });
    }

    render() {
        const {
            element,
            fnr,
            sendSlettKommentar,
            sendLagreKommentar,
            kommentarReducer,
            tiltakReducer,
            feilMelding,
            visFeilMelding,
            rootUrlImg,
        } = this.props;
        return (
            (() => {
                return (
                    <article
                        className="oppfolgingsdialogtabell__rad oppfolgingsdialogtabell__rad--element"
                        ref={(ref) => { this.jstoggle = ref; }}
                        aria-label={element.tiltaknavn}>
                        <a
                            href="javscript:void(0)"
                            aria-expanded={this.state.erApen}
                            ref={(ref) => { this.utvidbarToggle = ref; }}
                            role="button"
                            className="utvidbar__toggle"
                            onClick={(event) => { this.toggle(event); }}>
                            <div ref={(ref) => { this.utvidbar = ref; }} className="oppfolgingsdialogtabell__utvidbarrad">
                                <TiltakListeRad
                                    tiltak={element}
                                    erApen={this.state.erApen}
                                    fnr={fnr}
                                    sendSlett={this.sendSlett}
                                    lagreSkjema={this.state.visLagreSkjema}
                                    visLagreSkjema={this.visLagreSkjema}
                                    lagreKommentarSkjema={this.state.lagreKommentarSkjema}
                                    visLagreKommentarSkjema={this.visLagreKommentarSkjema}
                                    rootUrlImg={rootUrlImg}
                                />
                            </div>
                        </a>
                        <div
                            style={{ height: this.state.hoyde }}
                            className={`utvidbar__innholdContainer${this.state.containerClassName}`}
                            onTransitionEnd={() => {
                                this.onTransitionEnd();
                            }}>
                            <div ref={(ref) => { this.innhold = ref; }}>
                                { this.state.visInnhold && !this.state.visLagreSkjema &&
                                <TiltakInformasjon
                                    element={element}
                                    fnr={fnr}
                                    visLagreSkjema={this.visLagreSkjema}
                                    lagreKommentarSkjema={this.state.lagreKommentarSkjema}
                                    skjulLagreKommentarSkjema={this.skjulLagreKommentarSkjema}
                                    sendLagreKommentar={sendLagreKommentar}
                                    sendSlettKommentar={sendSlettKommentar}
                                    oppdaterTiltakFeilet={this.state.visLagringFeilet}
                                    varselTekst={this.state.varselTekst}
                                    tiltakReducer={tiltakReducer}
                                    kommentarReducer={kommentarReducer}
                                    feilMelding={feilMelding}
                                    visFeilMelding={visFeilMelding}
                                    rootUrlImg={rootUrlImg}
                                />
                                }
                                { this.state.visInnhold && this.state.visLagreSkjema &&
                                <TiltakSkjema
                                    sendLagre={this.sendLagre}
                                    tiltak={element}
                                    form={element.tiltakId.toString()}
                                    fnr={fnr}
                                    id={element.tiltakId}
                                    avbryt={this.visElementInformasjon}
                                    oppdateringFeilet={(this.state.visLagringFeilet || this.state.visSlettingFeilet) && feilMelding}
                                    varselTekst={this.state.varselTekst}
                                    visFeilMelding={visFeilMelding}
                                    tiltakReducer={tiltakReducer}
                                    rootUrlImg={rootUrlImg}
                                />
                                }
                            </div>
                        </div>
                        {this.state.visSlettingFeilet && feilMelding &&
                        <TiltakVarselFeilStyled>
                            <TiltakVarselFeil
                                tekst={texts.updateError}
                                onTransitionEnd={() => {
                                    this.onTransitionEnd();
                                }}
                            />
                        </TiltakVarselFeilStyled>
                        }
                    </article>);
            })()
        );
    }
}

TiltakUtvidbar.propTypes = {
    element: tiltakPt,
    fnr: PropTypes.string,
    sendSlett: PropTypes.func,
    sendLagre: PropTypes.func,
    sendSlettKommentar: PropTypes.func,
    sendLagreKommentar: PropTypes.func,
    erApen: PropTypes.bool.isRequired,
    kommentarReducer: kommentarReducerPt,
    tiltakReducer: tiltakReducerPt,
    visFeilMelding: PropTypes.func,
    feilMelding: PropTypes.bool,
    rootUrlImg: PropTypes.string,

};

TiltakUtvidbar.defaultProps = {
    erApen: false,
    Overskrift: 'H3',
};

export const mapStateToProps = (state) => {
    return {
        kommentarReducer: state.kommentar,
        tiltakReducer: state.tiltak,
    };
};

const TiltakUtvidbarContainer = connect(mapStateToProps)(TiltakUtvidbar);

export default TiltakUtvidbarContainer;
