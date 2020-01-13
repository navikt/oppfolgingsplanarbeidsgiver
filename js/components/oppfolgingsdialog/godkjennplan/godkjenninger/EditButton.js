import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';

const texts = {
    buttonDecline: 'Gjør endringer i oppfølgingsplanen',
};

const StyledButton = styled.button`
    color: #0067c5;
    background: none;
    border: 0;
    padding: 0;
    margin: 0;
    margin-bottom: 0.5em;
`;

export const EditButton = ({ oppfolgingsdialog, avvisDialog }) => {
    return (
        <StyledButton
            onClick={() => {
                avvisDialog(oppfolgingsdialog.id, oppfolgingsdialog.arbeidstaker.fnr);
                window.location.hash = 'arbeidsoppgaver';
            }}>
            {texts.buttonDecline}
        </StyledButton>
    );
};

EditButton.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    avvisDialog: PropTypes.func,
};
