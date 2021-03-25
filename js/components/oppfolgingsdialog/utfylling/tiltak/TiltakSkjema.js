import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form';
import { Panel } from 'nav-frontend-paneler';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { OPPRETT_TILTAK_NY, STATUS_TILTAK, tekstfeltRegex } from '../../../../konstanter';
import TekstFelt from '../../../../skjema/TekstFelt';
import TekstOmrade from '../../../../skjema/TekstOmrade';
import TiltakRadioKnapper from './TiltakRadioKnapper';
import TiltakDatovelger from './TiltakDatovelger';
import TiltakKnapper from './TiltakKnapper';
import TiltakForeslaattAv from './TiltakForeslaattAv';
import TiltakInfoVarsel from './TiltakInfoVarsel';
import {
  erGyldigDato,
  erGyldigDatoformat,
  restdatoTildato,
  sluttDatoSenereEnnStartDato,
} from '../../../../utils/datoUtils';
import { konvertDatoTiltak, konvertDatoTiltakMedPunkt } from '../../../../utils/tiltakUtils';
import TiltakVarselFeil from './TiltakVarselFeil';
import { tiltakPt, tiltakReducerPt } from '../../../../proptypes/opproptypes';
import { tiltakSkjemaFeltPt } from '../../../../proptypes/tiltakproptypes';

const texts = {
  felter: {
    tiltaknavn: 'Lag en overskrift',
    beskrivelseLabel: 'BESKRIVELSE',
    beskrivelse: 'Beskriv hva som skal skje',
    gjennomfoering: 'Hvordan skal dette følges opp underveis?',
    beskrivelseIkkeAktuelt: 'Beskriv hvorfor tiltaket ikke er aktuelt akkurat nå',
    startdato: 'Startdato',
    sluttdato: 'Sluttdato',
  },
  beskrivelsePersonvern:
    'Husk at arbeidstakeren din kan se det du skriver her. Du må ikke gi sensitive personopplysninger',
};

export const FELTER = {
  tiltaknavn: {
    navn: 'tiltaknavn',
    id: 'tiltaknavn-input',
    tekst: texts.felter.tiltaknavn,
  },
  beskrivelse: {
    navn: 'beskrivelse',
    id: 'beskrivelse-input',
    tekst: texts.felter.beskrivelse,
  },
  gjennomfoering: {
    navn: 'gjennomfoering',
    id: 'gjennomfoering-input',
    tekst: texts.felter.gjennomfoering,
  },
  beskrivelseIkkeAktuelt: {
    navn: 'beskrivelseIkkeAktuelt',
    id: 'beskrivelseIkkeAktuelt-input',
    tekst: texts.felter.beskrivelseIkkeAktuelt,
  },
  startdato: {
    navn: 'fom',
    id: 'fom',
    tekst: texts.felter.startdato,
  },
  sluttdato: {
    navn: 'tom',
    id: 'tom',
    tekst: texts.felter.sluttdato,
  },
};

export const aktoerHarOpprettetElement = (fnr, tiltak) => {
  return fnr === tiltak.opprettetAv.fnr;
};

export const TiltakNavn = ({ felt, isFormSubmitted, validate }) => {
  return (
    <div className="lagretiltakskjema__inputgruppe">
      <label className="skjemaelement__label" id={felt.navn} htmlFor={`${felt.navn}-input`}>
        <b>{felt.tekst}</b>
      </label>
      <Field
        className="input--fullbredde"
        name={felt.navn}
        id={`${felt.id}`}
        aria-labelledby={felt.navn}
        component={TekstFelt}
        placeholder="Skriv her"
        validate={isFormSubmitted ? validate : undefined}
      />
    </div>
  );
};

TiltakNavn.propTypes = {
  felt: tiltakSkjemaFeltPt,
  isFormSubmitted: PropTypes.bool,
  validate: PropTypes.func,
};

