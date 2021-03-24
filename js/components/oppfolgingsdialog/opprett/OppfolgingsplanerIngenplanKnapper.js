import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../proptypes/opproptypes';
import { erOppfolgingsdialogOpprettbarDirekte } from '../../../utils/oppfolgingsplanUtils';

const texts = {
  buttonCreate: 'Lag en ny plan',
};

const OppfolgingsplanerIngenplanKnapper = ({ oppfolgingsdialoger, opprett, visOppfolgingsdialogOpprett }) => {
  return (
    <div className="knapperad knapperad--justervenstre">
      {erOppfolgingsdialogOpprettbarDirekte(oppfolgingsdialoger) ? (
        <button className="knapp knapperad__element" onClick={opprett}>
          {texts.buttonCreate}
        </button>
      ) : (
        <button
          className="knapp knapperad__element"
          onClick={() => {
            visOppfolgingsdialogOpprett(true);
          }}
        >
          {texts.buttonCreate}
        </button>
      )}
    </div>
  );
};
OppfolgingsplanerIngenplanKnapper.propTypes = {
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  opprett: PropTypes.func,
  visOppfolgingsdialogOpprett: PropTypes.func,
};

export default OppfolgingsplanerIngenplanKnapper;
