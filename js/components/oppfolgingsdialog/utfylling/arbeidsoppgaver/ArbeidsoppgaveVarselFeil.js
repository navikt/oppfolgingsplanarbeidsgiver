import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { erHerokuApp } from '../../../../utils/urlUtils';

const ArbeidsoppgaveVarselFeil = ({ tekst }) => {
  return (
    <Alertstripe className="alertstripe--notifikasjonboks" type="advarsel">
      {erHerokuApp() ? 'Denne funksjonen virker ikke på testsiden' : tekst}
    </Alertstripe>
  );
};
ArbeidsoppgaveVarselFeil.propTypes = {
  tekst: PropTypes.string,
};

export default ArbeidsoppgaveVarselFeil;
