import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { getLedetekst, keyValue, scrollTo } from 'digisyfo-npm';
import {
    OppfolgingsdialogInfoboks,
    LeggTilElementKnapper,
    TiltakTabell,
    sorterTiltakEtterNyeste,
    captitalizeFirstLetter,
    proptypes as oppfolgingProptypes,
    TiltakSkjema,
    TiltakInfoboks,
    NotifikasjonBoksVurdering,
    BRUKERTYPE,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../../routers/paths';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';

const harArbeidsgiverKommentert = (tiltak, fnr) => {
    return tiltak.kommentarer.filter((kommentar) => {
        return kommentar.opprettetAv.fnr !== fnr;
    });
};

class Tiltak extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visTiltakSkjema: false,
            nyttTiltak: false,
            oppdatertTiltak: false,
            lagreNyTiltakFeilet: false,
            oppdateringFeilet: false,
            varselTekst: '',
        };
        window.location.hash = 'tiltak';
        window.sessionStorage.setItem('hash', 'tiltak');
        this.sendLagreTiltak = this.sendLagreTiltak.bind(this);
        this.sendSlettTiltak = this.sendSlettTiltak.bind(this);
        this.sendLagreKommentar = this.sendLagreKommentar.bind(this);
        this.sendSlettKommentar = this.sendSlettKommentar.bind(this);
        this.toggleTiltakSkjema = this.toggleTiltakSkjema.bind(this);
        this.visOppdateringFeilet = this.visOppdateringFeilet.bind(this);
        this.skjulSkjema = this.skjulSkjema.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.tiltak.feiletTiltakId && nextProps.tiltak.lagringFeilet && this.props.tiltak.lagringFeilet !== nextProps.tiltak.lagringFeilet) {
            this.setState({
                lagreNyTiltakFeilet: true,
                visTiltakSkjema: true,
                varselTekst: getLedetekst('oppfolgingsdialog.oppdatering.feilmelding', this.props.ledetekster),
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visTiltakSkjema && this.state.visTiltakSkjema && this.lagreSkjema) {
            const form = findDOMNode(this.lagreSkjema);
            scrollTo(form, 300);
        }
    }

    visOppdateringFeilet(feilet) {
        this.setState({
            oppdateringFeilet: feilet,
            lagreNyTiltakFeilet: false,
        });
    }

    sendLagreTiltak(values) {
        const { oppfolgingsdialog } = this.props;
        if (!values.tiltakId) {
            this.state.nyttTiltak = true;
            this.state.oppdatertTiltak = false;
        } else {
            this.state.nyttTiltak = false;
            this.state.oppdatertTiltak = true;
        }
        const nyeValues = Object.assign({}, values, {
            tiltaknavn: captitalizeFirstLetter(values.tiltaknavn),
        });
        this.props.lagreTiltak(oppfolgingsdialog.id, nyeValues, oppfolgingsdialog.arbeidstaker.fnr);
        this.setState({
            visTiltakSkjema: false,
        });
    }
    sendSlettTiltak(tiltakId) {
        const { oppfolgingsdialog } = this.props;
        this.props.slettTiltak(oppfolgingsdialog.id, tiltakId, oppfolgingsdialog.arbeidstaker.fnr);
    }

    sendLagreKommentar(tiltakId, values) {
        const { oppfolgingsdialog } = this.props;
        this.props.lagreKommentar(oppfolgingsdialog.id, tiltakId, values, oppfolgingsdialog.arbeidstaker.fnr);
    }

    sendSlettKommentar(tiltakId, kommentarId) {
        const { oppfolgingsdialog } = this.props;
        this.props.slettKommentar(oppfolgingsdialog.id, tiltakId, kommentarId, oppfolgingsdialog.arbeidstaker.fnr);
    }

    toggleTiltakSkjema() {
        this.setState({
            visTiltakSkjema: !this.state.visTiltakSkjema,
        });
    }

    skjulSkjema() {
        this.setState({
            visTiltakSkjema: false,
            lagreNyTiltakFeilet: false,
        });
    }

    render() {
        const {
            ledetekster,
            oppfolgingsdialog,
            tiltak,
        } = this.props;
        const antallIkkeVurderteTiltak = oppfolgingsdialog.tiltakListe.filter((element) => {
            return element.opprettetAv.fnr === oppfolgingsdialog.arbeidstaker.fnr && element.sistEndretAv.fnr === oppfolgingsdialog.arbeidstaker.fnr &&
                (isEmpty(element.kommentarer) || harArbeidsgiverKommentert(element, oppfolgingsdialog.arbeidstaker.fnr).length === 0);
        }).length;
        return (
            (() => {
                return isEmpty(oppfolgingsdialog.tiltakListe) ?
                    <div>
                        {
                            !this.state.visTiltakSkjema ?
                                <OppfolgingsdialogInfoboks
                                    svgUrl={`${getContextRoot()}/img/svg/tiltak-onboarding.svg`}
                                    svgAlt="nyttTiltak"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidsgiver.onboarding.tiltak.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidsgiver.onboarding.tiltak.tekst')}
                                >
                                    <LeggTilElementKnapper
                                        ledetekster={ledetekster}
                                        visSkjema={this.state.visTiltakSkjema}
                                        toggleSkjema={this.toggleTiltakSkjema}
                                    />
                                </OppfolgingsdialogInfoboks> :
                                <div>
                                    <TiltakInfoboks
                                        ledetekster={ledetekster}
                                        visTiltakSkjema={this.state.visTiltakSkjema}
                                        toggleSkjema={this.toggleTiltakSkjema}
                                        tittel={getLedetekst('oppfolgingsdialog.tiltak.arbeidsgiver.tittel')}
                                    />

                                    <TiltakSkjema
                                        ledetekster={ledetekster}
                                        sendLagre={this.sendLagreTiltak}
                                        avbryt={this.skjulSkjema}
                                        fnr={oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr}
                                        brukerType={BRUKERTYPE.ARBEIDSGIVER}
                                        varselTekst={this.state.varselTekst}
                                        oppdateringFeilet={this.state.lagreNyTiltakFeilet}
                                        tiltakReducer={tiltak}
                                        rootUrlImg={getContextRoot()}
                                    />
                                </div>
                        }

                    </div>
                    :
                    <div>
                        {
                            antallIkkeVurderteTiltak > 0 &&
                            <NotifikasjonBoksVurdering
                                ledetekster={ledetekster}
                                navn={oppfolgingsdialog.arbeidstaker.navn}
                                antallIkkeVurderte={antallIkkeVurderteTiltak}
                                rootUrl={`${getContextRoot()}`}
                                tekst="oppfolgingsdialog.notifikasjonboks.tiltak.vurderes.tekst"
                            />
                        }
                        {
                            <TiltakInfoboks
                                ledetekster={ledetekster}
                                visTiltakSkjema={this.state.visTiltakSkjema}
                                toggleSkjema={this.toggleTiltakSkjema}
                                tittel={getLedetekst('oppfolgingsdialog.tiltak.arbeidsgiver.tittel')}
                            />
                        }
                        { this.state.visTiltakSkjema &&
                        <TiltakSkjema
                            ledetekster={ledetekster}
                            sendLagre={this.sendLagreTiltak}
                            avbryt={this.skjulSkjema}
                            fnr={oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr}
                            brukerType={BRUKERTYPE.ARBEIDSGIVER}
                            ref={(lagreSkjema) => {
                                this.lagreSkjema = lagreSkjema;
                            }}
                            varselTekst={this.state.varselTekst}
                            oppdateringFeilet={this.state.lagreNyTiltakFeilet}
                            tiltakReducer={tiltak}
                            rootUrlImg={getContextRoot()}
                        />
                        }
                        <TiltakTabell
                            ledetekster={ledetekster}
                            liste={sorterTiltakEtterNyeste(oppfolgingsdialog.tiltakListe)}
                            sendLagre={this.sendLagreTiltak}
                            sendSlett={this.sendSlettTiltak}
                            sendLagreKommentar={this.sendLagreKommentar}
                            sendSlettKommentar={this.sendSlettKommentar}
                            fnr={oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr}
                            brukerType={BRUKERTYPE.ARBEIDSGIVER}
                            visFeilMelding={this.visOppdateringFeilet}
                            feilMelding={this.state.oppdateringFeilet}
                            rootUrlImg={getContextRoot()}
                        />
                    </div>;
            })()
        );
    }
}

Tiltak.propTypes = {
    ledetekster: keyValue,
    tiltak: oppfolgingProptypes.tiltakReducerPt,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    lagreKommentar: PropTypes.func,
    slettKommentar: PropTypes.func,
};

export default Tiltak;
