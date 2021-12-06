import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Textarea } from 'nav-frontend-skjema';
import Feilmelding from './Feilmelding';
import { tekstfeltInneholderEllerBegynnerMedUgyldigTegnRegex, tekstfeltRegex } from '../konstanter';

const nameMaxLen = 100;

const texts = {
  textFieldName: "Navn på arbeidsoppgave",
  buttonSave: "Lagre arbeidsoppgave",
  buttonCancel: "Avbryt",
  errors: {
    store: "Varselboks tekst",
    noInput: "Fyll inn arbeidsoppgave",
    maxLengthExceeded: `Maks ${nameMaxLen} tegn er tillatt`,
    invalidCharacters: "Ugyldige spesialtegn er oppgitt",
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
    return texts.errors.noInput;
  } else if (input.length > nameMaxLen) {
    return texts.errors.maxLengthExceeded;
  } else if (
    input.match(tekstfeltInneholderEllerBegynnerMedUgyldigTegnRegex) ||
    input.match(tekstfeltRegex)
  ) {
    return texts.errors.invalidCharacters;
  }
  return null;
}

/*
const validate = (values) => {
  const feilmeldinger = {};
  if (!values.arbeidsoppgavenavn || (values.arbeidsoppgavenavn && values.arbeidsoppgavenavn.trim() === '')) {
    feilmeldinger.arbeidsoppgavenavn = 'Fyll inn arbeidsoppgave';
  } else if (
    values.arbeidsoppgavenavn.match(tekstfeltInneholderEllerBegynnerMedUgyldigTegnRegex) ||
    values.arbeidsoppgavenavn.match(tekstfeltRegex)
  ) {
    feilmeldinger.arbeidsoppgavenavn = 'Ugyldig spesialtegn er oppgitt';
  }
  const navnLengde = values.arbeidsoppgavenavn ? values.arbeidsoppgavenavn.length : 0;
  const navnMaksLengde = 100;
  if (navnLengde > navnMaksLengde) {
    feilmeldinger.arbeidsoppgavenavn = `Maks ${navnMaksLengde} tegn tillatt`;
  }
  return feilmeldinger;
};
*/

const Inputfelt = (props) => {
  const { avbryt, spinner, onSubmit } = props;
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
      onSubmit({"arbeidsoppgavenavn": arbeidsoppgaveInputText});
    } else {
      setErrorMsg(error);
    }
  };

  return (
    
    <div>
      <form onSubmit={handleSubmit}>
          <Textarea
              label={texts.textFieldName}
              maxLength={nameMaxLen}
              onChange={handleChange}
              value={arbeidsoppgaveInputText}
          />
          <div className="arbeidsgiveroppgave__rad--feilmelding">
            <Feilmelding error={errorMsg} />
        </div>
        <div className="arbeidsgiveroppgave__rad">
            
              <div className="knapperad knapperad--justervenstre">
                <div className="knapperad__element">
                  <Hovedknapp
                    disabled={spinner}
                    spinner={spinner}
                    htmlType="submit"
                    mini
                  >
                    {texts.buttonSave}
                  </Hovedknapp>
                </div>

                <div className="knapperad__element">
                  <button
                    type="button"
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
  avbryt: PropTypes.func,
  oppdateringFeilet: PropTypes.bool,
  spinner: PropTypes.bool,
  varselTekst: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Inputfelt;
