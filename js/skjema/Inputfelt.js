import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Textarea } from 'nav-frontend-skjema';
import Feilmelding from './Feilmelding';
import ArbeidsoppgaveVarselFeil from '../components/oppfolgingsdialog/utfylling/arbeidsoppgaver/ArbeidsoppgaveVarselFeil';
import { tekstfeltInneholderEllerBegynnerMedUgyldigTegnRegex, tekstfeltRegex } from '../konstanter';

const nameMaxLen = 100;

export const texts = {
  textFieldName: 'Navn på arbeidsoppgave',
  buttonSave: 'Lagre arbeidsoppgave',
  buttonCancel: 'Avbryt',
  errors: {
    update: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
    emptyInput: 'Fyll inn arbeidsoppgave',
    maxLengthExceeded: `Maks ${nameMaxLen} tegn er tillatt`,
    invalidCharacters: 'Ugyldige spesialtegn er oppgitt',
  },
};

const handleKeyPress = (avbryt, e) => {
  e.preventDefault();
  if (e.nativeEvent.keyCode === 13) {
    avbryt();
  }
};

const validateInput = (input) => {
  if (input === '') {
    return texts.errors.emptyInput;
  } else if (input.length > nameMaxLen) {
    return texts.errors.maxLengthExceeded;
  } else if (input.match(tekstfeltInneholderEllerBegynnerMedUgyldigTegnRegex) || input.match(tekstfeltRegex)) {
    return texts.errors.invalidCharacters;
  }
  return null;
};

const Inputfelt = (props) => {
  const { oppdateringFeilet, spinner, onSubmit, avbryt } = props;
  const [arbeidsoppgaveInputText, setArbeidsoppgaveInputText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (event) => {
    const input = event.target.value;
    setArbeidsoppgaveInputText(input);
    const error = validateInput(input);
    if (!error) {
      setErrorMsg('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const error = validateInput(arbeidsoppgaveInputText);

    if (!error) {
      onSubmit({ arbeidsoppgavenavn: arbeidsoppgaveInputText });
    } else {
      setErrorMsg(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Textarea
          label={texts.textFieldName}
          role="input"
          maxLength={nameMaxLen}
          onChange={handleChange}
          value={arbeidsoppgaveInputText}
        />
        {oppdateringFeilet && <ArbeidsoppgaveVarselFeil tekst={texts.errors.update} />}
        <div className="arbeidsgiveroppgave__rad--feilmelding">
          <Feilmelding error={errorMsg} />
        </div>
        <div className="arbeidsgiveroppgave__rad">
          <div className="knapperad knapperad--justervenstre">
            <div className="knapperad__element">
              <Hovedknapp disabled={spinner} spinner={spinner} htmlType="submit" role="submit" mini>
                {texts.buttonSave}
              </Hovedknapp>
            </div>

            <div className="knapperad__element">
              <button
                type="button"
                role="button"
                className="lenke"
                onKeyPress={(e) => {
                  handleKeyPress(avbryt, e);
                }}
                onMouseDown={avbryt}
              >
                {texts.buttonCancel}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

Inputfelt.propTypes = {
  oppdateringFeilet: PropTypes.bool,
  spinner: PropTypes.bool,
  onSubmit: PropTypes.func,
  avbryt: PropTypes.func,
};

export default Inputfelt;
