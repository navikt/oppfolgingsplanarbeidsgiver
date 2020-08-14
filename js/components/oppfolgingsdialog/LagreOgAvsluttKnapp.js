import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths';

const tekster = {
    knapp: 'Lagre og avslutt',
};

const LagreOgAvsluttKnapp = ({ koblingId }) => {
    return (
        <div className="knapperad">
            <Link className="knapperad__element knapp knapp--flat lagreOgAvslutt" to={`${getContextRoot()}/${koblingId}/oppfolgingsplaner`}>
                {tekster.knapp}
            </Link>
        </div>
    );
};

LagreOgAvsluttKnapp.propTypes = {
    koblingId: PropTypes.string,
};

export default LagreOgAvsluttKnapp;
