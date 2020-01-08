import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';
import { hentGodkjenningsTidspunkt } from '../../../../utils/oppfolgingsplanUtils';
import GodkjennPlanOversiktInformasjon from '../GodkjennPlanOversiktInformasjon';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import { EditButton } from './EditButton';

const texts = {
    godkjennPlanMottattUtvidbar: {
        title: 'Se planen',
    },
    godkjennPlanMottattKnapper: {
        buttonApprove: 'Godkjenn',
        buttonDecline: 'Gjør endringer',
    },
    godkjennPlanAvslaattOgGodkjent: {
        title: 'Mottatt endring',
        paragraphInfoWhen: 'Du sendte arbeidstakeren din en versjon av oppfølgingsplanen.',
        paragraphInfoWho: ' har foretatt noen endringer og sendt den tilbake til deg.',
    },
};

export const GodkjennPlanMottattUtvidbar = ({ oppfolgingsdialog, rootUrl }) => {
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
    oppfolgingsdialog: oppfolgingsdialogPt,
    rootUrl: PropTypes.string,
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
    oppfolgingsdialog: oppfolgingsdialogPt,
    godkjennPlan: PropTypes.func,
};

const GodkjennPlanAvslaattOgGodkjent = (
    {
        oppfolgingsdialog,
        rootUrl,
        godkjennPlan,
        avvisDialog,
    }) => {
    const sistOppfolgingsdialog = oppfolgingsdialog && hentGodkjenningsTidspunkt(oppfolgingsdialog);
    return (<div className="godkjennPlanAvslaattOgGodkjent">
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/plan-mottatt-igjen.svg`}
            svgAlt="mottatt"
            tittel={texts.godkjennPlanAvslaattOgGodkjent.title}
        >
            <div>
                <p>
                    {texts.godkjennPlanAvslaattOgGodkjent.paragraphInfoWhen}<br />
                    {`${oppfolgingsdialog.arbeidstaker.navn}${texts.godkjennPlanAvslaattOgGodkjent.paragraphInfoWho}`}
                </p>

                <div className="blokk--xxs">
                    <GodkjennPlanTidspunkt
                        rootUrl={rootUrl}
                        gyldighetstidspunkt={sistOppfolgingsdialog}
                    />

                    <EditButton
                        oppfolgingsdialog={oppfolgingsdialog}
                        avvisDialog={avvisDialog}
                    />
                </div>
                <GodkjennPlanMottattUtvidbar
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrl={rootUrl}
                />
                <GodkjennPlanMottattKnapper
                    oppfolgingsdialog={oppfolgingsdialog}
                    godkjennPlan={godkjennPlan}
                />
            </div>
        </OppfolgingsplanInnholdboks>
    </div>);
};

GodkjennPlanAvslaattOgGodkjent.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    rootUrl: PropTypes.string,
    godkjennPlan: PropTypes.func,
    avvisDialog: PropTypes.func,
};

export default GodkjennPlanAvslaattOgGodkjent;
