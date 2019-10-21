import React from 'react';
import PropTypes from 'prop-types';
import {
    Knapp,
    Hovedknapp,
} from 'nav-frontend-knapper';
import {
    getLedetekst,
    Utvidbar,
} from 'digisyfo-npm';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';
import { hentGodkjenningsTidspunkt } from '../../../../utils/oppfolgingsplanUtils';
import GodkjennPlanOversiktInformasjon from '../GodkjennPlanOversiktInformasjon';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';

export const GodkjennPlanMottattUtvidbar = ({ oppfolgingsdialog, rootUrl }) => {
    const tittelNokkel = 'oppfolgingsdialog.arbeidstaker.godkjennplan.mottatt.utvidbar.tittel';
    return (
        <Utvidbar className="utvidbar--oppfolgingsplan" tittel={getLedetekst(tittelNokkel)}>
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
    return (
        <div className="knapperad knapperad--justervenstre">
            <div className="knapperad__element">
                <Hovedknapp
                    name="godkjentKnapp"
                    id="godkjentKnapp"
                    autoFocus
                    onClick={() => { godkjennPlan(oppfolgingsdialog.id, null, true, oppfolgingsdialog.arbeidstaker.fnr); }}>
                    {getLedetekst('oppfolgingsdialog.godkjennPlanMottatt.knapp.godkjenn')}
                </Hovedknapp>
            </div>
            <div className="knapperad__element">
                <Knapp
                    onClick={() => {
                        avvisDialog(oppfolgingsdialog.id, oppfolgingsdialog.arbeidstaker.fnr);
                    }}>
                    {getLedetekst('oppfolgingsdialog.godkjennPlanMottatt.knapp.avslaa')}
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
    const infoboksTittelNokkel = 'oppfolgingsdialog.arbeidstaker.godkjennplan.mottatt.igjen.infoboks.tittel';
    const infoboksTekstNaar = getLedetekst('oppfolgingsdialog.arbeidsgiver.godkjennplan.mottatt.igjen.infoboks.naar.tekst');

    const infoboksTekstHvem = getLedetekst('oppfolgingsdialog.arbeidsgiver.godkjennplan.mottatt.igjen.infoboks.hvem.tekst', {
        '%ARBEIDSTAKER%': oppfolgingsdialog.arbeidstaker.navn,
    });

    const sistOppfolgingsdialog = oppfolgingsdialog && hentGodkjenningsTidspunkt(oppfolgingsdialog);
    return (<div className="godkjennPlanAvslaattOgGodkjent">
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/plan-mottatt-igjen.svg`}
            svgAlt="mottatt"
            tittel={getLedetekst(infoboksTittelNokkel)}
        >
            <div>
                <p>
                    {infoboksTekstNaar}<br />
                    {infoboksTekstHvem}
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
