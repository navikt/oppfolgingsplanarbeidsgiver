import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { STATUS_TILTAK } from '../../../../../konstanter';
import {
    kommentarReducerPt,
    tiltakPt,
} from '../../../../../proptypes/opproptypes';
import TiltakVarselFeil from './../TiltakVarselFeil';
import KommentarListe from '../kommentar/KommentarListe';
import LagreKommentarSkjema from '../kommentar/LagreKommentarSkjema';
import TiltakForeslaattAv from '../TiltakForeslaattAv';
import {
    skalVurdereTiltak,
    sorterKommentarerEtterOpprettet,
} from '../../../../../utils/tiltakUtils';


const texts = {
    tiltakInformasjonKnapper: {
        buttonComment: 'Kommenter',
        buttonDelete: 'Slett',
        buttonEdit: 'Endre',
    },
    tiltakInformasjonBeskrivelse: {
        label: 'BESKRIVELSE',
    },
    tiltakInformasjonGjennomfoering: {
        label: 'OPPFØLGING OG GJENNOMFØRING',
    },
    tabellTiltakBeskrivelseIkkeAktuelt: {
        label: 'DIN VURDERING',
    },
    varselTiltakVurdering: {
        info: 'Du må vurdere tiltaket som er foreslått',
        button: 'Vurder tiltaket',
    },
    tiltakInformasjon: {
        updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
    },
};

export const TiltakInformasjonKnapper = ({ element, fnr, visLagreSkjema, sendSlett, lagreKommentarSkjema, visLagreKommentarSkjema }) => {
    const aktoerHarOpprettetElement = fnr === (element.opprettetAv && element.opprettetAv.fnr);
    return (
        <div className="knapperad__tiltak knapperad--justervenstre">
            { !lagreKommentarSkjema &&
            <div className="knapperad__element">
                <Knapp
                    mini
                    autoFocus={!skalVurdereTiltak(element, fnr)}
                    onClick={visLagreKommentarSkjema}>
                    {texts.tiltakInformasjonKnapper.buttonComment}
                </Knapp>
            </div>
            }
            { (aktoerHarOpprettetElement || !skalVurdereTiltak(element, fnr)) &&
            <div className="knapperad__element">
                <button
                    className="knapp--endre knapp--tiltak--endre"
                    type="button"
                    onClick={visLagreSkjema}>
                    {texts.tiltakInformasjonKnapper.buttonEdit}
                </button>
            </div>
            }
            { aktoerHarOpprettetElement &&
            <div className="knapperad__element">
                <button
                    className="knapp--slett"
                    type="button"
                    onClick={() => {
                        sendSlett(element.tiltakId);
                    }}
                    aria-pressed={visLagreSkjema}>
                    {texts.tiltakInformasjonKnapper.buttonDelete}
                </button>
            </div>
            }
        </div>
    );
};
TiltakInformasjonKnapper.propTypes = {
    element: tiltakPt,
    fnr: PropTypes.string,
    visLagreSkjema: PropTypes.func,
    sendSlett: PropTypes.func,
    lagreKommentarSkjema: PropTypes.bool,
    visLagreKommentarSkjema: PropTypes.func,
};

export const TiltakInformasjonBeskrivelse = ({ tiltak }) => {
    return (
        <div className="tiltaktabell__rad__utvidbar--rad">
            { tiltak && tiltak.beskrivelse &&
            <label className="tiltaktabell--beskrivelse">{texts.tiltakInformasjonBeskrivelse.label}</label>
            }
            { tiltak && tiltak.beskrivelse &&
            <p>{tiltak.beskrivelse}</p>
            }
        </div>
    );
};
TiltakInformasjonBeskrivelse.propTypes = {
    tiltak: tiltakPt,
};

export const TiltakInformasjonGjennomfoering = ({ tiltak }) => {
    return (
        <div className="tiltaktabell__rad__utvidbar--rad">
            { tiltak && tiltak.gjennomfoering &&
            <label className="tiltaktabell--oppfoelging">{texts.tiltakInformasjonGjennomfoering.label}</label>
            }
            { tiltak && tiltak.gjennomfoering &&
            <p>{tiltak.gjennomfoering}</p>
            }
        </div>
    );
};
TiltakInformasjonGjennomfoering.propTypes = {
    tiltak: tiltakPt,
};

export const TabellTiltakBeskrivelseIkkeAktuelt = ({ tiltak }) => {
    return (
        <div className="tiltaktabell__rad__utvidbar--rad">
            { tiltak && tiltak.beskrivelseIkkeAktuelt &&
            <label className="tiltaktabell--oppfoelging">{texts.tabellTiltakBeskrivelseIkkeAktuelt.label}</label>
            }
            { tiltak && tiltak.beskrivelseIkkeAktuelt &&
            <p>{tiltak.beskrivelseIkkeAktuelt}</p>
            }
        </div>
    );
};
TabellTiltakBeskrivelseIkkeAktuelt.propTypes = {
    tiltak: tiltakPt,
};

