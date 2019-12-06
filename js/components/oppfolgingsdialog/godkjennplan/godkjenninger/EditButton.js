import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';

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
            }}>
            {texts.buttonDecline}
        </StyledButton>
    );
};

EditButton.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    avvisDialog: PropTypes.func,
};
