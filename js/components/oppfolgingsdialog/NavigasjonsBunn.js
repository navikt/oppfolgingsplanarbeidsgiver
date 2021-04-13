import React from 'react';
import PropTypes from 'prop-types';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { VenstreChevron } from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import { getContextRoot } from '../../routers/paths';

const tekster = {
  knapp: {
    oversikt: 'Tilbake til oppfølgingsplaner',
    neste: 'Neste',
    tilbake: 'Tilbake',
  },
};

const handleKeyPress = (settAktivtSteg, nesteSteg, e) => {
  e.preventDefault();
  if (e.nativeEvent.keyCode === 13) {
    settAktivtSteg(nesteSteg);
  }
};

const NavigasjonsBunn = ({ steg, settAktivtSteg, disabled, koblingId }) => {
  if (disabled) {
    return (
      <Lenke href={`${getContextRoot()}/${koblingId}/oppfolgingsplaner`}>
        <VenstreChevron />
        {tekster.knapp.oversikt}
      </Lenke>
    );
  }
  return (
    <nav className="navigasjonsBunn">
      {steg !== 3 && (
        <Hovedknapp
          className="navigasjonsBunn__frem"
          onKeyPress={(e) => {
            handleKeyPress(settAktivtSteg, steg + 1, e);
          }}
          onMouseDown={() => {
            settAktivtSteg(steg + 1);
          }}
        >
          {tekster.knapp.neste}
        </Hovedknapp>
      )}
      {steg !== 1 && (
        <Knapp
          className="navigasjonsBunn__tilbake"
          onKeyPress={(e) => {
            handleKeyPress(settAktivtSteg, steg - 1, e);
          }}
          onMouseDown={() => {
            settAktivtSteg(steg - 1);
          }}
        >
          {tekster.knapp.tilbake}
        </Knapp>
      )}
    </nav>
  );
};
NavigasjonsBunn.propTypes = {
  steg: PropTypes.number,
  settAktivtSteg: PropTypes.func,
  disabled: PropTypes.bool,
  koblingId: PropTypes.string,
};

export default NavigasjonsBunn;
