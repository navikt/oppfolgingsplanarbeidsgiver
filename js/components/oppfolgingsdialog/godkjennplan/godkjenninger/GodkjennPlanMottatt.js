import React from 'react';
import PropTypes from 'prop-types';
import {
    Knapp,
    Hovedknapp,
} from 'nav-frontend-knapper';
import {
    getHtmlLedetekst,
    getLedetekst,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import GodkjennPlanOversiktInformasjon from '../GodkjennPlanOversiktInformasjon';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';
import GodkjennPlanTilAltinnTekst from './GodkjennPlanTilAltinnTekst';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';

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

const GodkjennPlanMottatt = (
    {
        oppfolgingsdialog,
        rootUrl,
        rootUrlPlaner,
        godkjennPlan,
        avvisDialog,
    }) => {
    const infoboksTittelNokkel = 'oppfolgingsdialog.godkjennPlanMottatt.tittel';
    const infoboksTekst = getHtmlLedetekst('oppfolgingsdialog.godkjennPlanMottatt.tekst.arbeidsgiver', {
        '%ARBEIDSTAKER%': oppfolgingsdialog.arbeidstaker.navn,
    });
    return (
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/plan-mottatt.svg`}
            svgAlt="mottatt"
            tittel={getLedetekst(infoboksTittelNokkel)}
        >
            <div className="godkjennPlanMottatt">
                <div className="blokk">
                    <p dangerouslySetInnerHTML={infoboksTekst} />
                </div>

                <GodkjennPlanTidspunkt
                    rootUrl={rootUrl}
                    gyldighetstidspunkt={oppfolgingsdialog.godkjenninger[0].gyldighetstidspunkt}
                />

                <GodkjennPlanMottattUtvidbar
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrl={rootUrl}
                />
                <TidligereAvbruttePlaner
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrlPlaner={rootUrlPlaner}
                />

                <GodkjennPlanTilAltinnTekst />

                <GodkjennPlanMottattKnapper
                    oppfolgingsdialog={oppfolgingsdialog}
                    godkjennPlan={godkjennPlan}
                    avvisDialog={avvisDialog}
                />
            </div>
        </OppfolgingsplanInnholdboks>
    );
};

GodkjennPlanMottatt.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
    avvisDialog: PropTypes.func,
    godkjennPlan: PropTypes.func,
};

export default GodkjennPlanMottatt;
