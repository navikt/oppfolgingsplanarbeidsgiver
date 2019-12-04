import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Knapp,
    Hovedknapp,
} from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';
import { hentGodkjenningsTidspunkt } from '../../../../utils/oppfolgingsplanUtils';
import GodkjennPlanOversiktInformasjon from '../GodkjennPlanOversiktInformasjon';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';

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
    delMedNav: 'Del planen med NAV',
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

export const GodkjennPlanMottattKnapper = ({ godkjennPlan, oppfolgingsdialog, avvisDialog }) => {
    const [delMedNav, setDelMedNav] = useState(false);

    const handleChange = () => {
        setDelMedNav(!delMedNav);
    };

    return (
        <div className="knapperad knapperad--justervenstre">
            <div>
                <Checkbox
                    checked={delMedNav}
                    onChange={handleChange}
                    label={texts.delMedNav}
                />
            </div>
            <div className="knapperad__element">
                <Hovedknapp
                    name="godkjentKnapp"
                    id="godkjentKnapp"
                    autoFocus
                    onClick={() => { godkjennPlan(oppfolgingsdialog.id, null, true, oppfolgingsdialog.arbeidstaker.fnr, delMedNav); }}>
                    {texts.godkjennPlanMottattKnapper.buttonApprove}
                </Hovedknapp>
            </div>
            <div className="knapperad__element">
                <Knapp
                    onClick={() => {
                        avvisDialog(oppfolgingsdialog.id, oppfolgingsdialog.arbeidstaker.fnr);
                    }}>
                    {texts.godkjennPlanMottattKnapper.buttonDecline}
                </Knapp>
            </div>
        </div>
    );
};
GodkjennPlanMottattKnapper.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    godkjennPlan: PropTypes.func,
    avvisDialog: PropTypes.func,
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

                <GodkjennPlanTidspunkt
                    rootUrl={rootUrl}
                    gyldighetstidspunkt={sistOppfolgingsdialog}
                />

                <GodkjennPlanMottattUtvidbar
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrl={rootUrl}
                />
                <GodkjennPlanMottattKnapper
                    oppfolgingsdialog={oppfolgingsdialog}
                    godkjennPlan={godkjennPlan}
                    avvisDialog={avvisDialog}
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
