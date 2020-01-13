import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { getContextRoot } from '../../../../routers/paths';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import { hentGodkjenningsTidspunkt } from '../../../../utils/oppfolgingsplanUtils';
import GodkjennPlanOversiktInformasjon from '../GodkjennPlanOversiktInformasjon';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import { EditButton } from './EditButton';
import { SharingCheckbox } from './SharingCheckbox';

const texts = {
    godkjennPlanMottattUtvidbar: {
        title: 'Se planen',
    },
    godkjennPlanMottattKnapper: {
        buttonApprove: 'Godkjenn',
    },
    godkjennPlanAvslaattOgGodkjent: {
        title: 'Mottatt endring',
        paragraphInfoWhen: 'Du sendte arbeidstakeren din en versjon av oppfølgingsplanen.',
        paragraphInfoWho: ' har foretatt noen endringer og sendt den tilbake til deg.',
    },
};

export const GodkjennPlanMottattUtvidbar = ({ oppfolgingsdialog }) => {
    const rootUrl = getContextRoot();
    return (
        <Utvidbar className="utvidbar--oppfolgingsplan" tittel={texts.godkjennPlanMottattUtvidbar.title}>
            <GodkjennPlanOversiktInformasjon
                oppfolgingsdialog={oppfolgingsdialog}
                rootUrl={rootUrl}
            />
        </Utvidbar>
    );
};
GodkjennPlanMottattUtvidbar.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
};

export const GodkjennPlanMottattKnapper = ({ godkjennPlan, oppfolgingsdialog }) => {
    const [delMedNav, setDelMedNav] = useState(false);

    const handleChange = () => {
        setDelMedNav(!delMedNav);
    };

    return (
        <div className="knapperad knapperad--justervenstre">
            <SharingCheckbox checked={delMedNav} onChange={handleChange} oppfolgingsplan={oppfolgingsdialog} />
            <div className="knapperad__element">
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
            svgAlt="mottatt"
            tittel={texts.godkjennPlanAvslaattOgGodkjent.title}
        >
            <div>
                <p>
                    {texts.godkjennPlanAvslaattOgGodkjent.paragraphInfoWhen}<br />
                    {`${oppfolgingsplan.arbeidstaker.navn}${texts.godkjennPlanAvslaattOgGodkjent.paragraphInfoWho}`}
                </p>

                <div className="blokk--xxs">
                    <GodkjennPlanTidspunkt
                        gyldighetstidspunkt={sistOppfolgingsdialog}
                    />

                    <EditButton
                        oppfolgingsdialog={oppfolgingsplan}
                        avvisDialog={avvisDialog}
                    />
                </div>
                <GodkjennPlanMottattUtvidbar
                    oppfolgingsdialog={oppfolgingsplan}
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
