import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { getLedetekst } from 'digisyfo-npm';
import { BRUKERTYPE, STATUS_TILTAK } from '../../../../../konstanter';
import {
    kommentarReducerPt,
    tiltakPt,
} from '../../../../../proptypes/opproptypes';
import TiltakVarselVudering from './TiltakVarselVudering';
import TiltakVarselFeil from './../TiltakVarselFeil';
import KommentarListe from '../kommentar/KommentarListe';
import LagreKommentarSkjema from '../kommentar/LagreKommentarSkjema';
import TiltakForeslaattAv from '../TiltakForeslaattAv';
import {
    skalVurdereTiltak,
    sorterKommentarerEtterOpprettet,
} from '../../../../../utils/tiltakUtils';

export const TiltakInformasjonKnapper = ({ element, fnr, visLagreSkjema, sendSlett, brukerType, lagreKommentarSkjema, visLagreKommentarSkjema }) => {
    const aktoerHarOpprettetElement = fnr === (element.opprettetAv && element.opprettetAv.fnr);
    return (
        <div className="knapperad__tiltak knapperad--justervenstre">
            { !lagreKommentarSkjema &&
            <div className="knapperad__element">
                <Knapp
                    autoFocus={!skalVurdereTiltak(element, fnr)}
                    onClick={visLagreKommentarSkjema}>
                    {getLedetekst('oppfolgingsdialog.knapp.kommenter')}
                </Knapp>
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
                    {getLedetekst('oppfolgingsdialog.knapp.slett-element')}
                </button>
            </div>
            }
            { (aktoerHarOpprettetElement || (brukerType === BRUKERTYPE.ARBEIDSGIVER && !skalVurdereTiltak(element, fnr))) &&
            <div className="knapperad__element">
                <button
                    className="knapp--endre knapp--tiltak--endre"
                    type="button"
                    onClick={visLagreSkjema}>
                    {getLedetekst('oppfolgingsdialog.knapp.endre-element')}
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
    brukerType: PropTypes.string,
    lagreKommentarSkjema: PropTypes.bool,
    visLagreKommentarSkjema: PropTypes.func,
};

export const TiltakInformasjonBeskrivelse = ({ tiltak }) => {
    return (
        <div className="tiltaktabell__rad__utvidbar--rad">
            { tiltak && tiltak.beskrivelse &&
            <label className="tiltaktabell--beskrivelse">{getLedetekst('oppfolgingsdialog.tiltak.beskrivelse')}</label>
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
            <label className="tiltaktabell--oppfoelging">{getLedetekst('oppfolgingsdialog.tiltak.oppfoelging')}</label>
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

export const TabellTiltakBeskrivelseIkkeAktuelt = ({ tiltak, brukerType }) => {
    let tittel = '';
    if (brukerType === BRUKERTYPE.ARBEIDSGIVER) {
        tittel = 'oppfolgingsdialog.arbeidsgiver.tiltak.vurdering.tittel';
    } else {
        tittel = 'oppfolgingsdialog.arbeidstaker.tiltak.vurdering.tittel';
    }
    return (
        <div className="tiltaktabell__rad__utvidbar--rad">
            { tiltak && tiltak.beskrivelseIkkeAktuelt &&
            <label className="tiltaktabell--oppfoelging">{getLedetekst(tittel)}</label>
            }
            { tiltak && tiltak.beskrivelseIkkeAktuelt &&
            <p>{tiltak.beskrivelseIkkeAktuelt}</p>
            }
        </div>
    );
};
TabellTiltakBeskrivelseIkkeAktuelt.propTypes = {
    tiltak: tiltakPt,
    brukerType: PropTypes.string,
};

export const visVarsel = (fnr, tiltak) => {
    return tiltak && !tiltak.gjennomfoering && fnr === (tiltak.opprettetAv && tiltak.opprettetAv.fnr) && tiltak.sistEndretAv.fnr === fnr;
};

export const VarselTiltakVurdering = ({ visLagreSkjema }) => {
    return (
        <div className="knapperad__tiltak--justervenstre">
            {<div className="tiltaktabell__rad__boks" >
                <p>{getLedetekst('oppfolgingsdialog.arbeidsgiver.vurdering.tekst')}</p>
                <div className="tiltaktabell__rad__button">
                    <div className="knapperad__element">
                        <Hovedknapp
                            autoFocus
                            onClick={visLagreSkjema}>
                            {getLedetekst('oppfolgingsdialog.arbeidsgiver.knapp.gjoer.vurdering')}
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
                varselTekst: getLedetekst('oppfolgingsdialog.oppdatering.feilmelding'),
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
            brukerType,
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

                { brukerType === BRUKERTYPE.ARBEIDSTAKER && visVarsel(fnr, element) &&
                <TiltakVarselVudering
                    tekst={getLedetekst('oppfolgingsdialog.tiltak.vurdering.varsel')}
                />
                }
                { element && element.gjennomfoering && element.status === STATUS_TILTAK.AVTALT &&
                <TiltakInformasjonGjennomfoering
                    tiltak={element}
                />
                }

                { element && element.beskrivelseIkkeAktuelt && element.status === STATUS_TILTAK.IKKE_AKTUELT &&
                <TabellTiltakBeskrivelseIkkeAktuelt
                    tiltak={element}
                    brukerType={brukerType}
                />
                }

                { brukerType === BRUKERTYPE.ARBEIDSGIVER && skalVurdereTiltak(element, fnr) &&
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
                    brukerType={brukerType}
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
    brukerType: PropTypes.string,
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
