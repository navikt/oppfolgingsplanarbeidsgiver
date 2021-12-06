import React from 'react';
import PropTypes from 'prop-types';

const Feilmelding = ({ error }) => {
  return (
    <p className="skjemaelement__feilmelding typo-feilmelding" aria-live="polite">
      {error}
    </p>
  );
};

Feilmelding.propTypes = {
  error: PropTypes.string,
};

export default Feilmelding;