export const TiltakBeskrivelse = ({ felt, tiltak, fnr, tekst, isFormSubmitted, validate }) => {
  return tiltak && tiltak.opprettetAv && !aktoerHarOpprettetElement(fnr, tiltak) ? (
    <div className="lagretiltakskjema__inputgruppe">
      {tiltak &&
        tiltak.beskrivelse && [
          <label key={`tiltak-besk-label-${tiltak.tiltakId}`} className="tiltaktabell--beskrivelse">
            {texts.felter.beskrivelseLabel}
          </label>,
          <p key={`tiltak-besk-p-${tiltak.tiltakId}`}>{tiltak.beskrivelse}</p>,
        ]}
    </div>
  ) : (
    <div className="lagretiltakskjema__inputgruppe">
      <Field
        className="input__tiltak--beskrivelse"
        name={felt.navn}
        id={`${felt.id}`}
        aria-labelledby={felt.navn}
        label={felt.tekst}
        component={TekstOmrade}
        placeholder="Skriv her"
        validate={isFormSubmitted ? validate : undefined}
      />
      <TiltakInfoVarsel tekst={tekst} />
    </div>
  );
};

TiltakBeskrivelse.propTypes = {
  felt: tiltakSkjemaFeltPt,
  tiltak: tiltakPt,
  fnr: PropTypes.string,
  tekst: PropTypes.string,
  isFormSubmitted: PropTypes.bool,
  validate: PropTypes.func,
};

export const Gjennomfoering = ({ felt, tiltak, tekst, fnr, isFormSubmitted, validate }) => {
  return (
    <div className="skjemaelement lagretiltakskjema__inputgruppe">
      <Field
        className="input__tiltak--gjennom"
        name={felt.navn}
        id={`${felt.id}`}
        aria-labelledby={felt.navn}
        label={felt.tekst}
        component={TekstOmrade}
        placeholder="Skriv her"
        validate={isFormSubmitted ? validate : undefined}
      />
      {tiltak && !aktoerHarOpprettetElement(fnr, tiltak) && <TiltakInfoVarsel tekst={tekst} />}
    </div>
  );
};

Gjennomfoering.propTypes = {
  felt: tiltakSkjemaFeltPt,
  tiltak: tiltakPt,
  tekst: PropTypes.string,
  fnr: PropTypes.string,
  isFormSubmitted: PropTypes.bool,
  validate: PropTypes.func,
};

export const BeskrivelseIkkeAktuelt = ({ felt, tiltak, tekst, fnr, isFormSubmitted, validate }) => {
  return (
    <div className="skjemaelement lagretiltakskjema__inputgruppe">
      <Field
        className="input__tiltak--gjennom"
        name={felt.navn}
        id={`${felt.id}`}
        aria-labelledby={felt.navn}
        label={felt.tekst}
        component={TekstOmrade}
        placeholder="Skriv her"
        validate={isFormSubmitted ? validate : undefined}
      />
      {tiltak && !aktoerHarOpprettetElement(fnr, tiltak) && <TiltakInfoVarsel tekst={tekst} />}
    </div>
  );
};
BeskrivelseIkkeAktuelt.propTypes = {
  felt: tiltakSkjemaFeltPt,
  tiltak: tiltakPt,
  tekst: PropTypes.string,
  fnr: PropTypes.string,
  isFormSubmitted: PropTypes.bool,
  validate: PropTypes.func,
};

