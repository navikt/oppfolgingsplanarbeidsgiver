import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const ArbeidsoppgaveVarselFeil = ({ tekst }) => {
  return (
    <Alertstripe className="alertstripe--notifikasjonboks" type="advarsel">
      {tekst}
    </Alertstripe>
  );
};
ArbeidsoppgaveVarselFeil.propTypes = {
  tekst: PropTypes.string,
};

export default ArbeidsoppgaveVarselFeil;
