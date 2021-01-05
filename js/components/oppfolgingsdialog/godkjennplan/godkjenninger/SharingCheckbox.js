import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Checkbox } from 'nav-frontend-skjema';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import { getContextRoot } from '../../../../routers/paths';

const texts = {
    delMedNav: 'Del planen med NAV',
    preDelMedNav: 'Planen vil bli delt med NAV når du godkjenner den.',
};

const Icon = styled.img`
    height: auto;
    width: 1.5em;
    margin-right: 0.5em;
`;

const IconTextBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2em;
`;

export const SharingCheckbox = ({ oppfolgingsplan, checked, onChange }) => {
    return (
        <div>
            {
                oppfolgingsplan.godkjenninger.find((godkjenning) => {
                    return godkjenning.delMedNav;
                })
                    ? <IconTextBox><Icon src={`${getContextRoot()}/img/svg/info-sirkel-fyll.svg`} alt="" /> <strong>{texts.preDelMedNav}</strong></IconTextBox>
                    : <Checkbox
                        checked={checked}
                        onChange={onChange}
                        label={texts.delMedNav}
                    />
            }
        </div>
    );
};

SharingCheckbox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    oppfolgingsplan: oppfolgingsplanPt,
};

