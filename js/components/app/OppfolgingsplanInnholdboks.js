import React from 'react';
import PropTypes from 'prop-types';

const OppfolgingsplanInfoboks = (
    {
        classnames = '',
        svgUrl,
        svgAlt,
        tittel,
        children,
        liteikon,
    }) => {
    return (
        <div className={`panel ${classnames}`}>
            <div className="illustrertTittel">
                <img className="illustrertTittel__img" src={svgUrl} alt={svgAlt} style={liteikon ? { width: '2em' } : {}} />
                <h2 className="illustrertTittel__tittel">{tittel}</h2>
            </div>
            {children}
        </div>);
};

OppfolgingsplanInfoboks.propTypes = {
    classnames: PropTypes.string,
    svgUrl: PropTypes.string,
    liteikon: PropTypes.bool,
    svgAlt: PropTypes.string,
    tittel: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
};

export default OppfolgingsplanInfoboks;
