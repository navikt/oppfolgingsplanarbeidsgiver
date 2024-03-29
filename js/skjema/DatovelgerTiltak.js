import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import MaskedInput from 'react-maskedinput';
import { DATOVELGERFELT_SKJEMA } from '../konstanter';
import Feilmelding from './Feilmelding';
import DayPickerComponent from './DayPicker';
import { fieldPropTypes } from '../proptypes/fieldproptypes';
import { toDatePrettyPrint } from '../utils/datoUtils';

export class DatoField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      erApen: false,
      dato: props.dato ? props.dato : '',
    };
    this.setRef = this.setRef.bind(this);
  }

  onKeyUp(e) {
    const ESCAPE_KEYCODE = 27;
    if (e.which === ESCAPE_KEYCODE) {
      this.lukk();
    }
  }

  setRef(ref) {
    this.setRef = ref;
  }

  toggle() {
    if (this.state.erApen) {
      this.lukk();
    } else {
      this.apne();
    }
  }

  apne() {
    this.setState({
      erApen: true,
    });
  }

  lukk() {
    this.setState({
      erApen: false,
    });
    if (this.toggleref) {
      this.toggleref.focus();
    }
  }

  fyllVerdi(dato) {
    this.setState({ dato });
    this.dato.focus();
    setTimeout(() => {
      this.dato.blur();
    }, 1);
  }

  render() {
    const { meta, input, id, tidligsteFom, senesteTom } = this.props;
    const maskedinput = Object.assign({}, input, {
      value: this.state.dato,
    });

    return (
      <div className="datovelger">
        <div
          className="datovelger__inner"
          role="button"
          tabIndex={0}
          onClick={(event) => {
            try {
              event.nativeEvent.stopImmediatePropagation();
            } catch (e) {
              event.stopPropagation();
            }
          }}
        >
          <div className="datovelger__inputContainer">
            <MaskedInput
              ref={(ref) => {
                this.dato = ref;
              }}
              type="tel"
              mask="11.11.1111"
              autoComplete="off"
              placeholder="dd.mm.åååå"
              id={id}
              className={`skjemaelement__input datovelger__input${
                meta.touched && meta.error ? ' skjemaelement__input--harFeil' : ''
              }`}
              {...maskedinput}
            />
            <button
              className="js-toggle datovelger__toggleDayPicker"
              ref={(ref) => {
                this.toggleref = ref;
              }}
              id={`toggle-${id}`}
              onKeyUp={(e) => {
                this.onKeyUp(e);
              }}
              onClick={(e) => {
                e.preventDefault();
                this.toggle();
              }}
              aria-pressed={this.erApen}
            >
              {this.state.erApen ? 'Skjul datovelger' : 'Vis datovelger'}
            </button>
          </div>
          {this.state.erApen && (
            <DayPickerComponent
              {...this.props}
              ariaControlledBy={`toggle-${id}`}
              tidligsteFom={tidligsteFom}
              senesteTom={senesteTom}
              onDayClick={(event, jsDato) => {
                const s = toDatePrettyPrint(new Date(jsDato));
                this.lukk();
                this.fyllVerdi(s);
              }}
              onKeyUp={(e) => {
                this.onKeyUp(e);
              }}
              lukk={() => {
                this.lukk();
              }}
            />
          )}
          <Feilmelding {...meta} />
        </div>
      </div>
    );
  }
}

DatoField.propTypes = {
  meta: fieldPropTypes.meta.isRequired,
  id: PropTypes.string.isRequired,
  input: fieldPropTypes.input.isRequired,
  dispatch: PropTypes.func.isRequired,
  skjemanavn: PropTypes.string.isRequired,
  tidligsteFom: PropTypes.instanceOf(Date),
  senesteTom: PropTypes.instanceOf(Date),
  inputValue: PropTypes.string,
  dato: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const inputName = ownProps.input.name;
  const skjemanavn = ownProps.skjemanavn;
  const selector = formValueSelector(skjemanavn);
  const inputValue = selector(state, inputName);
  return {
    inputValue,
    isFormSubmitted: ownProps.isFormSubmitted,
  };
};

const ConnectedDatoField = connect(mapStateToProps)(DatoField);

const DatovelgerTiltak = (props) => {
  return (
    <Field
      component={ConnectedDatoField}
      skjemanavn={DATOVELGERFELT_SKJEMA}
      validate={props.isFormSubmitted ? props.validateDato : undefined}
      {...props}
    />
  );
};

DatovelgerTiltak.propTypes = {
  tidligsteFom: PropTypes.instanceOf(Date),
  senesteTom: PropTypes.instanceOf(Date),
  initialize: PropTypes.func,
  validateDato: PropTypes.func,
  isFormSubmitted: PropTypes.bool,
};

export default DatovelgerTiltak;