export class TiltakSkjemaKomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: STATUS_TILTAK.FORSLAG,
      visLagringFeiletNyTiltak: false,
      varselTekst: '',
      errorList: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.hentSkjemaClassName = this.hentSkjemaClassName.bind(this);
    this.visFeiletTiltak = this.visFeiletTiltak.bind(this);
    this.avbryt = this.avbryt.bind(this);
    this.border = this.border.bind(this);
  }

  componentDidMount() {
    this.handleInitialize();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { status, tiltaknavn, beskrivelse, beskrivelseIkkeAktuelt, gjennomfoering, fom, tom } = nextProps;

    if (status !== this.props.status && this.state.isFormSubmitted) {
      if (nextProps.status === STATUS_TILTAK.IKKE_AKTUELT) {
        this.touchAllFields();

        this.validateTiltaknavnFelt(tiltaknavn);
        this.validateBeskrivelseFelt(beskrivelse);
        this.validateBeskrivelseIkkeAktueltFelt(beskrivelseIkkeAktuelt);

        this.removeError(FELTER.gjennomfoering.id);
        this.removeError(FELTER.startdato.id);
        this.removeError(FELTER.sluttdato.id);
      } else if (status === STATUS_TILTAK.AVTALT) {
        this.touchAllFields();

        this.validateTiltaknavnFelt(tiltaknavn);
        this.validateBeskrivelseFelt(beskrivelse);

        this.validateGjennomfoeringFelt(gjennomfoering);
        this.validateStartDato(fom);
        this.validateSluttDato(tom);

        this.removeError(FELTER.beskrivelseIkkeAktuelt.id);
      } else if (status === STATUS_TILTAK.FORSLAG) {
        this.touchAllFields();

        this.validateTiltaknavnFelt(tiltaknavn);
        this.validateBeskrivelseFelt(beskrivelse);
        this.validateStartDato(fom);
        this.validateSluttDato(tom);

        this.removeError(FELTER.beskrivelseIkkeAktuelt.id);
        this.removeError(FELTER.gjennomfoering.id);
      }
    }
  }

  setStatus(nyStatus) {
    this.setState({
      status: nyStatus,
    });
  }

  removeError = (id) => {
    const errors = Object.assign(this.state.errorList);
    const i = errors.findIndex((e) => {
      return e.skjemaelementId === id;
    });

    if (i !== -1) {
      errors.splice(i, 1);
    }

    this.setState({
      errorList: errors,
    });
  };

  touchAllFields() {
    this.props.touch('tiltaknavn');
    this.props.touch('beskrivelse');
    this.props.touch('beskrivelseIkkeAktuelt');
    this.props.touch('gjennomfoering');
    this.props.touch('fom');
    this.props.touch('tom');
  }

  visFeiletTiltak() {
    return (
      (!this.props.tiltakReducer.tiltakId && !this.props.tiltak && this.props.tiltakReducer.tiltak) ||
      (this.props.tiltakReducer.tiltak &&
        this.props.tiltak &&
        this.props.tiltakReducer.tiltakId &&
        this.props.tiltak.tiltakId === this.props.tiltakReducer.tiltakId)
    );
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
    this.setState({
      isFormSubmitted: false,
      status: initData.status,
    });
    this.props.initialize(initData);
  }

  hentSkjemaClassName() {
    return this.props.tiltak ? 'tiltaktabell__rad__utvidbar' : 'tiltakSkjema';
  }

  handleSubmit(values) {
    const errorObject = {
      tiltaknavn: '',
      beskrivelse: '',
      gjennomfoering: '',
      beskrivelseIkkeAktuelt: '',
      tom: '',
      fom: '',
      _error: 'Validering av tiltakskjema feilet',
    };

    this.setState({
      isFormSubmitted: true,
    });

    const errorList = [];
    const feilmeldingerObject = this.validateAllFields(values);

    if (feilmeldingerObject.tiltaknavn) {
      errorObject.tiltaknavn = feilmeldingerObject.tiltaknavn;
      errorList.push({ skjemaelementId: FELTER.tiltaknavn.id, feilmelding: feilmeldingerObject.tiltaknavn });
    }

    if (feilmeldingerObject.beskrivelse) {
      errorObject.beskrivelse = feilmeldingerObject.beskrivelse;
      errorList.push({ skjemaelementId: FELTER.beskrivelse.id, feilmelding: feilmeldingerObject.beskrivelse });
    }

    if (feilmeldingerObject.gjennomfoering) {
      errorObject.gjennomfoering = feilmeldingerObject.gjennomfoering;
      errorList.push({
        skjemaelementId: FELTER.gjennomfoering.id,
        feilmelding: feilmeldingerObject.gjennomfoering,
      });
    }

    if (feilmeldingerObject.beskrivelseIkkeAktuelt) {
      errorObject.beskrivelseIkkeAktuelt = feilmeldingerObject.beskrivelseIkkeAktuelt;
      errorList.push({
        skjemaelementId: FELTER.beskrivelseIkkeAktuelt.id,
        feilmelding: feilmeldingerObject.beskrivelseIkkeAktuelt,
      });
    }

    if (feilmeldingerObject.fom) {
      errorObject.fom = feilmeldingerObject.fom;
      errorList.push({ skjemaelementId: FELTER.startdato.id, feilmelding: feilmeldingerObject.fom });
    }

    if (feilmeldingerObject.tom) {
      errorObject.tom = feilmeldingerObject.tom;
      errorList.push({ skjemaelementId: FELTER.sluttdato.id, feilmelding: feilmeldingerObject.tom });
    }

    if (
      feilmeldingerObject.tiltaknavn ||
      feilmeldingerObject.beskrivelse ||
      feilmeldingerObject.fom ||
      feilmeldingerObject.tom ||
      feilmeldingerObject.beskrivelseIkkeAktuelt ||
      feilmeldingerObject.gjennomfoering
    ) {
      this.setState({
        errorList,
      });

      throw new SubmissionError(errorObject);
    }

    this.setState({
      errorList: [],
    });

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

  border() {
    return !this.props.tiltak;
  }

  updateFeilOppsummeringState = (feilmelding, elementId) => {
    const i = this.state.errorList.findIndex((obj) => {
      return obj.skjemaelementId === elementId;
    });
    const errorList = this.state.errorList;

    if (i > -1 && feilmelding !== undefined) {
      errorList[i].feilmelding = feilmelding;
    } else if (i > -1 && feilmelding === undefined) {
      errorList.splice(i, 1);
      this.setState({
        errorlist: errorList,
      });
    } else if (i === -1 && feilmelding !== undefined) {
      errorList.push({ skjemaelementId: elementId, feilmelding });
    }
  };

  validateTiltaknavnFelt = (value) => {
    let feilmelding;

    if (!value || value.trim().length === 0) {
      feilmelding = 'Fyll inn overskrift';
    } else if (value.match(tekstfeltRegex)) {
      feilmelding = 'Ugyldig spesialtegn er oppgitt';
    }

    const navnLengde = value ? value.length : 0;
    const navnMaksLengde = 100;

    if (navnLengde > navnMaksLengde) {
      feilmelding = `Maks ${navnMaksLengde} tegn tillatt`;
    }

    this.updateFeilOppsummeringState(feilmelding, FELTER.tiltaknavn.id);

    return feilmelding;
  };

  validateBeskrivelseFelt = (value) => {
    let feilmelding;

    if (!value || value.trim().length === 0) {
      feilmelding = 'Fyll inn beskrivelse';
    } else if (value.match(tekstfeltRegex)) {
      feilmelding = 'Ugyldig spesialtegn er oppgitt';
    }

    const beskrivelseLengde = value ? value.length : 0;
    const beskrivelseMaksLengde = 2000;

    if (beskrivelseLengde > beskrivelseMaksLengde) {
      feilmelding = `Maks ${beskrivelseMaksLengde} tegn tillatt`;
    }

    this.updateFeilOppsummeringState(feilmelding, FELTER.beskrivelse.id);

    return feilmelding;
  };

  validateBeskrivelseIkkeAktueltFelt = (value) => {
    let feilmelding;

    if (!value || value.trim().length === 0) {
      feilmelding = 'Fyll inn beskrivelse';
    } else if (value.match(tekstfeltRegex)) {
      feilmelding = 'Ugyldig spesialtegn er oppgitt';
    }

    const beskrivelseIkkeAktueltLengde = value ? value.length : 0;
    const beskrivelseIkkeAktueltMaksLengde = 2000;

    if (beskrivelseIkkeAktueltLengde > beskrivelseIkkeAktueltMaksLengde) {
      feilmelding = `Maks ${beskrivelseIkkeAktueltMaksLengde} tegn tillatt`;
    }

    this.updateFeilOppsummeringState(feilmelding, FELTER.beskrivelseIkkeAktuelt.id);

    return feilmelding;
  };

  validateGjennomfoeringFelt = (value) => {
    let feilmelding;

    if (!value || value.trim().length === 0) {
      feilmelding = 'Fyll inn oppfølging og gjennomføring';
    } else if (value.match(tekstfeltRegex)) {
      feilmelding = 'Ugyldig spesialtegn er oppgitt';
    }

    const folgtiltakLengde = value ? value.length : 0;
    const folgtiltakMaksLengde = 2000;

    if (folgtiltakLengde > folgtiltakMaksLengde) {
      feilmelding = `Maks ${folgtiltakMaksLengde} tegn tillatt`;
    }

    this.updateFeilOppsummeringState(feilmelding, FELTER.gjennomfoering.id);

    return feilmelding;
  };

  validateDatoFelt = (value) => {
    let feilmelding;

    if (!value || value.trim().length === 0) {
      feilmelding = 'Du må oppgi en dato';
    } else if (!erGyldigDatoformat(value)) {
      feilmelding = 'Datoen må være på formatet dd.mm.åååå';
    } else if (!erGyldigDato(value)) {
      feilmelding = 'Datoen er ikke gyldig';
    }

    return feilmelding;
  };

  validateStartDato = (value) => {
    this.state.fom = value;
    const feilmelding = this.validateDatoFelt(value);

    this.updateFeilOppsummeringState(feilmelding, FELTER.startdato.id);

    if (feilmelding === undefined) {
      this.props.untouch(OPPRETT_TILTAK_NY, 'fom');
    }

    return feilmelding;
  };

  validateSluttDato = (value) => {
    this.props.touch(OPPRETT_TILTAK_NY, 'tom');
    let feilmelding = this.validateDatoFelt(value);

    if (
      this.state.fom &&
      value &&
      !sluttDatoSenereEnnStartDato(konvertDatoTiltakMedPunkt(this.state.fom), konvertDatoTiltakMedPunkt(value))
    ) {
      feilmelding = 'Sluttdato må være etter startdato';
    }
    this.updateFeilOppsummeringState(feilmelding, FELTER.sluttdato.id);

    if (feilmelding === undefined) {
      this.props.untouch(OPPRETT_TILTAK_NY, 'tom');
    }

    return feilmelding;
  };

  validateAllFields = (values) => {
    const tiltaknavnValue = values.tiltaknavn;
    const beskrivelseValue = values.beskrivelse;
    const beskrivelseIkkeAktueltValue = values.beskrivelseIkkeAktuelt;
    const gjennomfoeringValue = values.gjennomfoering;
    const fomValue = values.fom;
    const tomValue = values.tom;

    if (this.state.status === STATUS_TILTAK.FORSLAG) {
      return {
        tiltaknavn: this.validateTiltaknavnFelt(tiltaknavnValue),
        beskrivelse: this.validateBeskrivelseFelt(beskrivelseValue),
        fom: this.validateStartDato(fomValue),
        tom: this.validateSluttDato(tomValue),
      };
    } else if (this.state.status === STATUS_TILTAK.AVTALT) {
      return {
        tiltaknavn: this.validateTiltaknavnFelt(tiltaknavnValue),
        beskrivelse: this.validateBeskrivelseFelt(beskrivelseValue),
        gjennomfoering: this.validateGjennomfoeringFelt(gjennomfoeringValue),
        fom: this.validateStartDato(fomValue),
        tom: this.validateSluttDato(tomValue),
      };
    } else if (this.state.status === STATUS_TILTAK.IKKE_AKTUELT) {
      return {
        tiltaknavn: this.validateTiltaknavnFelt(tiltaknavnValue),
        beskrivelse: this.validateBeskrivelseFelt(beskrivelseValue),
        beskrivelseIkkeAktuelt: this.validateBeskrivelseIkkeAktueltFelt(beskrivelseIkkeAktueltValue),
      };
    }

    return undefined;
  };

  render() {
    const { tiltak, handleSubmit, fnr, oppdateringFeilet, varselTekst, visFeilMelding, tiltakReducer } = this.props;
    const personvernTekst = texts.beskrivelsePersonvern;
    return (
      <Panel border={this.border()}>
        <div className="utvidbar__innholdContainer">
          <form onSubmit={handleSubmit(this.handleSubmit)} className={this.hentSkjemaClassName()}>
            {(!tiltak || !tiltak.opprettetAv || aktoerHarOpprettetElement(fnr, tiltak)) && (
              <TiltakNavn
                felt={FELTER.tiltaknavn}
                validate={this.validateTiltaknavnFelt}
                isFormSubmitted={this.state.isFormSubmitted}
              />
            )}
            <TiltakBeskrivelse
              felt={FELTER.beskrivelse}
              tiltak={tiltak}
              fnr={fnr}
              tekst={personvernTekst}
              validate={this.validateBeskrivelseFelt}
              isFormSubmitted={this.state.isFormSubmitted}
            />

            <TiltakForeslaattAv tiltak={tiltak} />

            <TiltakRadioKnapper tiltak={tiltak} setStatus={this.setStatus} />

            {this.state.status === STATUS_TILTAK.IKKE_AKTUELT && (
              <BeskrivelseIkkeAktuelt
                felt={FELTER.beskrivelseIkkeAktuelt}
                tiltak={tiltak}
                tekst={personvernTekst}
                fnr={fnr}
                validate={this.validateBeskrivelseIkkeAktueltFelt}
                isFormSubmitted={this.state.isFormSubmitted}
              />
            )}

            {this.state.status === STATUS_TILTAK.AVTALT && (
              <Gjennomfoering
                felt={FELTER.gjennomfoering}
                tekst={personvernTekst}
                tiltak={tiltak}
                fnr={fnr}
                validate={this.validateGjennomfoeringFelt}
                isFormSubmitted={this.state.isFormSubmitted}
              />
            )}

            {this.state.status !== STATUS_TILTAK.IKKE_AKTUELT && (
              <TiltakDatovelger
                felter={FELTER}
                tiltak={this.visFeiletTiltak() ? tiltakReducer.tiltak : tiltak}
                validateStartdato={this.validateStartDato}
                validateSluttdato={this.validateSluttDato}
                isFormSubmitted={this.state.isFormSubmitted}
              />
            )}

            {oppdateringFeilet && <TiltakVarselFeil tekst={varselTekst} />}

            {this.state.errorList.length > 0 && (
              <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={this.state.errorList} />
            )}
            <TiltakKnapper
              avbryt={this.avbryt}
              tiltak={tiltak}
              visFeilMelding={visFeilMelding}
              tiltakReducer={tiltakReducer}
            />
          </form>
        </div>
      </Panel>
    );
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
  touch: PropTypes.func,
  untouch: PropTypes.func,
  status: PropTypes.string,
};

const valueSelector = formValueSelector(OPPRETT_TILTAK_NY);

const mapStateToProps = (state) => {
  return {
    tiltaknavn: valueSelector(state, 'tiltaknavn'),
    beskrivelse: valueSelector(state, 'beskrivelse'),
    beskrivelseIkkeAktuelt: valueSelector(state, 'beskrivelseIkkeAktuelt'),
    gjennomfoering: valueSelector(state, 'gjennomfoering'),
    fom: valueSelector(state, 'fom'),
    tom: valueSelector(state, 'tom'),
    status: valueSelector(state, 'status'),
  };
};

const ReduxSkjema = reduxForm({
  form: OPPRETT_TILTAK_NY,
})(TiltakSkjemaKomponent);

export default connect(mapStateToProps)(ReduxSkjema);
