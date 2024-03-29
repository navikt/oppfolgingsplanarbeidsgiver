import React from 'react';
import PropTypes from 'prop-types';
import { Undertekst } from 'nav-frontend-typografi';
import Datovelger from '../../../skjema/Datovelger';
import { datovelgerFeltPt } from '../../../proptypes/tiltakproptypes';
import { oppfolgingsplanPt } from '../../../proptypes/opproptypes';
import { getEndDateFromTiltakListe, getStartDateFromTiltakListe } from '../../../utils/tiltakUtils';

const texts = {
  felter: {
    fom: 'Fra og med',
    tom: 'Til og med',
    evalueringinnen: 'Evalueres innen',
  },
  suggestion: 'Vi har foreslått datoer basert på tiltakene dere har skrevet:',
};

export const FELTER = {
  fom: {
    navn: 'startdato',
    tekst: texts.felter.fom,
  },
  tom: {
    navn: 'sluttdato',
    tekst: texts.felter.tom,
  },
  evalueringinnen: {
    navn: 'evalueringsdato',
    tekst: texts.felter.evalueringinnen,
  },
};

export const GodkjennPlanSkjemaDatovelgerFelt = ({ felt, date, validate }) => {
  return (
    <div className="skjemaelement godkjennPlanSkjema__datovelger__felt">
      <label className="skjemaelement__label" htmlFor={felt.navn}>
        {felt.tekst}
      </label>
      <Datovelger
        name={felt.navn}
        id={felt.navn}
        tidligsteFom={null}
        dato={date || window.sessionStorage.getItem(felt.navn)}
        validate={validate}
      />
    </div>
  );
};
GodkjennPlanSkjemaDatovelgerFelt.propTypes = {
  felt: datovelgerFeltPt,
  date: PropTypes.string,
  validate: PropTypes.func,
};

const GodkjennPlanSkjemaDatovelger = ({
  oppfolgingsplan,
  isFormSubmitted,
  validateStartdato,
  validateSluttDato,
  validateEvalueringsdatoDato,
}) => {
  const suggestedStartDate = getStartDateFromTiltakListe(oppfolgingsplan.tiltakListe);
  const suggestedEndDate = getEndDateFromTiltakListe(oppfolgingsplan.tiltakListe);
  return (
    <div>
      {suggestedStartDate && suggestedEndDate && <Undertekst>{texts.suggestion}</Undertekst>}
      <div className="godkjennPlanSkjema__datovelger__rad">
        <GodkjennPlanSkjemaDatovelgerFelt
          felt={FELTER.fom}
          date={suggestedStartDate}
          validate={isFormSubmitted ? validateStartdato : undefined}
        />

        <GodkjennPlanSkjemaDatovelgerFelt
          felt={FELTER.tom}
          date={suggestedEndDate}
          validate={isFormSubmitted ? validateSluttDato : undefined}
        />
      </div>
      <div className="godkjennPlanSkjema__datovelger__rad">
        <GodkjennPlanSkjemaDatovelgerFelt
          felt={FELTER.evalueringinnen}
          validate={isFormSubmitted ? validateEvalueringsdatoDato : undefined}
        />
      </div>
    </div>
  );
};
GodkjennPlanSkjemaDatovelger.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  isFormSubmitted: PropTypes.bool,
  validateStartdato: PropTypes.func,
  validateSluttDato: PropTypes.func,
  validateEvalueringsdatoDato: PropTypes.func,
};

export default GodkjennPlanSkjemaDatovelger;
