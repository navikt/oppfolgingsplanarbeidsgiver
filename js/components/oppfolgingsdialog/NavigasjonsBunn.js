import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled from 'styled-components';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { VenstreChevron } from 'nav-frontend-chevron';
import { getContextRoot } from '../../routers/paths';

const tekster = {
  knapp: {
    oversikt: 'Tilbake til oppfølgingsplaner',
    neste: 'Neste',
    tilbake: 'Tilbake',
  },
};

const handleKeyPress = (settAktivtSteg, nesteSteg, e) => {
  e.preventDefault();
  if (e.nativeEvent.keyCode === 13) {
    settAktivtSteg(nesteSteg);
  }
};

const LinkStyled = styled(Link)`
  display: flex;
  font-weight: bold;
  align-items: center;
`;

const NavBottom = styled.nav`
  display: flex;
  justify-content: flex-start;
  margin-top: 2rem;
`;

const BackToOversikt = ({ koblingId }) => {
  return (
    <NavBottom>
      <LinkStyled to={`${getContextRoot()}/${koblingId}/oppfolgingsplaner`}>
        <VenstreChevron />
        <span>{tekster.knapp.oversikt}</span>
      </LinkStyled>
    </NavBottom>
  );
};

BackToOversikt.propTypes = {
  koblingId: PropTypes.string,
};

const NavigasjonsBunn = ({ steg, settAktivtSteg, disabled, koblingId }) => {
  if (disabled) {
    return <BackToOversikt koblingId={koblingId} />;
  }
  return (
    <nav className="navigasjonsBunn">
      {steg !== 3 && (
        <Hovedknapp
          className="navigasjonsBunn__frem"
          onKeyPress={(e) => {
            handleKeyPress(settAktivtSteg, steg + 1, e);
          }}
          onMouseDown={() => {
            settAktivtSteg(steg + 1);
          }}
        >
          {tekster.knapp.neste}
        </Hovedknapp>
      )}
      {steg !== 1 && (
        <Knapp
          className="navigasjonsBunn__tilbake"
          onKeyPress={(e) => {
            handleKeyPress(settAktivtSteg, steg - 1, e);
          }}
          onMouseDown={() => {
            settAktivtSteg(steg - 1);
          }}
        >
          {tekster.knapp.tilbake}
        </Knapp>
      )}
    </nav>
  );
};
NavigasjonsBunn.propTypes = {
  steg: PropTypes.number,
  settAktivtSteg: PropTypes.func,
  disabled: PropTypes.bool,
  koblingId: PropTypes.string,
};

export default NavigasjonsBunn;
