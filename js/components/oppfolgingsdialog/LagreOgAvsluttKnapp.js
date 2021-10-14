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

const LagreOgAvsluttKnapp = ({ narmestelederId }) => {
  return (
    <div className="knapperad">
      <LinkStyled
        className="knapperad__element knapp knapp--flat"
        to={`${getContextRoot()}/${narmestelederId}/oppfolgingsplaner`}
      >
        {tekster.knapp}
      </LinkStyled>
    </div>
  );
};

LagreOgAvsluttKnapp.propTypes = {
  narmestelederId: PropTypes.string,
};

export default LagreOgAvsluttKnapp;
