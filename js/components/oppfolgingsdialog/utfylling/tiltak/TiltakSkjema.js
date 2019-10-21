import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { getLedetekst } from 'digisyfo-npm';
import {
    OPPRETT_TILTAK_NY,
    STATUS_TILTAK,
    tekstfeltRegex,
    tekstfeltTomtRegex,
} from '../../../../konstanter';
import TekstFelt from '../../../../skjema/TekstFelt';
import TekstOmrade from '../../../../skjema/TekstOmrade';
import TiltakRadioKnapper from './TiltakRadioKnapper';
import TiltakDatovelger from './TiltakDatovelger';
import TiltakKnapper from './TiltakKnapper';
import TiltakForeslaattAv from './TiltakForeslaattAv';
import TiltakInfoVarsel from './TiltakInfoVarsel';
import { restdatoTildato, sluttDatoSenereEnnStartDato } from '../../../../utils/datoUtils';
import { konvertDatoTiltak, konvertDatoTiltakMedPunkt } from '../../../../utils/tiltakUtils';
import TiltakVarselFeil from './TiltakVarselFeil';
import {
    tiltakPt,
    tiltakReducerPt,
} from '../../../../proptypes/opproptypes';
import { tiltakSkjemaFeltPt } from '../../../../proptypes/tiltakproptypes';

export const FELTER = {
    tiltaknavn: {
        navn: 'tiltaknavn',
        tekst: 'oppfolgingsdialog.tiltak.opprett.navn',
    },
    beskrivelse: {
        navn: 'beskrivelse',
        tekst: 'oppfolgingsdialog.tiltak.opprett.beskrivelse',
    },
    gjennomfoering: {
        navn: 'gjennomfoering',
        tekst: 'oppfolgingsdialog.tiltak.opprett.oppfoelging',
    },
    beskrivelseIkkeAktuelt: {
        navn: 'beskrivelseIkkeAktuelt',
        tekst: 'oppfolgingsdialog.tiltak.opprett.vurdering',
    },
    startdato: {
        navn: 'fom',
        tekst: 'oppfolgingsdialog.godkjennplanskjema.datovelger.startdato',
    },
    sluttdato: {
        navn: 'tom',
        tekst: 'oppfolgingsdialog.godkjennplanskjema.datovelger.sluttdato',
    },
};

export const aktoerHarOpprettetElement = (fnr, tiltak) => {
    return fnr === tiltak.opprettetAv.fnr;
};

export const TiltakNavn = ({ felt }) => {
    return (<div className="lagretiltakskjema__inputgruppe">
        <label
            className="skjemaelement__label"
            id={felt.navn}
            htmlFor={`${felt.navn}-input`}>
            {getLedetekst(felt.tekst)}
        </label>
        <Field
            className="input--fullbredde"
            name={felt.navn}
            id={`${felt.navn}-input`}
            aria-labelledby={felt.navn}
            component={TekstFelt}
            placeholder="Skriv her"
        />
    </div>);
};

TiltakNavn.propTypes = {
    felt: tiltakSkjemaFeltPt,
};

export const TiltakBeskrivelse = (
    {
        felt,
        tiltak,
        fnr,
        tekst,
    }) => {
    return (tiltak && tiltak.opprettetAv && !aktoerHarOpprettetElement(fnr, tiltak) ?
        <div className="lagretiltakskjema__inputgruppe">
            { tiltak && tiltak.beskrivelse &&
            [
                <label key={`tiltak-besk-label-${tiltak.tiltakId}`} className="tiltaktabell--beskrivelse">
                    {getLedetekst('oppfolgingsdialog.tiltak.beskrivelse')}
                </label>,
                <p key={`tiltak-besk-p-${tiltak.tiltakId}`} >{tiltak.beskrivelse}</p>,
            ]
            }
        </div>
        :
        <div className="lagretiltakskjema__inputgruppe">
            <label className="skjemaelement__label" id={felt.navn} htmlFor={`${felt.navn}-input`}>
                {getLedetekst(felt.tekst)}
            </label>
            <Field
                className="input__tiltak--beskrivelse"
                name={felt.navn}
                id={`${felt.navn}-input`}
                aria-labelledby={felt.navn}
                component={TekstOmrade}
                placeholder="Skriv her"
            />
            <TiltakInfoVarsel tekst={tekst} />
        </div>);
};

