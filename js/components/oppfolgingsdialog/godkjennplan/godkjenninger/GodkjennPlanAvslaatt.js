import React from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { getLedetekst } from 'digisyfo-npm';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';

const GodkjennPlanAvslaatt = ({ oppfolgingsdialog, rootUrl, nullstillGodkjenning }) => {
    const infoboksTekst = getLedetekst('oppfolgingsdialog.arbeidsgiver.godkjennplan.avslaatt.infoboks.tekst');
    return (
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/oppfolgingsplan-avslaatt.svg`}
            svgAlt="avslaatt"
            tittel={getLedetekst('oppfolgingsdialog.arbeidsgiver.godkjennplan.avslaatt.infoboks.tittel')}
        >
            <div className="godkjennPlanAvslaatt">
                <div className="godkjennPlanAvslaatt__infoboks">
                    <p>{infoboksTekst}</p>
                </div>
                <div className="knapperad">
                    <Hovedknapp onClick={() => { nullstillGodkjenning(oppfolgingsdialog.id, oppfolgingsdialog.arbeidstaker.fnr); }}>
                        {getLedetekst('oppfolgingsdialog.knapp.rediger-plan')}
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
