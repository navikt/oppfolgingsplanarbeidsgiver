import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'nav-frontend-skjema';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';

const texts = {
    delMedNav: 'Del planen med NAV',
    preDelMedNav: 'Planen vil bli delt med NAV ved godkjenning',
};

export const SharingCheckbox = ({ oppfolgingsplan, checked, onChange }) => {
    return (
        <div>
            {
                oppfolgingsplan.godkjenninger.find((godkjenning) => {
                    return godkjenning.delMedNav;
                })
                    ? <p>{texts.preDelMedNav}</p>
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
    oppfolgingsplan: oppfolgingsdialogPt,
};

