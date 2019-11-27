import React from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';

const texts = {
    title: 'Medarbeideren din er visst ikke helt enig',
    paragraphInfo: 'Du kan gjøre endringer slik at dere får en god plan.',
    buttonMakeChanges: 'Rediger planen',
};

const GodkjennPlanAvslaatt = ({ oppfolgingsdialog, rootUrl, nullstillGodkjenning }) => {
    return (
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/oppfolgingsplan-avslaatt.svg`}
            svgAlt="avslaatt"
            tittel={texts.title}
        >
            <div className="godkjennPlanAvslaatt">
                <div className="godkjennPlanAvslaatt__infoboks">
                    <p>{texts.paragraphInfo}</p>
                </div>
                <div className="knapperad">
                    <Hovedknapp onClick={() => { nullstillGodkjenning(oppfolgingsdialog.id, oppfolgingsdialog.arbeidstaker.fnr); }}>
                        {texts.buttonMakeChanges}
                    </Hovedknapp>
                </div>
            </div>
        </OppfolgingsplanInnholdboks>
    );
};
GodkjennPlanAvslaatt.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    rootUrl: PropTypes.string,
    nullstillGodkjenning: PropTypes.func,
};

export default GodkjennPlanAvslaatt;
