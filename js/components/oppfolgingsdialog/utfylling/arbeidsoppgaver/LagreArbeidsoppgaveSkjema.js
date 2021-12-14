import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp, Flatknapp } from 'nav-frontend-knapper';
import { Textarea } from 'nav-frontend-skjema';
import Panel from 'nav-frontend-paneler';
import Feilmelding from '@/skjema/Feilmelding';
import ArbeidsoppgaveVarselFeil from './ArbeidsoppgaveVarselFeil';
import { tekstfeltInneholderEllerBegynnerMedUgyldigTegnRegex, tekstfeltRegex } from '@/konstanter';
import * as opProptypes from '../../../../proptypes/opproptypes';

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

const LagreArbeidsoppgaveSkjema = (props) => {
  const { arbeidsoppgaverReducer, oppdateringFeilet, onSubmit, avbryt } = props;
  const spinner = arbeidsoppgaverReducer.lagrer;
  const [arbeidsoppgaveInputText, setArbeidsoppgaveInputText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (event) => {
    const input = event.target.value;
    setArbeidsoppgaveInputText(input);
    if (errorMsg !== '') {
      const error = validateInput(input);
      if (!error) {
        setErrorMsg('');
      } else {
        setErrorMsg(error);
      }
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
    <Panel border>
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
              <Flatknapp
                onKeyPress={(e) => {
                  handleKeyPress(avbryt, e);
                }}
                onMouseDown={avbryt}
              >
                Avbryt
              </Flatknapp>
            </div>
          </div>
        </div>
      </form>
    </Panel>
  );
};

LagreArbeidsoppgaveSkjema.propTypes = {
  arbeidsoppgaverReducer: opProptypes.arbeidsoppgaverReducerPt,
  oppdateringFeilet: PropTypes.bool,
  onSubmit: PropTypes.func,
  avbryt: PropTypes.func,
};

export default LagreArbeidsoppgaveSkjema;