TiltakBeskrivelse.propTypes = {
    felt: tiltakSkjemaFeltPt,
    tiltak: tiltakPt,
    fnr: PropTypes.string,
    tekst: PropTypes.string,
};

export const Gjennomfoering = ({ felt, tiltak, tekst, fnr }) => {
    return (
        <div className="skjemaelement lagretiltakskjema__inputgruppe">
            <label
                className="skjemaelement__label"
                id={felt.navn}
                htmlFor={`${felt.navn}-input`}>
                {getLedetekst(felt.tekst)}
            </label>
            <Field
                className="input__tiltak--gjennom"
                name={felt.navn}
                id={`${felt.navn}-input`}
                aria-labelledby={felt.navn}
                component={TekstOmrade}
                placeholder="Skriv her"
            />
            { tiltak && !aktoerHarOpprettetElement(fnr, tiltak) &&
            <TiltakInfoVarsel tekst={tekst} />
            }
        </div>);
};
Gjennomfoering.propTypes = {
    felt: tiltakSkjemaFeltPt,
    tiltak: tiltakPt,
    tekst: PropTypes.string,
    fnr: PropTypes.string,
};

export const BeskrivelseIkkeAktuelt = ({ felt, tiltak, tekst, fnr }) => {
    return (
        <div className="skjemaelement">
            <label
                className="skjemaelement__label"
                id={felt.navn}
                htmlFor={`${felt.navn}-input`}>
                {getLedetekst(felt.tekst)}
            </label>
            <Field
                className="input__tiltak--gjennom"
                name={felt.navn}
                id={`${felt.navn}-input`}
                aria-labelledby={felt.navn}
                component={TekstOmrade}
                placeholder="Skriv her"
            />
            { tiltak && !aktoerHarOpprettetElement(fnr, tiltak) &&
            <TiltakInfoVarsel
                tekst={tekst}
            />
            }
        </div>);
};
BeskrivelseIkkeAktuelt.propTypes = {
    felt: tiltakSkjemaFeltPt,
    tiltak: tiltakPt,
    tekst: PropTypes.string,
    fnr: PropTypes.string,
};

