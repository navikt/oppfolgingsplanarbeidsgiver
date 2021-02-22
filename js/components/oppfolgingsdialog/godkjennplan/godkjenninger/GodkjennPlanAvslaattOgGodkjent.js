import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { getContextRoot } from '../../../../routers/paths';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import { hentGodkjenningsTidspunkt } from '../../../../utils/oppfolgingsplanUtils';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import { EditButton } from './EditButton';
import { SharingCheckbox } from './SharingCheckbox';
import PlanEkspanderbar from '../PlanEkspanderbar';

const texts = {
    godkjennPlanMottattKnapper: {
        buttonApprove: 'Godkjenn',
    },
    godkjennPlanAvslaattOgGodkjent: {
        title: 'Mottatt endring',
        paragraphInfoWho: ' har gjort noen endringer i planen og sendt den tilbake til deg.',
    },
};

export const GodkjennPlanMottattKnapper = ({ godkjennPlan, oppfolgingsdialog }) => {
    const [delMedNav, setDelMedNav] = useState(false);

    const handleChange = () => {
        setDelMedNav(!delMedNav);
    };

    return (
        <div className="knapperad knapperad--justervenstre">
            <SharingCheckbox checked={delMedNav} onChange={handleChange} oppfolgingsplan={oppfolgingsdialog} />
            <div className="knapperad__element godkjent-knapp">
                <Hovedknapp
                    name="godkjentKnapp"
                    id="godkjentKnapp"
                    autoFocus
                    onClick={() => { godkjennPlan(oppfolgingsdialog.id, null, true, oppfolgingsdialog.arbeidstaker.fnr, delMedNav); }}>
                    {texts.godkjennPlanMottattKnapper.buttonApprove}
                </Hovedknapp>
            </div>
        </div>
    );
};
GodkjennPlanMottattKnapper.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    godkjennPlan: PropTypes.func,
};

const GodkjennPlanAvslaattOgGodkjent = (
    {
        oppfolgingsplan,
        godkjennPlan,
        avvisDialog,
    }) => {
    const sistOppfolgingsdialog = oppfolgingsplan && hentGodkjenningsTidspunkt(oppfolgingsplan);
    return (<div className="godkjennPlanAvslaattOgGodkjent">
        <OppfolgingsplanInnholdboks
            svgUrl={`${getContextRoot()}/img/svg/plan-mottatt-igjen.svg`}
            svgAlt=""
            tittel={texts.godkjennPlanAvslaattOgGodkjent.title}
        >
            <div>
                <p>
                    {`${oppfolgingsplan.arbeidstaker.navn}${texts.godkjennPlanAvslaattOgGodkjent.paragraphInfoWho}`}
                </p>

                <div className="blokk--xxs">
                    <GodkjennPlanTidspunkt gyldighetstidspunkt={sistOppfolgingsdialog} />
                </div>
                <PlanEkspanderbar
                    oppfolgingsplan={oppfolgingsplan}
                />
                <EditButton
                    oppfolgingsdialog={oppfolgingsplan}
                    avvisDialog={avvisDialog}
                />
                <GodkjennPlanMottattKnapper
                    oppfolgingsdialog={oppfolgingsplan}
                    godkjennPlan={godkjennPlan}
                />
            </div>
        </OppfolgingsplanInnholdboks>
    </div>);
};

GodkjennPlanAvslaattOgGodkjent.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    godkjennPlan: PropTypes.func,
    avvisDialog: PropTypes.func,
};

export default GodkjennPlanAvslaattOgGodkjent;
