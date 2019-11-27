import React from 'react';
import PropTypes from 'prop-types';
import {
    Knapp,
    Hovedknapp,
} from 'nav-frontend-knapper';
import { Utvidbar } from '@navikt/digisyfo-npm';
import GodkjennPlanOversiktInformasjon from '../GodkjennPlanOversiktInformasjon';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';
import GodkjennPlanTilAltinnTekst from './GodkjennPlanTilAltinnTekst';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';

const texts = {
    godkjennPlanMottattUtvidbar: {
        title: 'Se planen',
    },
    godkjennPlanMottattKnapper: {
        buttonApprove: 'Godkjenn',
        buttonDecline: 'Gjør endringer',
    },
    godkjennPlanMottatt: {
        title: 'Ønsker du å godkjenne denne versjonen?',
    },
};

const TextReceived = ({ arbeidstakerName }) => {
    return (
        <React.Fragment>
            Du har mottatt en ny oppfølgingsplan fra din arbeidsgiver: <b>{arbeidstakerName}</b> for godkjenning.
        </React.Fragment>
    );
};
TextReceived.propTypes = {
    arbeidstakerName: PropTypes.string,
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
    return (
        <div className="knapperad knapperad--justervenstre">
            <div className="knapperad__element">
                <Hovedknapp
                    name="godkjentKnapp"
                    id="godkjentKnapp"
                    autoFocus
                    onClick={() => { godkjennPlan(oppfolgingsdialog.id, null, true, oppfolgingsdialog.arbeidstaker.fnr); }}>
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

const GodkjennPlanMottatt = (
    {
        oppfolgingsdialog,
        rootUrl,
        rootUrlPlaner,
        godkjennPlan,
        avvisDialog,
    }) => {
    return (
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/plan-mottatt.svg`}
            svgAlt="mottatt"
            tittel={texts.godkjennPlanMottatt.title}
        >
            <div className="godkjennPlanMottatt">
                <div className="blokk">
                    <p>
                        <TextReceived arbeidstakerName={oppfolgingsdialog.arbeidstaker.navn} />
                    </p>
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