export class TiltakSkjemaKomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: STATUS_TILTAK.FORSLAG,
            visLagringFeiletNyTiltak: false,
            varselTekst: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.hentSkjemaClassName = this.hentSkjemaClassName.bind(this);
        this.visFeiletTiltak = this.visFeiletTiltak.bind(this);
        this.avbryt = this.avbryt.bind(this);
    }
    componentDidMount() {
        this.handleInitialize();
    }

    setStatus(nyStatus) {
        this.setState({
            status: nyStatus,
        });
    }

    visFeiletTiltak() {
        return ((!this.props.tiltakReducer.tiltakId && !this.props.tiltak && this.props.tiltakReducer.tiltak) ||
            (this.props.tiltakReducer.tiltak && this.props.tiltak &&
            this.props.tiltakReducer.tiltakId && this.props.tiltak.tiltakId === this.props.tiltakReducer.tiltakId));
    }

    handleInitialize() {
        const tiltak = this.visFeiletTiltak() ? this.props.tiltakReducer.tiltak : this.props.tiltak;
        const initData = {};
        if (tiltak) {
            initData.tiltaknavn = tiltak.tiltaknavn;
            initData.beskrivelse = tiltak.beskrivelse;
            initData.gjennomfoering = tiltak.gjennomfoering;
            initData.beskrivelseIkkeAktuelt = tiltak.beskrivelseIkkeAktuelt;
            initData.status = tiltak.status;
            initData.fom = tiltak.fom ? restdatoTildato(tiltak.fom) : null;
            initData.tom = tiltak.tom ? restdatoTildato(tiltak.tom) : null;
            initData.opprettetAv = this.props.tiltak ? this.props.tiltak.opprettetAv : null;
        } else {
            initData.status = this.state.status;
        }
        this.setStatus(initData.status);
        this.props.initialize(initData);
    }

    hentSkjemaClassName() {
        return this.props.tiltak ? 'tiltaktabell__rad__utvidbar' : 'tiltakSkjema';
    }
    handleSubmit(values) {
        const nyeVerdier = Object.assign(values);
        if (this.props.tiltak) {
            nyeVerdier.tiltakId = this.props.tiltak.tiltakId;
        }
        nyeVerdier.fom = values.tom && konvertDatoTiltak(values.fom);
        nyeVerdier.tom = values.fom && konvertDatoTiltak(values.tom);
        this.props.sendLagre(nyeVerdier);
    }

    avbryt() {
        this.props.tiltakReducer.tiltak = null;
        this.props.avbryt();
    }

    render() {
        const {
            tiltak,
            handleSubmit,
            fnr,
            oppdateringFeilet,
            varselTekst,
            visFeilMelding,
            tiltakReducer,
        } = this.props;
        const personvernTekst = getLedetekst('oppfolgingsdialog.personvern.arbeidsgiver');
        return (
            <div className="utvidbar__innholdContainer">
                <form onSubmit={handleSubmit(this.handleSubmit)} className={this.hentSkjemaClassName()} >

                    { (!tiltak || !tiltak.opprettetAv || aktoerHarOpprettetElement(fnr, tiltak)) &&
                    <TiltakNavn
                        felt={FELTER.tiltaknavn}
                    />
                    }
                    <TiltakBeskrivelse
                        felt={FELTER.beskrivelse}
                        tiltak={tiltak}
                        fnr={fnr}
                        tekst={personvernTekst}
                    />

                    <TiltakForeslaattAv
                        tiltak={tiltak}
                    />

                    <TiltakRadioKnapper
                        tiltak={tiltak}
                        setStatus={this.setStatus}
                    />

                    { this.state.status === STATUS_TILTAK.IKKE_AKTUELT &&
                    <BeskrivelseIkkeAktuelt
                        felt={FELTER.beskrivelseIkkeAktuelt}
                        tiltak={tiltak}
                        tekst={personvernTekst}
                        fnr={fnr}
                    />
                    }

                    { this.state.status === STATUS_TILTAK.AVTALT &&
                    <Gjennomfoering
                        felt={FELTER.gjennomfoering}
                        tekst={personvernTekst}
                        tiltak={tiltak}
                        fnr={fnr}
                    />
                    }

                    { this.state.status !== STATUS_TILTAK.IKKE_AKTUELT &&
                    <TiltakDatovelger
                        felter={FELTER}
                        tiltak={this.visFeiletTiltak() ? tiltakReducer.tiltak : tiltak}
                    />
                    }

                    { oppdateringFeilet &&
                    <TiltakVarselFeil
                        tekst={varselTekst}
                    />
                    }

                    <TiltakKnapper
                        avbryt={this.avbryt}
                        tiltak={tiltak}
                        visFeilMelding={visFeilMelding}
                        tiltakReducer={tiltakReducer}
                    />
                </form>
            </div>);
    }
}

TiltakSkjemaKomponent.propTypes = {
    tiltak: tiltakPt,
    handleSubmit: PropTypes.func,
    sendLagre: PropTypes.func,
    avbryt: PropTypes.func,
    initialize: PropTypes.func,
    fnr: PropTypes.string,
    oppdateringFeilet: PropTypes.bool,
    varselTekst: PropTypes.string,
    visFeilMelding: PropTypes.func,
    tiltakReducer: tiltakReducerPt,
};

