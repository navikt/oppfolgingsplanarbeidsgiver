import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { STATUS_TILTAK } from '../../../../../konstanter';
import {
    kommentarReducerPt,
    tiltakPt,
} from '../../../../../proptypes/opproptypes';
import {
    skalVurdereTiltak,
    sorterKommentarerEtterOpprettet,
} from '../../../../../utils/tiltakUtils';
import TiltakVarselFeil from './../TiltakVarselFeil';
import KommentarListe from '../kommentar/KommentarListe';
import LagreKommentarSkjema from '../kommentar/LagreKommentarSkjema';
import TiltakForeslaattAv from '../TiltakForeslaattAv';

const texts = {
    tiltakInformasjonKnapper: {
        buttonComment: 'Kommenter',
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
                            onClick={(event) => { visLagreSkjema(event); }}>
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
            visLagringKommentarFeilet: false,
            varselTekst: '',
        };
    }

    componentWillReceiveProps(nextProps) {
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

    render() {
        const {
            element,
            fnr,
            visLagreSkjema,
            lagreKommentarSkjema,
            sendSlettKommentar,
            sendLagreKommentar,
            skjulLagreKommentarSkjema,
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
                {lagreKommentarSkjema &&
                <LagreKommentarSkjema
                    elementId={element.tiltakId}
                    sendLagre={sendLagreKommentar}
                    avbryt={skjulLagreKommentarSkjema}
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
    lagreKommentarSkjema: PropTypes.bool,
    sendLagreKommentar: PropTypes.func,
    sendSlettKommentar: PropTypes.func,
    skjulLagreKommentarSkjema: PropTypes.func,
    oppdaterTiltakFeilet: PropTypes.bool,
    varselTekst: PropTypes.string,
    kommentarReducer: kommentarReducerPt,
    feilMelding: PropTypes.bool,
    visFeilMelding: PropTypes.func,
    rootUrlImg: PropTypes.string,
};

export default TiltakInformasjon;
