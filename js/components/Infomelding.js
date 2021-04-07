import React from 'react';
import PropTypes from 'prop-types';

const Infomelding = ({ ikon, ikonAlt, tittel, tekst }) => {
  return (
    <div>
      <div className="illustrertTittel">
        <img className="illustrertTittel__img" src={ikon} alt={ikonAlt} />
        <h2 className="illustrertTittel__tittel">{tittel}</h2>
      </div>
      <p>{tekst}</p>
    </div>
  );
};

Infomelding.propTypes = {
  ikon: PropTypes.string,
  ikonAlt: PropTypes.string,
  tittel: PropTypes.string,
  tekst: PropTypes.string,
};

export default Infomelding;