const validate = (values) => {
    const feilmeldinger = {};
    if (!values.tiltaknavn || values.tiltaknavn.trim().length === 0) {
        feilmeldinger.tiltaknavn = 'Fyll inn tiltak';
    } else if (values.tiltaknavn.match(tekstfeltRegex)) {
        feilmeldinger.tiltaknavn = 'Ugyldig spesialtegn er oppgitt';
    }
    const navnLengde = values.tiltaknavn ? values.tiltaknavn.length : 0;
    const navnMaksLengde = 100;
    if (navnLengde > navnMaksLengde) {
        feilmeldinger.tiltaknavn = `Maks ${navnMaksLengde} tegn tillatt`;
    }
    if (!values.beskrivelse || values.beskrivelse.trim().length === 0) {
        feilmeldinger.beskrivelse = 'Fyll inn beskrivelse';
    } else if (values.beskrivelse.match(tekstfeltRegex)) {
        feilmeldinger.beskrivelse = 'Ugyldig spesialtegn er oppgitt';
    }
    const beskrivelseLengde = values.beskrivelse ? values.beskrivelse.length : 0;
    const beskrivelseMaksLengde = 2000;
    if (beskrivelseLengde > beskrivelseMaksLengde) {
        feilmeldinger.beskrivelse = `Maks ${beskrivelseMaksLengde} tegn tillatt`;
    }

    if (values.gjennomfoering && tekstfeltTomtRegex.test(values.gjennomfoering)) {
        feilmeldinger.gjennomfoering = 'Fyll inn oppfølging og gjennomføring';
    } else if (values.gjennomfoering && values.gjennomfoering.match(tekstfeltRegex)) {
        feilmeldinger.gjennomfoering = 'Ugyldig spesialtegn er oppgitt';
    }

    const foelgtiltakLengde = values.gjennomfoering ? values.gjennomfoering.length : 0;
    const foelgtiltakMaksLengde = 2000;
    if (foelgtiltakLengde > foelgtiltakMaksLengde) {
        feilmeldinger.gjennomfoering = `Maks ${foelgtiltakMaksLengde} tegn tillatt`;
    }

    if (values.fom && values.tom && !sluttDatoSenereEnnStartDato(konvertDatoTiltakMedPunkt(values.fom), konvertDatoTiltakMedPunkt(values.tom))) {
        feilmeldinger.tom = 'Sluttdato må være etter startdato';
    }

    if (values.status === STATUS_TILTAK.IKKE_AKTUELT && (!values.beskrivelseIkkeAktuelt || values.beskrivelseIkkeAktuelt.trim().length === 0)) {
        feilmeldinger.beskrivelseIkkeAktuelt = 'Fyll inn beskrivelse';
    } else if (values.status === STATUS_TILTAK.IKKE_AKTUELT && values.beskrivelseIkkeAktuelt.match(tekstfeltRegex)) {
        feilmeldinger.beskrivelseIkkeAktuelt = 'Ugyldig spesialtegn er oppgitt';
    }
    const beskrivelseIkkeAktueltLengde = values.beskrivelseIkkeAktuelt ? values.beskrivelseIkkeAktuelt.length : 0;
    const beskrivelseIkkeAktueltMaksLengde = 2000;
    if (beskrivelseIkkeAktueltLengde > beskrivelseIkkeAktueltMaksLengde) {
        feilmeldinger.beskrivelseIkkeAktuelt = `Maks ${beskrivelseIkkeAktueltMaksLengde} tegn tillatt`;
    }

    return feilmeldinger;
};

const ReduxSkjema = reduxForm({
    form: OPPRETT_TILTAK_NY,
    validate,
})(TiltakSkjemaKomponent);

export default ReduxSkjema;
