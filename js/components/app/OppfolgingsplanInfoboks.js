import React from 'react';
import PropTypes from 'prop-types';

const OppfolgingsplanInfoboks = ({ svgUrl, svgAlt, tittel, tekst, children }) => {
  return (
    <div className="panel blokk">
      <div className="illustrertTittel">
        <img className="illustrertTittel__img" src={svgUrl} alt={svgAlt} />
        <h2 className="illustrertTittel__tittel">{tittel}</h2>
      </div>
      <p>{tekst}</p>

      {children}
    </div>
  );
};

OppfolgingsplanInfoboks.propTypes = {
  svgUrl: PropTypes.objectOf(PropTypes.any),
  svgAlt: PropTypes.string,
  tittel: PropTypes.string,
  tekst: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default OppfolgingsplanInfoboks;
