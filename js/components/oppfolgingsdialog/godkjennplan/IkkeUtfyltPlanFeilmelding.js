import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { oppfolgingsplanPt } from '../../../proptypes/opproptypes';

const texts = {
  description:
    'Ups, her mangler det litt før du kan sende planen. Den må inneholde minst én oppgave og ett tiltak. Kanskje den ansatte kan hjelpe til?',
  linkArbeidsoppgave: 'Legg til en arbeidsoppgave',
  linkTiltak: 'Legg til et tiltak',
};

const handleKeyPress = (settAktivtSteg, nesteSteg, e) => {
  e.preventDefault();
  if (e.nativeEvent.keyCode === 13) {
    settAktivtSteg(nesteSteg);
  }
};

const IkkeUtfyltPlanFeilmelding = ({ oppfolgingsplan, settAktivtSteg }) => {
  return (
    <Alertstripe className="ikkeUtfyltPlanFeilmelding" type="advarsel">
      <p>{texts.description}</p>
      <div className="ikkeUtfyltPlanFeilmelding__lenker">
        {oppfolgingsplan.arbeidsoppgaveListe.length === 0 && (
          <button
            className="lenke"
            onKeyPress={(e) => {
              handleKeyPress(settAktivtSteg, 1, e);
            }}
            onMouseDown={() => {
              settAktivtSteg(1);
            }}
          >
            {texts.linkArbeidsoppgave}
          </button>
        )}
        {oppfolgingsplan.tiltakListe.length === 0 && (
          <button
            className="lenke"
            onKeyPress={(e) => {
              handleKeyPress(settAktivtSteg, 2, e);
            }}
            onMouseDown={() => {
              settAktivtSteg(2);
            }}
          >
            {texts.linkTiltak}
          </button>
        )}
      </div>
    </Alertstripe>
  );
};
IkkeUtfyltPlanFeilmelding.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  settAktivtSteg: PropTypes.func,
};

export default IkkeUtfyltPlanFeilmelding;