export const VarselTiltakVurdering = ({ visLagreSkjema }) => {
    return (
        <div className="knapperad__tiltak--justervenstre">
            {<div className="tiltaktabell__rad__boks" >
                <p>{texts.varselTiltakVurdering.info}</p>
                <div className="tiltaktabell__rad__button">
                    <div className="knapperad__element">
                        <Hovedknapp
                            autoFocus
                            onClick={visLagreSkjema}>
                            {texts.varselTiltakVurdering.button}
                        </Hovedknapp>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};
VarselTiltakVurdering.propTypes = {
    visLagreSkjema: PropTypes.func,
};

class TiltakInformasjon extends Component {
    constructor() {
        super();
        this.state = {
            lagreKommentarSkjema: false,
            visLagringKommentarFeilet: false,
            varselTekst: '',
        };
        this.visLagreKommentarSkjema = this.visLagreKommentarSkjema.bind(this);
        this.skjulLagreKommentarSkjema = this.skjulLagreKommentarSkjema.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.element.tiltakId === nextProps.kommentarReducer.tiltakId &&
            this.props.kommentarReducer.lagrer && nextProps.kommentarReducer.lagret) {
            this.skjulLagreKommentarSkjema();
        }
        if (this.props.element.tiltakId === nextProps.kommentarReducer.feiletTiltakId &&
            nextProps.kommentarReducer.lagringFeilet && nextProps.kommentarReducer.lagringFeilet !== this.props.kommentarReducer.lagringFeilet) {
            this.props.visFeilMelding(true);
            this.setState({
                visLagringKommentarFeilet: true,
                varselTekst: texts.tiltakInformasjon.updateError,
            });
        } else if (!nextProps.kommentarReducer.lagringFeilet && !nextProps.kommentarReducer.slettingFeilet) {
            this.setState({
                visLagringKommentarFeilet: false,
                varselTekst: '',
            });
        }
    }

    skjulLagreKommentarSkjema() {
        this.setState({ lagreKommentarSkjema: false });
        this.props.visFeilMelding(false);
    }

    visLagreKommentarSkjema() {
        this.setState({ lagreKommentarSkjema: true });
    }

    render() {
        const {
            element,
            fnr,
            visLagreSkjema,
            sendSlett,
            sendSlettKommentar,
            sendLagreKommentar,
            oppdaterTiltakFeilet,
            varselTekst,
            kommentarReducer,
            feilMelding,
            visFeilMelding,
            rootUrlImg,
        } = this.props;
        return (
            <div className={'tiltaktabell__rad__utvidbar tiltakInformasjon'}>
                <TiltakInformasjonBeskrivelse
                    tiltak={element}
                />

                <TiltakForeslaattAv
                    tiltak={element}
                />

                { element && element.gjennomfoering && element.status === STATUS_TILTAK.AVTALT &&
                <TiltakInformasjonGjennomfoering
                    tiltak={element}
                />
                }

                { element && element.beskrivelseIkkeAktuelt && element.status === STATUS_TILTAK.IKKE_AKTUELT &&
                <TabellTiltakBeskrivelseIkkeAktuelt
                    tiltak={element}
                />
                }

                { skalVurdereTiltak(element, fnr) &&
                <VarselTiltakVurdering visLagreSkjema={visLagreSkjema} />
                }

                { oppdaterTiltakFeilet && feilMelding &&
                <TiltakVarselFeil
                    tekst={varselTekst}
                    onTransitionEnd={() => {
                        this.onTransitionEnd();
                    }}
                />
                }

                <TiltakInformasjonKnapper
                    element={element}
                    fnr={fnr}
                    visLagreSkjema={visLagreSkjema}
                    sendSlett={sendSlett}
                    lagreKommentarSkjema={this.state.lagreKommentarSkjema}
                    visLagreKommentarSkjema={this.visLagreKommentarSkjema}
                />
                {this.state.lagreKommentarSkjema &&
                <LagreKommentarSkjema
                    elementId={element.tiltakId}
                    sendLagre={sendLagreKommentar}
                    avbryt={this.skjulLagreKommentarSkjema}
                    kommentarReducer={kommentarReducer}
                    kommentarFeilet={this.state.visLagringKommentarFeilet && feilMelding}
                    feilMelding={this.state.varselTekst}
                    form={`${element.tiltakId}`}
                    rootUrlImg={rootUrlImg}
                />
                }

                { element.kommentarer && element.kommentarer.length > 0 &&
                <KommentarListe
                    elementId={element.tiltakId}
                    kommentarer={sorterKommentarerEtterOpprettet(element.kommentarer)}
                    fnr={fnr}
                    sendSlett={sendSlettKommentar}
                    kommentarReducer={kommentarReducer}
                    feilMelding={feilMelding}
                    visFeilMelding={visFeilMelding}
                    rootUrlImg={rootUrlImg}
                />
                }
            </div>);
    }
}

TiltakInformasjon.propTypes = {
    element: tiltakPt,
    fnr: PropTypes.string,
    visLagreSkjema: PropTypes.func,
    sendSlett: PropTypes.func,
    sendLagreKommentar: PropTypes.func,
    sendSlettKommentar: PropTypes.func,
    oppdaterTiltakFeilet: PropTypes.bool,
    varselTekst: PropTypes.string,
    kommentarReducer: kommentarReducerPt,
    feilMelding: PropTypes.bool,
    visFeilMelding: PropTypes.func,
    rootUrlImg: PropTypes.string,
};

export default TiltakInformasjon;
