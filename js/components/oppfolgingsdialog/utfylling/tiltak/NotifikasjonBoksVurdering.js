import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const textInfo = (counterpartName, antallTiltak, status) => {
  return `${counterpartName} ønsker en vurdering av ${antallTiltak} ${status} tiltak`;
};

const NotifikasjonBoksVurdering = ({ navn, antallIkkeVurderte }) => {
  const status = antallIkkeVurderte > 1 ? 'foreslåtte' : 'foreslått';
  return (
    <Alertstripe className="alertstripe--notifikasjonboks" type="advarsel">
      {textInfo(navn, antallIkkeVurderte, status)}
    </Alertstripe>
  );
};
NotifikasjonBoksVurdering.propTypes = {
  navn: PropTypes.string,
  antallIkkeVurderte: PropTypes.number,
};

export default NotifikasjonBoksVurdering;
