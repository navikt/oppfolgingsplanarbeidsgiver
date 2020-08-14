import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths';

const tekster = {
    knapp: 'Fortsett senere',
};

const LinkStyled = styled(Link)`
    text-transform: initial !important;
`;

const LagreOgAvsluttKnapp = ({ koblingId }) => {
    return (
        <div className="knapperad">
            <LinkStyled className="knapperad__element knapp knapp--flat" to={`${getContextRoot()}/${koblingId}/oppfolgingsplaner`}>
                {tekster.knapp}
            </LinkStyled>
        </div>
    );
};

LagreOgAvsluttKnapp.propTypes = {
    koblingId: PropTypes.string,
};

export default LagreOgAvsluttKnapp;
