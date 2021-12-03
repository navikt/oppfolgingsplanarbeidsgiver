import React from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import ArbeidsoppgaveVarselFeil from '../components/oppfolgingsdialog/utfylling/arbeidsoppgaver/ArbeidsoppgaveVarselFeil';
import { TextareaControlled } from 'nav-frontend-skjema';

const texts = {
  textFieldName: 'Navn på arbeidsoppgave',
  buttonSave: 'Lagre arbeidsoppgave',
  buttonCancel: 'Avbryt',
};

const handleKeyPress = (avbryt, e) => {
  e.preventDefault();
  if (e.nativeEvent.keyCode === 13) {
    avbryt();
  }
};

const Inputfelt = (props) => {
  const { avbryt, oppdateringFeilet, varselTekst, spinner } = props;
  return (
    <div>
        <TextareaControlled label={texts.textFieldName} maxLength={100} />
        <div className="arbeidsgiveroppgave__rad">


          {oppdateringFeilet && <ArbeidsoppgaveVarselFeil tekst={varselTekst} />}
          <div className="knapperad knapperad--justervenstre">
            <div className="knapperad__element">
              <Hovedknapp
                disabled={spinner}
                spinner={spinner}
                htmlType="submit"
                mini
                id="leggtillKnapp"
                name="leggtillKnapp"
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
    </div>
  );
};

Inputfelt.propTypes = {
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  avbryt: PropTypes.func,
  oppdateringFeilet: PropTypes.bool,
  spinner: PropTypes.bool,
  varselTekst: PropTypes.string,
};

export default Inputfelt;
